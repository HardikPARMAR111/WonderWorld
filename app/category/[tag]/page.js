import BlogList from "./BlogList";

export default async function TagPage({params}) {
    const {tag} = params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`,{
        cache:"no-store",
    });
    const allBlogs = await res.json();
    return <BlogList tag={tag} allBlogs={allBlogs}/>
}