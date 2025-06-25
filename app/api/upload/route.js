import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { mkdirSync, existsSync } from 'fs';
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        if(!file){
            return NextResponse.json({success:false,message:"No file uploaded"},{status:400});
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(),'public','uploads');
        if(!existsSync(uploadDir)){
            mkdirSync(uploadDir,{recursive:true});
        }
        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(process.cwd(),"public","uploads",filename);

        await writeFile(filepath, buffer);

        return NextResponse.json({success:true,url:`/uploads/${filename}`});
    }catch(err){
        console.error("upload error",err);
        return NextResponse.json({success:false,message:'upload failed'},{status:500});
    }
}