import {User} from  '../../models/User';
import {ResolverMap} from  '../../other/customTypes';


export const resolvers: ResolverMap = {
    Query: {
        userById: async (_: any,{id}: {id: string}) => {
            const user = await User.findOne({_id: id}, (err: any) => {
                if (err){
                    return null;
                }
            });
            return user;
        },
    },

    Mutation: {
        register: async (_: any, {info: { email,password } }: {info: {email: string,password: string}}) => {
            const user = new User({email,password});
            await user.save();
            return user;
        },
}
}