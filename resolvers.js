import { Post } from "./models/Post";

export const resolvers = {
    Query: {
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