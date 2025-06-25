import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    const { slug } = await params;
    console.log("slug received",slug)
    try{
        const client = await clientPromise;
        const db= client.db("Blogs");
        const blog= await db.collection('blogcollection').findOne({slug});
        if(!blog){
            return NextResponse.json({error: 'Blog not Found.'});
        }
        return NextResponse.json(blog);
    }catch(error){
        return NextResponse.json({error:"internal server error"},{status:500});
    }
}