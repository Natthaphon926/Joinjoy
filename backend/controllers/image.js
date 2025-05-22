const prisma = require('../config/prisma');
const cloudinary = require("../config/cloudinary");

exports.uploadActivityImage = async (req, res) => {
  const activityID = parseInt(req.params.id);

  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }

  try {
    // อัปโหลดไปยัง Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "activities" },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        // บันทึกข้อมูลใน DB
        const newImage = await prisma.image.create({
          data: {
            activityID,
            assetID: result.asset_id,
            publicID: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
          },
        });

        res.status(201).json(newImage);
      }
    );

    // ใช้ stream เพื่อส่ง buffer ไปยัง Cloudinary
    const streamifier = require("streamifier");
    streamifier.createReadStream(req.file.buffer).pipe(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteImage = async (req, res) => {
  const { imageId } = req.params;

  try {
    // 1. ดึงข้อมูลภาพจาก DB
    const image = await prisma.image.findUnique({
      where: { imageID: parseInt(imageId) },
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 2. ลบรูปจาก Cloudinary
    await cloudinary.uploader.destroy(image.publicID);

    // 3. ลบ record จาก DB
    await prisma.image.delete({
      where: { imageID: parseInt(imageId) },
    });

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};