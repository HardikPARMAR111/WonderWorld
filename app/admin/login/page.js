'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function AdminLogin(){
    const[err,seterr]=useState('');
    const router=useRouter();

    const handlesubmit =async(e)=>{
        e.preventDefault();
        const username = e.target.unm.value;
        const password = e.target.pwd.value;
        const res = await signIn("credentials",{
            redirect:false,
            username,
            password,
            
        });
        if(res.ok){
            router.push("/admin/dashboard");
        }
        else{
            seterr("Invalid Credentials");
        }
    }
    return(
        <>
        <main className="min-h-screen text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto "> 
                <form onSubmit={handlesubmit} method='POST' className='flex flex-col space-y-4 border-2 border- rounded-lg mt-36'>
                <h1 className="text-4xl text-center mt-2">Admin Login</h1>
                    <input type="text" name="unm" placeholder='Enter Your Username' required className='mt-4 ml-2 mr-2 px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-red-400' />
                    <input type="password" name="pwd" placeholder='Enter Your Password' required className='ml-2 mr-2 mt-4 px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-red-400'/>
                    <button type="submit" className='ml-2 mr-2 mt-4 mb-2 bg-gray-700 hover:bg-black transition-colors duration-200 ease-in-out text-white font-semibold py-3 rounded-md '>Login</button>
                </form>
                {err && <p className="text-sm text-red-200">{err}</p>}
            </div>
        </main>
        </>
    )
}