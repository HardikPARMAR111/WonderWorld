'use client'

import { usePathname } from "next/navigation"
import Navbar from "./components/Navbar"

export default function LayoutWrapper({children}){
    const pathname=usePathname();
    const hidenavbar = pathname.startsWith('/admin')
    return(
        <>
        {!hidenavbar && <Navbar/>}
        {children}
        </>
    )
}