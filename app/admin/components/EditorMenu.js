'use client';
import React from 'react'

import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Highlighter, Italic, List, ListOrdered, Strikethrough, Image } from 'lucide-react';
export default function EditorMenu({editor}) {
  if(!editor){
    return null;
  }
  const options = [
    {
        icon:<Heading1 className='size-4'/>,
        onClick:()=>editor.chain().focus().toggleHeading({level:1}).run(),
        preesed: editor.isActive("Heading",{level:1}),
    },
    {
        icon:<Heading2 className='size-4'/>,
        onClick:()=>editor.chain().focus().toggleHeading({level:2}).run(),
        preesed: editor.isActive("Heading",{level:2}),
    },
    {
        icon:<Heading3 className='size-4'/>,
        onClick:()=>editor.chain().focus().toggleHeading({level:3}).run(),
        preesed: editor.isActive("Heading",{level:3}),
    },
    {
        icon:<Bold className='size-4'/>,
        onClick:()=>editor.chain().focus().toggleBold().run(),
        preesed: editor.isActive("bold"),
    },
    {
        icon:<Italic className='size-4'/>,
        onClick:()=>editor.chain().focus().toggleItalic().run(),
        preesed: editor.isActive("italic"),
    },
    {
        icon:<Strikethrough className='size-4'/>,
        onClick:()=>editor.chain().focus().toggleStrike().run(),
        preesed: editor.isActive("strike"),
    },
    {
        icon:<AlignLeft className='size-4'/>,
        onClick:()=>editor.chain().focus().setTextAlign("left").run(),
        preesed: editor.isActive({textAlign:"left"}),
    },
    {
        icon:<AlignCenter className='size-4'/>,
        onClick:()=>editor.chain().focus().setTextAlign("center").run(),
        preesed: editor.isActive({textAlign:"center"}),
    },
    {
        icon:<AlignRight className='size-4'/>,
        onClick:()=>editor.chain().focus().setTextAlign("right").run(),
        preesed: editor.isActive({textAlign:"right"}),
    },
    {
        icon:<List className='size-4'/>,
        onClick:()=>editor.chain().focus().toggleBulletList().run(),
        preesed: editor.isActive("bulletList"),
    },
    {
        icon:<ListOrdered className='size-4'/>,
        onClick:()=>editor.chain().focus().toggleOrderedList().run(),
        preesed: editor.isActive("orderedList"),
    },
    {
        icon:<Highlighter className='size-4'/>,
        onClick:()=>editor.chain().focus().toggleHighlight().run(),
        preesed: editor.isActive("highlight"),
    },
  ];
  const handleUploadImage = async(e) =>{
    const file = e.target.files[0];
    console.log(file);
    if(!file) return;
    const reader = new FileReader();
    reader.onloadend=()=>{
        const base64=reader.result;
        editor.chain().focus().insertContent({
            type:"image",
            attrs:{
                src:base64,
                style:"width 600px; height:500px; object-fit:cover;",
            }
        }).run();
    };
    reader.readAsDataURL(file);
    e.target.value="";
  }
  return(
    <div className='border rounded-md p-1 mb-1 bg-gray-700 space-x-2'>
        {options.map((option,index)=>(
            <button key={index} type="button" 
            className={`p-2 rounded-md hover:bg-gray-800 ${option.preesed?"bg-slate-800":""}`}
            onClick={option.onClick}>
                {option.icon}
            </button>
    ))}
        <label className='size-4 hover:bg-gray-800 border-1 p-2 mb-1 rounded-md'>Upload Image
            <input type='file' accept='image/*' onChange={handleUploadImage} multiple className='hidden' />
        </label>

    </div>
  )
}
