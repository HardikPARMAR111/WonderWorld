import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
export async function DELETE(req) {
    try{
        const { id } = await req.json();
        console.log(id);
        if(!id || !ObjectId.isValid(id)){
            return new Response(JSON.stringify({error:"Blog id required"}),{status:400});
        }
        const client = await clientPromise;
        const db = client.db('Blogs');
        const collection = await db.collection('blogcollection');
        const result = await collection.deleteOne({_id:new ObjectId(id)});
        if(result.deletedCount === 0){
            return new Response(JSON.stringify({error:"failed to delete the blog"},{status:404}))
        }
        return new Response(JSON.stringify({success:true},{status:200}))
    }catch(error){ 
        console.error('POST error:',error);
        return new Response(JSON.stringify({error: 'Failed to add blog'}),{status:500})
    }
}