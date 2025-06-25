'use client'
import React from 'react'

export default function page() {
  return (
   <>
        <main className='min-h-screen text-white p-6 md:p-12'>
            <div className='max-w-3xl mt-10 mx-auto md:p-12'>
                <h1 className='text-4xl font-bold mb-6 text-red-400'>About the Blogs</h1>
                <section className='mb-10'>
                    <p className='text-2xl text-gray-300 mb-4'>Welcome to <span className='text-white font-semibold'>Blogs</span></p>
                    <p>
                        I started this blog website to understand the concept of the website ant to talk about my day to day thoughts on the IT sector, Entertainment, Gaming and a lot more.
                    </p>
                </section>
                <section className='mb-10'>
                    <h2 className="text-2xl font-semibold text-white mb-2">What You will Find here</h2>
                    <ul className='list-disc list-inside text-gray-300 space-y-1'>
                        <li>IT Sector</li>
                        <li>Business Reports</li>
                        <li>Entertainment Industries</li>
                        <li>Gaming</li>
                    </ul>
                </section>
                <section className='mb-10'>
                    <h2 className="text-2xl font-semibold text-white mb-2">Let us Connect</h2>
                    <p className='text-gray-300'>If you enjoy reading make sure to reach out and suggest topic about what could more i can done.</p>
                </section>
            </div>
        </main>
   </>
  )
}
