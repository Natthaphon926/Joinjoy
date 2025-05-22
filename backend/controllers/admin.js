const prisma = require("../config/prisma");

exports.getAllUsers = async (req, res) => {
    try {

        const users = await prisma.userAuth.findMany({
            select: {
                userID: true,
                email: true,
                role: true,
                enabled: true,
                createdAt: true,
                updatedAt: true,
                profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                        gender: true,
                        dateOfBirth: true,
                    }
                }
            }
        });

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};