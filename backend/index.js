import express from 'express';
import cors from 'cors';
import {router} from './routes/index.js';
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api/v1/users", router);



app.listen(PORT, () => {
    console.log("Server is Started");
})