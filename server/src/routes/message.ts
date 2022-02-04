import express, { Request, Response, Router } from 'express';
import Chat from '../models/Message';
const route: Router = express.Router();

route.post('/send', async (req: Request, res: Response) => {
    const { senderName, receiverName, message, timestamp } = req.body;

    try {
        const newMessage = new Chat({
            users: [senderName, receiverName],
            chat: [
                {
                    receiver: receiverName.toLowerCase(),
                    message,
                    timestamp,
                },
            ],
        });
        await newMessage.save();
        res.status(201).send(newMessage);
    } catch (error) {
        res.status(400).send({ error });
    }
});
route.get('/sync', async (req: Request, res: Response) => {
    const { user1, user2 } = req.body;
    try {
        const findMessage = await Chat.findOne({
            users: { $all: [user1, user2], $size: 2 },
        });
        res.status(200).json(findMessage);
    } catch (error) {
        res.status(404).send(error);
    }
});
export default route;
