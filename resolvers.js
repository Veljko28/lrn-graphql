import { Post } from "./models/Post";

export const resolvers = {
    Query: {
        hello: () => "Hello World",
        posts: () => Post.find(),
        post: (id) => {
            Post.findOne({id}, (err,post) => {
                if (err){
                    return null;
                }
                console.log(post);
                return post;
            });
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