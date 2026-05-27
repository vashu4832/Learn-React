import express from 'express'
import { authMiddleware } from '../middleware.js';
import { Account } from '../db.js';
import mongoose from 'mongoose';
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        })

        res.json({
            balance: account.balance
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { amount, to } = req.body;

        // Prevent negative transfer
        if (amount <= 0) {
            return res.status(400).json({
                message: "Invalid amount"
            });
        }

        // Prevent self transfer
        if (req.userId === to) {
            return res.status(400).json({
                message: "Cannot transfer to yourself"
            });
        }

        // Fetch the account within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance"
            })
        }

        const toAccount = await Account.findOne({ userId: to }).session(session)

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        // Perform the transaction
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session)
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)

        // commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transaction successfull"
        })
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            error: err.message
        })
    } finally{
        session.endSession();
    }
})

export { router as accountRouter };