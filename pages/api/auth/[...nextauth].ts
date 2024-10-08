import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prismadb from '../../../lib/prismadb';
import {compare} from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID||'',
            clientSecret:process.env.GOOGLE_CLIENT_SECRET||''
        }),
        Credentials({
            id:'credentials',
            name:'credentials',
            credentials:{
                
                email:{
                    label:'Email',
                type:'text',

            },
            password:{
                label:'Password',
                type:'password'
            }
        },
        async authorize(credentials){
            if(!credentials?.email||!credentials?.password)
            {
                throw new Error('Email and password required');
            }
            const user=await prismadb.user.findUnique({
                where:{
                    email:credentials.email
                }
            });
            if(!user||!user.hashedPassword)
            {
                throw new Error('Email does not exist');
            }
            const isCorrectPassword = await compare(credentials.password,user.hashedPassword);

            if(!isCorrectPassword)
            {
                throw new Error("Incorrect Password");
            }
            return user;
        }})
    ],
    pages:{
        signIn:'/auth/signin', // Update this to a more specific path
    },
    debug:process.env.NODE_ENV==='development',
    adapter:PrismaAdapter(prismadb),
    session:{
        strategy:'jwt',
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET,

    },
    secret:process.env.NEXTAUTH_SECRET,
});