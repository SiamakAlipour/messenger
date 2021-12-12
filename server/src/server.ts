import express, { Application } from 'express';
import mongoose from 'mongoose';
import user from './routes/user';

const app: Application = express();

app.use('/api/user', user);

const DBUri: string = process.env.DB || '';
mongoose.connect(DBUri, () => {
    console.log(`database connected`);
});

const PORT = process.env.PORT || '8001';
app.listen(PORT, () => {
    console.log(`server is running on Port : ${8001}`);
});
