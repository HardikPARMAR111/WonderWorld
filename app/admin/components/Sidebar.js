'use client'
import React, { useState,useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { Menu, X,UserCircle2 } from 'lucide-react';
export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen,setIsopen]= useState(true);
    useEffect(()=>{
        const isDesktop = window.innerWidth>=768;
        setIsopen(isDesktop);
    },[])
    
    const links = [
        {name : "Dashboard",href:"/admin/dashboard"},
        {name : "Create Blog",href:"/admin/createBlog"},
        {name : "Manage Blogs",href:"/admin/edit"},
    ]
  return (
    <>
        <button onClick={()=>{setIsopen(!isOpen)}} className='md:hidden p-2 text-white bg-gray-900 fixed top-0 left-0 z-50'>{isOpen?<X/>:<Menu/>}</button>
        <div className={`bg-black fixed top-0 left-0 h-full w-52 text-white p-6 border-r-2 border-r-white transition-transform duration-300 z-40  ${isOpen ? 'translate-x-0':'-translate-x-full'} `}>
            <div className='p-4'>
            <h2 className='text-xl font-bold mt-14 mb-6'>Admin panel</h2>
            <ul className='space-y-4'>
                {links.map(link=>(
                   <li key={link.href}>
                    <Link href={link.href} className={`block p-2 rounded hover:bg-gray-700 ${pathname === link.href?"bg-gray-700":""}`} onClick={()=>setIsopen(window.innerWidth<768 ? false :true)}>
                    {link.name}</Link>
                   </li> 
                ))}
            </ul>
            </div>
            <div className='absolute bottom-4 left-4 flex items-center space-x-3 text-white'>
                <UserCircle2 className='w-12 h-12'/>
                <span className='text-base font-semibold'>admin</span>
            </div>
        </div>
    </>

  )
}

