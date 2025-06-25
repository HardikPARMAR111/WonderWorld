'use client'
import React from 'react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';

export default function page() {
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');
  const [tags, settags] = useState('');
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const tagArray = tags.split(",").map(tag=>tag.trim().toLowerCase());
  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!title || !tags || !content){
      seterror("all fields are compulsory");
      return;
    }
    try{
      const res = await fetch('/api/blogs',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({title,tags:tagArray,content}),
      });
      if(!res.ok){
        throw new Error('Failed to create Blog')
      }
      setsuccess('Blog created Successfully');
      settitle('');
      settags('');
      setcontent('');
      seterror(null);
    }catch(err){
      seterror(error.message);
    }
  }
  return (
    <>
    <Sidebar/>
    <main className='min-h-screen text-white p-6 md:p-12'>
        <div className="max-w-3xl mx-auto ">
        {success && <p className='text-green-500 mb-4'>{success}</p>}
        {error && <p className='text-red-500 mb-4'>{error}</p>}
          <h1 className='text-3xl text-white text-center'>Create Blog</h1>
          <form onSubmit={handleSubmit} method='POST' className='flex flex-col space-y-4'>
              <label htmlFor='title' className='block text-lg font-semibold mt-3'>Title</label>
              <input type="text" name="title" placeholder='Enter The Title ' required className='px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-green-400' value={title} onChange={(e)=>settitle(e.target.value)}/>
              <label htmlFor='tags' className='block text-lg font-semibold'>Tags</label>
              <input type="text" name="tags" placeholder='Enter The Tags ' required className='px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-green-400' value={tags} onChange={(e)=>{settags(e.target.value)}}/>
              <label className='block text-lg font-semibold'>Content</label>
              <Editor content={content} setcontent={setcontent}/>
              <button type='submit' className='bg-gray-700 hover:bg-black transition-colors duration-200 ease-in-out text-white font-semibold py-3 rounded-md '>Save Blog</button>
          </form>
        </div>
    </main>
    </>
  )
}
