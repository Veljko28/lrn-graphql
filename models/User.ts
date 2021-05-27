import mognoose, { Schema } from 'mongoose';

export const User = mognoose.model("User",new Schema({
    email: String,
    password: String
})
);