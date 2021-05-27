import { Post } from "./models/Post";
import {User} from  './models/User';

export const resolvers = {
    Query: {
        users: async () => await User.find(),
        userById: async (_: any,{id}: {id: string}) => {
            const user = await User.findOne({_id: id}, (err) => {
                if (err){
                    return null;
                }
            });
            return user;
        },


        hello: () => "Hello World",
        
        posts: async () => await Post.find(),
        postById: async (parent: any,{id}: {id: string}) => {
            const post = await Post.findOne({_id: id}, (err) => {
                if (err){
                    return null;
                }
            });
            return post;
        }
    },

    Mutation: {
        createUser: async (_: any, {info: { email,password } }: {info: {email: string,password: string}}) => {
            const user = new User({email,password});
            await user.save();
            return user;
        },

         deleteUser: async (_: any, {id}: {id : string}) => {
            await User.deleteOne({ _id: id }, (err) => {
                if (!err) {
                     return false;
                }
            });
            return true;
        },
        updateUser: async (_: any, {id, info: {email,password} } 
            : {id: string , info: { email: string, password: string }}) => {
            await User.updateOne({_id: id}, {id,email,password},{},(err: any) => {
                if (err){
                    return false;
                }
            })
            return true;
        },

        createPost: async (_: any,{title,desc}: {title:string, desc: string}) => {
            const post = new Post({title,desc});
            await post.save();
            return post;
        },
        deletePost: async (_: any, {id}: {id: string}) => {
            await Post.deleteOne({ _id: id }, (err) => {
                if (!err) {
                     return false;
                }
            });
            return true;
        },
        updatePost: async (_: any, 
            {id,title,desc}: {id: string, title: string, desc: string}) => {
            await Post.updateOne({_id: id}, {id,title,desc},{}, (err) => {
                if (err){
                    return false;
                }
            })
            return true;
        }
    }
}