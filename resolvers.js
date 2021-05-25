import { Post } from "./models/Post";

export const resolvers = {
    Query: {
        hello: () => "Hello World",
        posts: () => Post.find(),
        post: (_id) => {
            const post = Post.findOne({_id}, (err) => {
                if (err) {
                    return null;
                }
            } );
            return post;
        }
    },

    Mutation: {
        createPost: (_,{title,desc}) => {
            const post = new Post({title,desc});
            post.save();
            return post;
        },
        deletePost: (_, {id}) => {
            Post.deleteOne({ _id: id }, (err) => {
                if (!err) {
                     return false;
                }
            });
            return true;
        }
    }
}