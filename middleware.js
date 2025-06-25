import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export default async function middleWare(req,NextRequest){
    const token = await getToken({req,secret:process.env.NEXTAUTH_SECRET});
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    if(!isAdminRoute && !token){
        return NextResponse.redirect(new URL("/admin"),req.url)
    }
    return NextResponse.next();
}
export const config={
    matcher:['/admin/:path*'],
}