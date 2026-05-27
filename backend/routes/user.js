import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import { User, Account } from '../db.js';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware.js';
import { JWT_SECRET } from '../config.js';
import zod from 'zod';



// SIGNUP route
const signupBody = zod.object({
    firstname: zod.string().min(2),
    lastname: zod.string().min(2),
    username: zod.string().email(),
    password: zod.string().min(6),
})
router.post("/signup", async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid inputs"
            })
        }

        const { firstname, lastname, username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                msg: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({ firstname, lastname, username, password: hashedPassword });

        const userId = result._id;

        /// ----- Create new account ------

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })


        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.status(201).json({
            msg: "User created successfully",
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: "Failed to create User",
            error: error.message
        })
    }
})

// SIGNIN route
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})
router.post("/signin", async (req, res) => {

    try {
        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(400).json({
                message: "Invalid Inputs"
            })
        }

        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                msg: "Invalid username or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                msg: "Invalid username or password"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.status(200).json({
            msg: "User authenticated",
            token
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

router.get("/me", authMiddleware, async(req, res) => {

    try {

        const user = await User.findById(req.userId);

        res.json({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username
        });

    } catch(err) {

        res.status(500).json({
            error: err.message
        });

    }

});


// Update route password/firstname/lastname
const updateBody = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().min(6).optional(),
})
router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "Error while updating information"
        })
    }

    const updatedData = { ...req.body };

    // Hash password if present
    if (updatedData.password) {
        updatedData.password = await bcrypt.hash(
            updatedData.password,
            10
        )
    }

    await User.updateOne({
        _id: req.userId
    }, updatedData)

    res.json({
        msg: "updated successfully"
    })

})

// Search route
router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const user = await User.find({
            $or: [{
                firstname: {
                    "$regex": filter,
                    "$options": "i"
                }
            }, {
                lastname: {
                    "$regex": filter,
                    "$options": "i"
                }
            }]
        })

        res.json({
            user: user.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        })
    } catch (err) {
    res.status(500).json({
        msg: "Internal server error",
        error: err.message
    })
}
})

export { router as UserRouter }