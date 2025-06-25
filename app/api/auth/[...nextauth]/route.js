import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions= {
    providers:[
        Credentials({
            name:"Credentials",
            credentials:{
                username:{label:"Username",type:"text"},
                password:{label:"Password",type:"password"},
            },
            async authorize(credentials){
                const admin={
                    username:"hardik0911",
                    password:"1234",
                };
                if(credentials.username === admin.username && credentials.password === admin.password){
                    return {id:1,name:"admin"};
                }
                return null;
            },
        }),
    ],
    pages:{
        signIn:"/admin/login",
    },
    secret:process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export {handler as GET,handler as POST};