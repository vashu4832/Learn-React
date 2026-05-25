import express from 'express';
const router = express.Router();
import { User } from '../db.js';


router.post("/signup", async (req, res) => {
    try {
        const { firstname, lastname, username, password } = req.body;
        const result = await User.create({ firstname, lastname, username, password });
        res.status(201).json({
            msg: "User created",
            result
        })
    } catch (error) {
        res.status(500).json({
            msg: "Failed to create User",
            error: error.message
        })
    }
})

router.put("/changepassword/:username", async(req, res) => {
    try {
        const password = req.body.password;
        const username = req.params.username;

        const response = await User.findOneAndUpdate({username}, {$set: {password: password}} );
        res.status(201).json({
            msg: "Password updated",
            response
        })
    } catch (err) {
        res.status(501).json({
            msg: err.message
        })
    }

})

// Get single user
router.get("/signin", async(req, res) => {

    try{
        const {username, password} = req.body;
        const result = await User.findOne({username, password});

        res.json({
            msg: "User is allowed",
            result
        })
    } catch (err) {
        res.status(501).json({
            error: err.message,
            msg: "Username or password is wrong"
        })
    }
})

export {router};