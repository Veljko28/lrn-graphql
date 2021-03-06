import {User} from  '../../models/User';
import {ResolverMap} from  '../../other/customTypes';
import {formatYupError} from '../../other/formatYupError';
import {MyContext} from '../../other/MyContext';
import {CreateAccessToken} from '../../auth/createAuth';
import { createConfirmEmail } from '../../confirmEmail/createConfirmEmail';
import { sendEmail } from '../../confirmEmail/sendEmail';
import * as yup from 'yup';
import bcrypt from 'bcryptjs';

import {AuthReq} from '../../auth/AuthReq'; 


const yupSchema = yup.object().shape( {
    email: yup.string().min(10).max(255).email(),
    password: yup.string().min(6).max(255)
}) 


export const resolvers: ResolverMap = {
    Query: {
        userById: AuthReq(async (_: any,{id}: {id: string}) => {
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
        register: async (_: any, args: {info: {email: string,password: string}}, {req,redis}: MyContext) => {
            try {
                await yupSchema.validate(args.info, { abortEarly: false });
            } 
            catch (err) {
                return formatYupError(err);
            }
            
            const {info: { email,password } } = args;

            const foundUser: any = await User.findOne({email});
            
            if ((foundUser as any)?.email == email) return [{
                path: "email",
                message: "This email is already in use"
            }];


            const hashedPassword = bcrypt.hashSync(password, 10);
            // console.log(hashedPassword);

            const user = new User({email,password: hashedPassword});
            await user.save();

            
            const link = await createConfirmEmail(process.env.HOST as string, user.id,redis);

            // console.log(link);

            await sendEmail(email, link);
            
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