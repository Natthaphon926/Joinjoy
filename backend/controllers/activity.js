const prisma = require('../config/prisma');

exports.createActivity = async (req, res) => {
  try {
    const user = req.user; // ได้จาก middleware JWT
    if (!'admin'.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const {
      title,
      description,
      startDate,
      endDate,
      location,
      maxParticipants,
      reward,
      images = [],
    } = req.body;

    const newActivity = await prisma.activity.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        maxParticipants,
        reward,
        createdBy: user.userID,
      },
    });

    // เพิ่ม images ถ้ามี
    if (images.length > 0) {
      await prisma.image.createMany({
        data: images.map((img) => ({
          ...img,
          activityID: newActivity.activityID,
        })),
      });
    }

    res.status(201).json({ message: 'Activity created', activityID: newActivity.activityID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
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
    reward
  } = req.body;

  try {
    const activity = await prisma.activity.findUnique({
      where: { activityID: id },
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const updatedActivity = await prisma.activity.update({
      where: { activityID: id },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        maxParticipants,
        reward,
      },
    });

    res.json(updatedActivity);
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



