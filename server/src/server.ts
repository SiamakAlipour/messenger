import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import user from './routes/user';
import dotenv from 'dotenv';

const app: Application = express();
dotenv.config();
//middlewares

app.use(express.json());
app.use(cors());
app.use('/api/account', user);
const DBUri: string = process.env.DB || '';
mongoose.connect(DBUri, () => {
    console.log(`database connected`);
});

const PORT = process.env.PORT || '8001';
app.listen(PORT, () => {
    console.log(`server is running on Port : ${8001}`);
});
