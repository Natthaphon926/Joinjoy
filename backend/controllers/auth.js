const bcrypt = require("bcrypt");
const prisma = require('../config/prisma');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, dateOfBirth, gender, healthConditions, phoneNumber } = req.body

        if (!email) {
            return res.status(400).json({ massage: 'Email is require' })
        }
        if (!password) {
            return res.status(400).json({ massage: 'password is require' })
        }
        if (!firstName) {
            return res.status(400).json({ massage: 'firstName is require' })
        }
        if (!lastName) {
            return res.status(400).json({ massage: 'lastName is require' })
        }
        if (!dateOfBirth) {
            return res.status(400).json({ massage: 'dateOfBirth is require' })
        }
        if (!gender) {
            return res.status(400).json({ massage: 'gender is require' })
        }

        const existingUser = await prisma.userAuth.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const userAuth = await prisma.userAuth.create({
            data: {
                email,
                password: hashPassword,
            },
        });

        await prisma.userProfile.create({
            data: {
                userID: userAuth.userID,
                firstName,
                lastName,
                dateOfBirth: new Date(dateOfBirth),
                gender,
                healthConditions,
                phoneNumber
            },
        });

        res.send('Register success')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server Error" })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await prisma.userAuth.findFirst({
            where: {
                email
            },
            include: {
                profile: true, // 👉 ดึงข้อมูลจาก UserProfile มาด้วย
            },
        })


        if (!user || !user.enabled) {
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Password Incorrect" })
        }

        const payload = {
            userID: user.userID,
            email: user.email,
            role: user.role,
            userName: user.profile.firstName
        }

        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'server error' })
            }
            res.json({ massage: 'Login Successful', payload, token })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server Error" })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await prisma.userAuth.findUnique({
            where: { userID: req.user.userID },
            include: {
                profile: true,
                participations: {
                    include: {
                        trees: {
                            include: {
                                tree: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // คำนวณ total carbon
        let totalCarbon = 0;
        user.participations.forEach((p) => {
            p.trees.forEach((pt) => {
                totalCarbon += pt.tree.carbonAbsorption;
            });
        });


        res.json({
            user: {
                userID: user.userID,
                email: user.email,
                role: user.role,
                enabled: user.enabled,
                profile: {
                    firstName: user.profile.firstName,
                    lastName: user.profile.lastName,
                    gender: user.profile.gender,
                    phoneNumber: user.profile.phoneNumber,
                    healthConditions: user.profile.healthConditions,
                },
                totalCarbon,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserCount = async (req, res) => {
    try {
        const count = await prisma.userAuth.count();
        res.json({ totalUsers: count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

