import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new mongoose.Schema({
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
        max: 255,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('users', UserSchema);
