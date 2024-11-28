"use client";

import React from 'react'
import { usePathname } from 'next/navigation';

const Footer = () => {

    
  const pathname = usePathname()

  const showFooter = ["/", "/generatepoll", "/polls", "/login", "/profile"].includes(pathname);

  return (
    <>
    { showFooter &&
    <footer className='bg-black flex flex-col justify-center items-center text-white p-6 font-extralight'>
        <div>Created with ❤️ by Abhrajit Gupta</div>
    </footer>}
    </>
  )
}

export default Footer