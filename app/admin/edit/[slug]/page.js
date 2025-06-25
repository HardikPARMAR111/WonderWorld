'use client'
import { useEffect,useState } from "react";
import { useParams,useRouter } from "next/navigation";


export default function EditBlogPosts(req){
    const router = useRouter();
    const {slug} = useParams();

    const [loading,setloading]=useState(true);
    const [blog,setblog]=useState(null);
    useEffect(()=>{
        const fetchBlog = async()=>{
            const res = await fetch(`/api/blogs/${slug}`);
            if(!res.ok){
                throw new Error("failed to fetch blog blah blah blah");
            }
            const data = await res.json();
            console.log(data);
            setblog(data);
            setloading(false);
        };
        if(slug) fetchBlog();

    },[slug]);
   const handlesubmit=async(e)=>{
        e.preventDefault();
        const updatedTitle = e.target.title.value;
        const updatedTags = e.target.tags.value;
        const updatedContent = e.target.content.value;
        try {
            const res = await fetch("/api/blogs/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    slug,
                    title:updatedTitle,
                    tags:updatedTags,
                    content:updatedContent,
                }),
            });
            const data=await res.json();
            console.log(data);
            if (!res.ok && !data.success) {
                alert("something wrong")
                router.push("/admin/edit");
            }
            else {
                alert("blog updated successfully");
                router.push("/admin/edit");
            }
        }catch(err){
                console.error(err);
        }
   };
   if(loading) return<h1>loading</h1>;
   if(!blog) return<p>blog not found</p>;
 
  return (
    <main className='min-h-screen text-white p-6 md:p-12'>
        <div className="max-w-3xl mx-auto ">
          <h1 className='text-3xl text-white text-center'>Update Blog</h1>
          <form onSubmit={handlesubmit} className='flex flex-col space-y-4'>

              <label htmlFor='title' className='block text-lg font-semibold mt-3'>Title</label>

              <input type="text" name="title" placeholder='Enter The Title ' required className='px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-green-400' defaultValue={blog.title} />

              <label htmlFor='tags' className='block text-lg font-semibold'>Tags</label>

              <input type="text" name="tags" placeholder='Enter The Tags ' required className='px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-green-400' defaultValue={blog.tags}/>

              <label htmlFor='content' className='block text-lg font-semibold'>Content</label>

              <textarea name='content' placeholder='Enter The Content' rows={7} required className='px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-green-400' defaultValue={blog.content}/>

              <button type="submit" className='bg-gray-700 hover:bg-black transition-colors duration-200 ease-in-out text-white font-semibold py-3 rounded-md '>Save Blog</button>
          </form>
        </div>
    </main>
  )
}
