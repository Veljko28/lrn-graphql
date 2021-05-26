import { Post } from "./models/Post";
import {User} from  './models/User';

export const resolvers = {
    Query: {
        users: async () => await User.find(),
        userById: async (_,{id}) => {
            const user = await User.findOne({_id: id}, (err) => {
                if (err){
                    return null;
                }
            });
            return user;
        },


        hello: () => "Hello World",
        
        posts: async () => await Post.find(),
        postById: async (parent,{id}) => {
            const post = await Post.findOne({_id: id}, (err) => {
                if (err){
                    return null;
                }
            });
            return post;
        }
    },

    Mutation: {
        createUser: async (_,{info: { email,password } }) => {
            const user = new User({email,password});
            await user.save();
            return user;
        },

         deleteUser: async (_, {id}) => {
            await User.deleteOne({ _id: id }, (err) => {
                if (!err) {
                     return false;
                }
            });
            return true;
        },
        updateUser: async (_, {id, info: {email,password} }) => {
            await User.updateOne({_id: id}, {id,email,password}, (err) => {
                if (err){
                    return false;
                }
            })
            return true;
        },

        createPost: async (_,{title,desc}) => {
            const post = new Post({title,desc});
            await post.save();
            return post;
        },
        deletePost: async (_, {id}) => {
            await Post.deleteOne({ _id: id }, (err) => {
                if (!err) {
                     return false;
                }
            });
            return true;
        },
        updatePost: async (_, {id,title,desc}) => {
            await Post.updateOne({_id: id}, {id,title,desc}, (err) => {
                if (err){
                    return false;
                }
            })
            return true;
        }
    }
}