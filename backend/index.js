import express from 'express';
import cors from 'cors';
import {MainRouter} from './routes/index.js';
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());


app.use("/api/v1", MainRouter);








app.listen(PORT, () => {
    console.log("Server is Started");
})