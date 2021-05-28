import { Post } from "../../models/Post";
import {ResolverMap} from '../../other/customTypes';

export const resolvers: ResolverMap = {
    Query: {
        posts: async () => await Post.find(),
        postById: async (parent: any,{id}: {id: string}) => {
            const post = await Post.findOne({_id: id}, (err: any) => {
                if (err){
                    return null;
                }
            });
            return post;
        }
    },

    Mutation: {
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
            await Post.updateOne({_id: id}, {id,title,desc},{}, (err: any) => {
                if (err){
                    return false;
                }
            })
            return true;
        }
    }
}