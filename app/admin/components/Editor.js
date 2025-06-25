'use client'
import React, { useEffect } from 'react'
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor,EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenu from './EditorMenu';

export default function Editor({content,setcontent}) {
  const editor = useEditor({
    extensions:[
      StarterKit.configure({
        bulletList:{
          HTMLAttributes:{
            class:"list-disc ml-3"
          },
        },
        orderedList:{
          HTMLAttributes:{
            class:"list-decimal ml-3"
          },
        },
      }),
      TextAlign.configure({
      types:['heading','paragraph'], 
      }),
      Highlight,
      Image.configure({
        inline:false,
        allowBase64:true,
      }),
    ],
    content:"",
    editorProps:{
      attributes:{
        class:"min-h-[156px] border rounded-md py-2 px-3 bg-gray-800",
      },
    },
    ssr:false,
    onBlur:({editor})=>{
      setcontent(editor.getHTML());
    }
  });
  useEffect(()=>{
    if(editor && content){
      editor.commands.setContent(content);
    }
  },[editor,content]);
  
  return( 
    <div>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor}/>
    </div>
  )
}
