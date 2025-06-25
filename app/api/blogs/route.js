import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
function slugify(title){
    return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-')
}
export async function GET(){
    try{
        const client = await clientPromise;
        const db = client.db('Blogs');
        const blogs = await db.collection('blogcollection').find().toArray();
        return new NextResponse(JSON.stringify(blogs),{status: 200});
    }catch(error){
        console.error(error)
        return NextResponse.json({error: 'Internal server error'},{status:500})
    }
}

export async function POST(req) {
    try{
        const {title , tags, content}=await req.json()
        if(!title || !tags || !content){
            return new NextResponse(JSON.stringify({error:"missing something"}),{status:400})
        }
        const slug = slugify(title);
        const client = await clientPromise;
        const db = client.db();
        const result = await db.collection('blogcollection').insertOne({title,content,tags,createdAt : new Date(),slug,})
        return new NextResponse(JSON.stringify(result),{status:201})
    }catch(error){
        console.error('POST error:',error);
        return new NextResponse(JSON.stringify({error: 'Failed to add blog'}),{status:500})
    }
}