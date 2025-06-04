const prisma = require('../config/prisma');


exports.joinActivity = async (req, res) => {
  const userID = req.user.userID;
  const activityID = parseInt(req.params.id);
  const { phoneNumber, whyParticipate, healthConditions, emergencyContact, treeIDs } = req.body;

  try {
    // ตรวจว่าเคยสมัครไปแล้วหรือยัง
    const exists = await prisma.participation.findFirst({
      where: { userID, activityID },
    });

    if (exists) {
      return res.status(400).json({ message: "คุณสมัครกิจกรรมนี้แล้ว" });
    }


    await prisma.participation.create({
      data: {
        userID,
        activityID,
        phoneNumber,
        whyParticipate,
        healthConditions,
        emergencyContact,
        status: "pending",
        trees: {
          create: treeIDs.map(treeID => ({
            tree: { connect: { treeID: parseInt(treeID) } },
          }))
        }
      },
    });

    res.json({ message: "Successfully applied for activities" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllParticipations = async (req, res) => {
  try {
    const participations = await prisma.participation.findMany({
      include: {
        activity: {
          select: {
            activityID: true,
            title: true,
            location: true,
            startDate: true,
            maxParticipants: true,
            images: {
              select: {
                imageID: true,
                url: true,
                secureUrl: true,
              },
            },
          },
        },
        user: {
          select: {
            userID: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                gender: true,
                dateOfBirth: true,
                phoneNumber: true,
                healthConditions: true,
              },
            },
          },
        },
      },
    });

    const result = participations.map((p) => {
      if (!p.user.profile) return null;

      const dob = new Date(p.user.profile.dateOfBirth);
      const today = new Date();
      const age =
        today.getFullYear() - dob.getFullYear() -
        (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

      return {
        participationID: p.participationID,
        activityID: p.activity.activityID,
        images: p.images,
        activityName: p.activity.title,
        startDate: p.activity.startDate,
        location: p.activity.location,
        maxParticipants: p.activity.maxParticipants,
        images: p.activity.images,
        user: {
          userID: p.user.userID,
          firstName: p.user.profile.firstName,
          lastName: p.user.profile.lastName,
          gender: p.user.profile.gender,
          age,
          phoneNumber: p.user.profile.phoneNumber,
          healthConditions: p.user.profile.healthConditions ?? "ไม่ระบุ",
        },
        emergencyPhone: p.emergencyContact,
        whyParticipate: p.whyParticipate,
        status: p.status,
      };
    }).filter(Boolean);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Servererror" });
  }
};

exports.updateParticipationStatus = async (req, res) => {
  const participationID = parseInt(req.params.id);
  const { status } = req.body;

  const allowedStatuses = ["pending", "approved", "rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const updated = await prisma.participation.update({
      where: { participationID },
      data: {
        status,
        updatedAt: new Date()
      }
    });

    res.json({ message: "Participation status updated.", data: updated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getMyParticipations = async (req, res) => {
  try {

    const userID = req.user.userID;

    const participations = await prisma.participation.findMany({
      where: { userID },
      include: {
        activity: {
          select: {
            activityID: true,
            title: true,
            startDate: true,
            endDate: true,
            location: true,
            reward: true,
            maxParticipants: true,
            creator: {
              select: {
                userID: true,
                profile: {
                  select: {
                    firstName: true,
                    lastName: true
                  }
                }
              }
            },
            images: {
              select: {
                imageID: true,
                url: true,
                secureUrl: true
              }
            }
          }
        }
      },
      orderBy: { joinedAt: 'desc' }
    });

    res.json(participations);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




