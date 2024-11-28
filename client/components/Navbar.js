"use client";

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';

const Navbar = () => {

  const pathname = usePathname()

  const { data: session } = useSession();

  const router = useRouter();

  const ref = useRef();

  const showNavbar = ["/", "/generatepoll", "/polls", "/login", "/profile"].includes(pathname);

  const clickHamburger = () => {
    if(ref.current.classList.contains('hidden')){
      ref.current.classList.remove('hidden');
      ref.current.classList.add('flex');
    }
    else{
      ref.current.classList.add('hidden');
    }
  }


  return (
    <>
      {showNavbar && <nav className='bg-black text-white p-4 flex flex-col md:flex-row gap-4 md:gap-0  sticky top-0 justify-between items-center z-10'>
        <Link href={"/"}>
          <div className='logo'>
            <img onClick={clickHamburger} src="/more.png" className='invert absolute left-5 md:hidden' height={30} width={30} alt="logo" />
            <span className='text-3xl font-bold'>PollSwift</span>
          </div>
        </Link>
        <ul ref={ref} className='md:flex flex-col md:flex-row justify-end items-center gap-4 hidden'>
           <li><Link href={"/"}>Home</Link></li>
          {session && <li><Link href={"/generatepoll"}>Poll Maker</Link></li>}
          {session && <li><Link href={"/polls"}>Your Polls</Link></li>}
          {session && <li><Link href={"/profile"}>Profile</Link></li>}
          {!session && <li><Link href={"/login"} className='bg-slate-600 px-6 py-2 rounded-md'>Log In</Link></li>}
          {session && <li className='bg-slate-600 px-6 py-2 rounded-md cursor-pointer' onClick={() => signOut()}>Log Out</li>}
        </ul>
      </nav>}
    </>
  )
}

export default Navbar