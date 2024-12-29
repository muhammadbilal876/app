import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        enum: ['Sports', 'Tech', 'Music'],
        default: 'Sports',
        required: true,
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
});

export const Event = mongoose.model('Event', eventSchema);
