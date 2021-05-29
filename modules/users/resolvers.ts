import {User} from  '../../models/User';
import {ResolverMap} from  '../../other/customTypes';
import {formatYupError} from '../../other/formatYupError';
import * as yup from 'yup';

const yupSchema = yup.object().shape( {
    email: yup.string().min(10).max(255).email(),
    password: yup.string().min(6).max(255)
})


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
        register: async (_: any, args: {info: {email: string,password: string}}) => {
            const {info: { email,password } } = args;
            try {
                await yupSchema.validate(args, { abortEarly: false });
              } catch (err) {
                return formatYupError(err);
              }
            
            const user = new User({email,password});
            await user.save();
            return null;
        },
}
}