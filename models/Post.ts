import mongoose, { Schema } from 'mongoose';

export const Post = mongoose.model("Post",new Schema({
    title: String,
    desc: String
}));