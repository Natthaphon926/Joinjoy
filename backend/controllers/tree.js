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