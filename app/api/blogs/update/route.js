import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(req){
    try {
        const body = await req.json();
        const {slug,  title, content ,tags} = body;
        if(!slug || !title || !content ||!tags){
            return NextResponse.json({error:"missing fields"});
        }
        const client = await clientPromise;
        const db = await client.db("Blogs")
        const result = await db.collection("blogcollection").findOneAndUpdate({slug:slug}, { $set: { title, content, tags } });
        if (result.modifiedcount === 1) {
            return NextResponse.json({success:true});
        } else {
            return NextResponse.json({error:"Update failed"});
        }
    }catch(err){
        return NextResponse.json({err:"server error"},{status:500});
    }
}