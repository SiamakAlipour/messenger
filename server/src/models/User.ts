import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024,
    },
    email: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    contactList: [
        {
            name: {
                type: String,
                required: true,
            },
            chat: [
                {
                    message: {
                        type: String,
                        required: true,
                    },
                    timestamp: {
                        type: String,
                        required: true,
                    },
                    receiver: {
                        type: Boolean,
                        required: true,
                    },
                },
            ],
        },
    ],
});

export default mongoose.model('users', UserSchema);
