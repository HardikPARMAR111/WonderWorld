"use client";
export default function Tiptaprender({html}) {
  return (
    <div className="prose" dangerouslySetInnerHTML={{__html:html}}/>
  )
};
