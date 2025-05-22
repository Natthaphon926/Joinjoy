const prisma = require('../config/prisma');


exports.joinActivity = async (req, res) => {
  const userID = req.user.userID;
  const activityID = parseInt(req.params.id);
  const { phoneNumber, whyParticipate, healthConditions, emergencyContact } = req.body;

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
      },
    });

    res.json({ message: "Successfully applied for activities" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getParticipantsByActivity = async (req, res) => {
  const activityID = parseInt(req.params.id);
  try {
    const checkActivity = await prisma.activity.findFirst({
      where: { activityID }
    })

    if(!checkActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    
    const participations = await prisma.participation.findMany({
      where: { activityID },
      include: {
        activity: {
          select: {
            activityID: true,
            title: true,
            location: true,
            startDate: true
          }
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
              }
            }
          }
        }
      }
    });

    const result = participations.map(p => {
     
      const dob = new Date(p.user.profile.dateOfBirth);
      const age =
        new Date().getFullYear() - dob.getFullYear() -
        (new Date().setFullYear(0, dob.getMonth(), dob.getDate()) >
          new Date().setFullYear(0, new Date().getMonth(), new Date().getDate()) ? 1 : 0);

      return {
        activityID: p.activity.activityID,
        activityName: p.activity.title,
        startDate: p.activity.startDate,
        location: p.activity.location,
        user: {
          userID: p.user.userID,
          firstName: p.user.profile.firstName,
          lastName: p.user.profile.lastName,
          gender: p.user.profile.gender,
          age,
          phoneNumber: p.phoneNumber,
          emergencyPhone: p.emergencyPhone,
          whyParticipate: p.whyParticipate
        },
        status: p.status
      };
    });

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
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
            reward: true
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




