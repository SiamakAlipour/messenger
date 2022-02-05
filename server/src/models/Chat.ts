import { required } from 'joi';
import mongoose, { Schema } from 'mongoose';

const chatSchema: Schema = new Schema({
    users: [{ type: String }],
    chat: [
        {
            receiver: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            timestamp: {
                type: String,
                required: true,
            },
        },
    ],
});

export default mongoose.model('messages', chatSchema);
