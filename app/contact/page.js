import React from 'react'
import Link from 'next/link'
import {FaGithub,FaLinkedin} from 'react-icons/fa'


export default function page() {
  return (
    <section id="contact" className='bg-[#0d0d0d] py-20 px-4 text-white'>
        <div className='max-w-2xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8'>Contact Me</h2>
          <form action="" method='POST' className='flex flex-col space-y-4'>
            <input type="text" name="nm" placeholder='Enter Your Name' required className='px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-red-400'/>
            <input type="email" name="email" placeholder='Enter Your Email' required className='px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-red-400'/>
            <textarea name='msg' placeholder='Enter Your Message' rows={5} required className='px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus: ring-red-400' />
            <button className='bg-gray-700 hover:bg-black transition-colors duration-200 ease-in-out text-white font-semibold py-3 rounded-md '>Send Message</button>
          </form>
          <div className='mt-10 flex justify-center space-x-6'>
            <div className='flex items-center justify-center bg-gray-800 hover:bg-black transition-colors rounded-full' style={{width:"30%", minWidth:"140px", height:"80px", flex:"0 1 30%" }}>
            <Link href="https://github.com/HardikPARMAR111" target='_blank' className='hover:text-red-400 transition-colors' ><FaGithub size={28}/></Link></div>
            <div className='flex items-center justify-center bg-gray-800 hover:bg-black transition-colors rounded-full' style={{width:"30%", minWidth:"140px", height:"80px", flex:"0 1 30%" }}>
            <Link href="https://linkedin.com/in/hardik-parmar" target='_blank' className='hover:text-red-400 transition-colors' ><FaLinkedin size={28}/></Link></div>
          </div>
        </div>
      </section>
  )
}
