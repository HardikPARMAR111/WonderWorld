"use client";
import React from 'react'
import Link from "next/link";
import extractFirstImg from '@/app/utils/extractImage';
import Tiptaprender from '@/app/components/Tiptaprender';

export default function BlogList({tag,allBlogs}) {
    const filteredBlogs = allBlogs.filter((blog)=>Array.isArray(blog.tags) && blog.tags.map((t)=>t.toLowerCase()).includes(tag.toLowerCase()))
  return (
    <main className="min-h-screen text-white p-6 md:p-12">
            <div className="max-w-3xl mt-10 mx-auto md:my-auto">            
                <h1 className="text-4xl font-bold mb-8 text-red-400">#{tag} Posts</h1>
                {filteredBlogs.length === 0?(
                    <p>No Post Found of this Category.</p>
                ):(
                    <div className="space-y-6">
                        {filteredBlogs.map((blog)=>{
                            const imgurl = extractFirstImg(blog.content);
                            return(
                                <Link key={blog._id}
                                href={`/Blog/${blog.slug}`} className="max-w-auto mx-auto bg-gray-900 rounded-xl shadow-md flex hover:bg-gray-800 transition">
                                    {imgurl?<img src={imgurl} alt="No Image" height="70" width="100" className="w-1/3 h-36 p-4"/>:null}
                                    <div className="w-2/3 p-4 flex flex-col">
                                        <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                                        <Tiptaprender html={blog.content.substring(0,60)}/>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}   
            </div>
        </main>
  )
}
