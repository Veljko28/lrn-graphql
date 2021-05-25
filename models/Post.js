import mongoose from 'mongoose';

export const Post = mongoose.model("Post", {
    title: String,
    desc: String
})