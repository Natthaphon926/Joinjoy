const prisma = require('../config/prisma');



exports.getAllTree = async (req, res) => {
    try {
        const trees = await prisma.tree.findMany({
            select: {
                treeID: true,
                name: true,
                description: true,
                carbonAbsorption: true,
                imageUrl: true,
            },
        });
        res.json(trees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trees' });
    }
};

exports.getCarbonLeaderboard = async (req, res) => {
  try {
    const users = await prisma.userAuth.findMany({
      where: { enabled: true },
      include: {
        profile: true,
        participations: {
          include: {
            trees: {
              include: { tree: true },
            },
          },
        },
      },
    });

    const ranked = users.map((user) => {
      const totalCarbon = user.participations.flatMap((p) =>
        p.trees.map((pt) => pt.tree.carbonAbsorption)
      ).reduce((sum, co2) => sum + co2, 0);

      return {
        userID: user.userID,
        name: `${user.profile?.firstName || ""} ${user.profile?.lastName || ""}`,
        totalCarbon,
      };
    });

    const sorted = ranked
      .sort((a, b) => b.totalCarbon - a.totalCarbon)
      .slice(0, 10); // Top 10

    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTotalCarbon = async (req, res) => {
  try {
    const participations = await prisma.participationTree.findMany({
      include: {
        tree: true,
      },
    });

    const totalCarbon = participations.reduce((sum, p) => {
      return sum + p.tree.carbonAbsorption;
    }, 0);

    res.json({ totalCarbon }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};