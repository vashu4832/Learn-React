import express from 'express';
const router = express.Router();
import { User } from '../db.js';
import { UserRouter } from './user.js';
import { accountRouter } from './account.js';

router.use("/users", UserRouter )
router.use("/account", accountRouter)

export {router as MainRouter};