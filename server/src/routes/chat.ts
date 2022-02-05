import express, { Request, Response, Router } from 'express';
import Chat from '../models/Chat';
const route: Router = express.Router();

route.post('/send', async (req: Request, res: Response) => {
    const { senderName, receiverName, message, timestamp } = req.body;
    try {
        const sendMessage = await Chat.updateOne(
            {
                users: { $all: [senderName, receiverName] },
            },
            {
                $push: {
                    chat: {
                        receiver: receiverName.toLowerCase(),
                        message,
                        timestamp,
                    },
                },
            }
        );
        res.status(200).send(sendMessage);
    } catch (error) {
        res.status(400).send(error);
    }

    // if (!findMessage) {
    //     try {
    //         const newMessage = new Chat({
    //             users: [senderName, receiverName],
    //             chat: [
    //                 {
    //                     receiver: receiverName.toLowerCase(),
    //                     message,
    //                     timestamp,
    //                 },
    //             ],
    //         });
    //         await newMessage.save();
    //         res.status(201).send(newMessage);
    //     } catch (error) {
    //         res.status(400).send({ error });
    //     }
    // }
});
route.get('/sync', async (req: Request, res: Response) => {
    const { user1, user2 } = req.body;
    try {
        const findMessage = await Chat.findOne({
            users: {
                $all: [user1.toLowerCase(), user2.toLowerCase()],
                $size: 2,
            },
        });
        res.status(200).send(findMessage.chat);
    } catch (error) {
        res.status(404).send(error);
    }
});
export default route;
