"use client";

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {

    const { data: session } = useSession();


    const [name, setName] = useState(session && session.user.name);
    const [email, setEmail] = useState(session && session.user.email);

    const router = useRouter();

    //  useEffect(() => {
    
    //     if(session){
    //     router.push("/profile");
    //     }
    //     else{
    //     router.push('/login');
    //     }
    // },[router, session])


    return (
        <div className='min-h-[91vh] '>
            <h1 className='text-4xl font-bold text-center my-4 italic'>Profile Page</h1>
            <div className="profile flex flex-col justify-center items-center gap-6">
            <img src={session && session.user.image}className='rounded-full' height={100} width={100} alt="" />
            <form className='flex flex-col justify-center items-center gap-4'>
                <input onChange={(e)=>setName(e.target.value)} type="text" className='border w-[80vw] border-black px-4 py-2 md:w-[20vw] rounded-md disabled:bg-slate-300' disabled={session && session.user.name.length > 0} value={name}   />
                <input onChange={(e)=>setEmail(e.target.value)} type="email" className='border w-[80vw] border-black px-4 py-2 md:w-[20vw] rounded-md disabled:bg-slate-300' value={email} disabled={session && session.user.name.length > 0}  />
            </form>
            </div>
           
        </div>
    )
}

export default Profile
