import mognoose from 'mongoose';

export const User = mognoose.model("User", {
    email: String,
    password: String
});