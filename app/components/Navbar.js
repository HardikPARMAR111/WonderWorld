'use client'
import Link from 'next/link'
import React from 'react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
const tags = [ "Technology", "Movies", "Series", "Entertainment", "Science", "Travel", "Lifestyle", "Anime"];
export default function Navbar() {
    const [ Open, setOpen ] = useState(false)
    return (
        <>
            <div className='fixed flex flex-row w-full bg-black h-10'>
                <button onClick={() => setOpen(!Open)} className='top-2 left-4 z-50 p-2 bg-black text-white rounded hover:cursor-grab'>
                    {Open ? <X size={24} /> : <Menu size={24} />}
                </button>
                <h1 className='text-center m-auto text-4xl'>WONDERWORLD</h1>
            </div>
            <div className={`fixed top-10 left-0 h-full w-52 bg-black text-white p-6 transition-transform duration-300 z-40 ${Open ? 'translate-x-0' : '-translate-x-full'}`}>
                <ul className='space-y-6'>
                    <li className=" px-4 py-2 m-0 text-white hover:text-red-400 hover:bg-gray-900 transition-colors"><Link href="/Blog">Home</Link></li>
                    {tags.map((tag) => (
                        <li key={tag} className=" px-4 py-2 m-0 text-white hover:text-red-400 hover:bg-gray-900 transition-colors">
                            <Link href={`/category/${tag}`} className='block px-2 hover:text-red-400 hover:bg-gray-900 transition'>{tag}</Link>
                        </li>
                    ))}
                    <li className=' px-4 py-2 m-0 text-white hover:text-red-400 hover:bg-gray-900 transition-colors'><Link href="/about">About</Link></li>
                    <li className=' px-4 py-2 m-0 text-white hover:text-red-400 hover:bg-gray-900 transition-colors'><Link href="/contact">Contact</Link></li>
                </ul>
            </div>
        </>
    )
}
