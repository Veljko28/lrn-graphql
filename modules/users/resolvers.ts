import {User} from  '../../models/User';
import {ResolverMap} from  '../../other/customTypes';
import {formatYupError} from '../../other/formatYupError';
import {MyContext} from '../../other/MyContext';
import {CreateAccessToken} from '../../auth/createAuth'; 

import * as yup from 'yup';
import bcrypt from 'bcryptjs';

import { combineResolvers as combine } from 'graphql-resolvers';
import {isAuth} from '../../auth/isAuth'; 


const yupSchema = yup.object().shape( {
    email: yup.string().min(10).max(255).email(),
    password: yup.string().min(6).max(255)
}) 


export const resolvers: ResolverMap = {
    Query: {
        userById: combine(isAuth,  async (_: any,{id}: {id: string}) => {
            // addMiddleware(getSchema(), 'Query.userById', isAuth()) old code
            const user = await User.findOne({_id: id}, (err: any) => {
                if (err){
                    return null;
                }
            });
            return user;
        }),
    },

    Mutation: {
        register: async (_: any, args: {info: {email: string,password: string}}) => {
            try {
                await yupSchema.validate(args.info, { abortEarly: false });
            } 
            catch (err) {
                return formatYupError(err);
            }
            
            const {info: { email,password } } = args;
            const hashedPassword = bcrypt.hashSync(password, 10);
            // console.log(hashedPassword);

            const user = new User({email,password: hashedPassword});
            await user.save();
            return null;
        },

        login: async (_: any, args: {info: {email: string,password: string}}, context: MyContext ) => {
            try {
                await yupSchema.validate(args.info, {abortEarly: false});
            }
            catch (err){
                return null;
            }

            const {info: { email,password } } = args;

            const user = await User.findOne({email}, (err: any) => {
                if (err){
                    return null;
                }
            });

            if (user === null) return null;

            bcrypt.compare(password, (user as any).password , (err) => {
                if (err){
                    return null;
                }
            })
            
            const {res,req} = context;

            res.cookie('jid',
             CreateAccessToken(user?.id,'7d', false), 
             {
                 httpOnly: true
             });

            return {
                accessToken: CreateAccessToken(user?.id, '15m')
            };
        }
}
}