import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import user from './routes/user';
import message from './routes/chat';
import dotenv from 'dotenv';
import Pusher from 'pusher';
const app: Application = express();
dotenv.config();
//middlewares

app.get('/', (req, res) => {
    res.send('test');
});
app.use(express.json());
app.use(cors());
app.use('/api/account', user);
app.use('/api/message', message);
const DBUri: string = process.env.DB || '';

const pusher = new Pusher({
    appId: '1344419',
    key: 'eba934b1dbc8ba404bcb',
    secret: '367db75eb129cdca6ddd',
    cluster: 'eu',
    useTLS: true,
});

mongoose.connect(DBUri, () => {
    console.log(`database connected`);
});
const db = mongoose.connection;
db.once('open', () => {
    const msgCollection = db.collection('messages');
    const changeStream = msgCollection.watch();
    changeStream.on('change', (change) => {
        if (change.operationType === 'update') {
            const updateDetail = change.documentKey;

            pusher.trigger('messages', 'updated', {
                _id: updateDetail,
            });
        } else {
            console.log('Error triggered Pusher');
        }
    });
});

const PORT = process.env.PORT || '8001';
app.listen(PORT, () => {
    console.log(`server is running on Port : ${8001}`);
});
