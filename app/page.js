"use client";
import Link from "next/link";
import { useState,useEffect } from "react";
import DOMpurify from 'isomorphic-dompurify';
import extractFirstImg from "./utils/extractImage";
import Image from "next/image";
export default function Home() {
  const [blogs,setblogs]=useState([]);
    
  useEffect(()=>{
      async function fetchBlogs() {
          const res = await fetch(`/api/blogs`);
          const data = await res.json();
          setblogs(data);
      }
      fetchBlogs();
  },[]);
  return(
      <main className="min-h-screen text-white p-6 md:p-12">
          <div className="max-w-3xl mx-auto md:my-auto">            
              <h1 className="text-4xl font-bold mb-8 text-red-400">All Posts</h1>
                  <div className="space-y-6">
                      {blogs.map((blog)=>{
                          const imgurl = extractFirstImg(blog.content);
                          return(
                          <Link key={blog._id}
                          href={`Blog/${blog.slug}`} className="max-w-auto mx-auto bg-gray-900 rounded-xl shadow-md flex hover:bg-gray-800 transition">
                              {imgurl?<Image src={imgurl} alt="No Image" height="70" width="100" className="w-1/3 h-36 p-4"/>:null}
                              <div className="w-2/3 p-4 flex flex-col">
                                  <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                                  <p className="text-gray-300 line-clamp-2 font-normal" dangerouslySetInnerHTML={{__html:DOMpurify.sanitize(blog.content.substring(0,120))}}></p>
                              </div>
                          </Link>
                      )})}
                  </div>
          </div>
      </main>
  )
}
