const prisma = require('../config/prisma');
const { cloudinary } = require("../config/cloudinary");


exports.createActivity = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const {
      title,
      description,
      startDate,
      endDate,
      location,
      maxParticipants,
      reward,
    } = req.body;

    /* ---------- 1) อัปโหลดไฟล์เดียวขึ้น Cloudinary ---------- */
    let uploadResult = null;
    if (req.file) {
      uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "activities" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file.buffer);          // req.file มาจาก memoryStorage
      });
    }

    /* ---------- 2) สร้างกิจกรรมในฐานข้อมูล ---------- */
    const newActivity = await prisma.activity.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        maxParticipants: parseInt(maxParticipants, 10),
        reward,
        createdBy: user.userID,
      },
    });

    /* ---------- 3) สร้าง Image record ถ้ามีรูป ---------- */
    if (uploadResult) {
      await prisma.image.create({
        data: {
          assetID: uploadResult.asset_id,
          publicID: uploadResult.public_id,
          url: uploadResult.url,
          secureUrl: uploadResult.secure_url,
          activityID: newActivity.activityID,
        },
      });
    }

    return res.status(201).json({
      message: "Activity created",
      activityID: newActivity.activityID,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        creator: {
          include: {
            profile: true,
          },
        },
        images: true,
        participations: true,
      },
    });

    const result = activities.map((activity) => ({
      activityID: activity.activityID,
      title: activity.title,
      description: activity.description,
      startDate: activity.startDate,
      endDate: activity.endDate,
      location: activity.location,
      maxParticipants: activity.maxParticipants,
      reward: activity.reward,
      status: activity.status,
      creator: {
        firstName: activity.creator?.profile?.firstName || '',
        lastName: activity.creator?.profile?.lastName || '',
      },
      images: activity.images.map((img) => ({
        url: img.url,
      })),
      participantsCount: activity.participations.length,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await prisma.activity.findUnique({
      where: {
        activityID: parseInt(id),
      },
      include: {
        creator: {
          select: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
              }
            }
          }
        },
        images: true,
        _count: {
          select: {
            participations: true,
          },
        }
      }
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.updateActivity = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    title,
    description,
    startDate,
    endDate,
    location,
    maxParticipants,
    reward,
  } = req.body;

  try {
    // ตรวจว่าเป็น admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const activity = await prisma.activity.findUnique({
      where: { activityID: id },
      include: {
        images: true,
      },
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    /* ---------- 1) ถ้ามีรูปใหม่ → ลบรูปเก่าใน Cloudinary แล้วอัปโหลดใหม่ ---------- */
    let uploadResult = null;
    if (req.file) {
      const oldImage = activity.images[0]; // รูปเก่า (ถ้ามี)
      if (oldImage?.publicID) {
        await cloudinary.uploader.destroy(oldImage.publicID);
      }

      uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "activities" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file.buffer);
      });

      if (oldImage) {
        await prisma.image.update({
          where: { imageID: oldImage.imageID },
          data: {
            assetID: uploadResult.asset_id,
            publicID: uploadResult.public_id,
            url: uploadResult.url,
            secureUrl: uploadResult.secure_url,
          },
        });
      } else {
        await prisma.image.create({
          data: {
            assetID: uploadResult.asset_id,
            publicID: uploadResult.public_id,
            url: uploadResult.url,
            secureUrl: uploadResult.secure_url,
            activityID: id,
          },
        });
      }
    }


    /* ---------- 2) อัปเดตข้อมูลกิจกรรม ---------- */
    const updated = await prisma.activity.update({
      where: { activityID: id },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        maxParticipants: parseInt(maxParticipants),
        reward,
      },
    });


    res.json({ message: "Activity updated", activity: updated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteActivity = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const activity = await prisma.activity.findUnique({
      where: { activityID: id },
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await prisma.activity.delete({
      where: { activityID: id },
    });

    res.json({ message: "Activity deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



