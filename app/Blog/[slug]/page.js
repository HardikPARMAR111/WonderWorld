"use client";

import { useEffect,useState } from 'react';
import { useParams } from 'next/navigation';
import DOMpurify from 'isomorphic-dompurify';

export default function BlogDetail(){
    const {slug} =useParams();
    const [blog,setBlog]= useState(null);
    const [loading,setloading]=useState(true);
    useEffect(()=>{
        async function fetchblog() {
            try{
                const res = await fetch(`/api/blogs/${slug}`);
                if (!res.ok) throw new Error('blog not found');
                const data = await res.json();
                setBlog(data);
            }catch(error){
                console.error(error);
                setBlog(null);
            }finally{
                setloading(false);
            }
        }
        if (slug) fetchblog();
    },[slug])
    if (loading) return <p>Loading...</p>
    if(!blog) return <div>blog not found</div>
    return (
        <main className="min-h-screen text-white p-6 md:p-12">
            <div className='max-w-3xl mx-auto my-auto mt-12'>
                <h1 className='text-4xl text-center'>{blog.title}</h1>
            </div>
            <div className='max-w-none text-2xl mt-3.5 blog-content' dangerouslySetInnerHTML={{__html:DOMpurify.sanitize(blog.content),}}></div>
            
        </main>
    )
}