"use client";
import Link from "next/link";
import { useState,useEffect } from "react";
import { Pencil,Trash2} from "lucide-react";
import Sidebar from "../components/Sidebar";
import DOMpurify from 'isomorphic-dompurify';
import extractFirstImg from "@/app/utils/extractImage";
import Image from "next/image";

export default function EditBlogPosts(){
    const [blogs,setblogs]=useState([]);
    
    useEffect(()=>{
        async function fetchBlogs() {
            const res = await fetch(`/api/blogs`);
            const data = await res.json();
            setblogs(data);
        }
        fetchBlogs();
    },[]);

    const handledelete = async(id)=>{
        const confirmDelete = window.confirm("are you sure want to delete the blog?")
        if(!confirmDelete) return;
           
        try{
            const res = await fetch("/api/blogs/delete",{
                method:"DELETE",
                headers:{'Content-Type':"application/json"},
                body:JSON.stringify({id}),
            });

            const result = await res.json();
    
            if(res.ok && result.success){
                setblogs((prevBlogs)=>prevBlogs.filter((blog)=>blog._id!==id));
                alert('blog deleted')
            } 
            else{
                
                alert(result.error || "failed to delete Blog");
            }
        }catch(err){
            console.error(err);
            alert("server error");
        }
    }
    return(
        <>
        <Sidebar/>
        <main className="min-h-screen text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto md:my-auto">            
                <h1 className="text-4xl font-bold mb-8 text-red-400 mt-6">All Posts</h1>
                    <div className="space-y-6"> 
                        {blogs.map((blog)=>{
                            const imgurl = extractFirstImg(blog.content);
                            return(
                            <div key={blog._id} className="flex p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition shadow relative ">
                                {imgurl ? <Image src={imgurl} className="w-1/3 h-36 p-4"/>:null}
                                <Link href={`/admin/edit/${blog.slug}`} className="absolute top-2 right-2 text-blue-600 hover:text-blue-400">
                                    <Pencil size={20}/>  
                                </Link>
                                <button className="absolute top-2 right-12 text-red-600 hover:text-red-400 transition-colors" onClick={()=>{handledelete(blog._id)}} >
                                    <Trash2 size={20}/>  
                                </button>
                                <div className="w-2/3 p-4 flex flex-col">
                                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                                <p className="text-gray-300 line-clamp-2 font-normal" dangerouslySetInnerHTML={{__html:DOMpurify.sanitize(blog.content.substring(0,120),"..."),}}></p>
                                </div>
                            </div>
                        )})}
                    </div>
               
            </div>
        </main>
        </>
    )
}