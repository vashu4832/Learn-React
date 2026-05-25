import express from 'express';
const router = express.Router();
import { User } from '../db.js';


router.post("/users", async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;
        const result = await User.create({ firstName: fname, lastName: lname, email, password });
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

// Get all user
router.get("/users", async(req, res) => {

    try{
        const result = await User.find({});

        res.json({
            result
        })
    } catch (err) {
        res.status(501).json({
            msg: err.message
        })
    }
})


// Get single user
router.get("/users/:email", async(req, res) => {

    try{
        const email = req.params.email;
        const result = await User.findOne({email});

        res.json({
            result
        })
    } catch (err) {
        res.status(501).json({
            msg: err.message
        })
    }
})

export {router};