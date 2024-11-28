"use client";
import Image from "next/image";
import Link from "next/link";
import Typed from "typed.js";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {


  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<i>Secure</i>', '<i>Fast</i>', '<i>Easy</i>'],
      typeSpeed: 80,
      loop: true,
    });

  }, []);

  useEffect(() => {

    if(session){
      router.push("/");
    }
    else{
      router.push("/login");
    }
    

  },[session])


  return (
    <main>
      <section className="flex justify-center items-center  min-h-[91vh]">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-5xl font-bold transition hover:scale-110 hover:text-slate-700">
            PollSwift
          </h1>
          <div>
            <p className="text-xl mx-10 md:mx-0">Pollswift is a platform that allows you to create and share polls with ease.</p>
            <p className="text-center mt-3"><span className="text-xl">Pollswift is</span> <span ref={el} className="text-xl font-bold"></span></p>
          </div>
          <div className="buttons flex justify-center items-center gap-3">
            <Link href={"/generatepoll"}><button className="bg-black text-white px-6 py-4 rounded-lg font-extralight hover:scale-110 transition  hover:bg-gray-600 text-xl md:text-lg">
              Get Started
            </button></Link>
            {/* <button className="bg-black text-white px-6 py-4 rounded-lg font-extralight text-lg hover:scale-110 transition  hover:bg-gray-600">
              Know more
            </button> */}
          </div>

        </div>
      </section>
      <section className="flex flex-col justify-center items-center gap-7  min-h-[91vh] mb-10">
        <h2 className="text-center text-4xl font-semibold italic">Our Mission</h2>
        <div className="cards flex flex-col md:flex-row justify-center items-center gap-12 mx-16">
          <div className="card flex flex-col min-w-[80vw] md:min-w-[20vw]  cursor-pointer justify-center items-center bg-gray-300 border min-h-[40vh] hover:scale-110 transition rounded-xl gap-5">
            <h2 className="italic text-4xl font-bold">Secure</h2>
            {/* Write about secure poll making */}
            <img src="/shield.png" height={100} width={100} alt="shield" />
            <p className="text-lg">Our platform is secure to use.</p>
          </div>
          <div className="card flex min-w-[80vw] md:min-w-[20vw] flex-col cursor-pointer justify-center items-center bg-gray-300 border min-h-[40vh] hover:scale-110 transition rounded-xl gap-5">
            <h2 className="italic text-4xl font-bold">Fast</h2>
            {/* Write about secure poll making */}
            <img src="/quick.png" height={100} width={100} alt="shield" />
            <p className="text-lg">Our platform is fast to use.</p>
          </div>
          <div className="card flex min-w-[80vw] md:min-w-[20vw] flex-col cursor-pointer justify-center items-center bg-gray-300 border min-h-[40vh] hover:scale-110 transition rounded-xl gap-5">
            <h2 className="italic text-4xl font-bold">Easy</h2>
            {/* Write about secure poll making */}
            <img src="/easy.png" height={100} width={100} alt="shield" />
            <p className="text-lg">Our platform is easy to use.</p>
          </div>
         
        </div>
      </section>
    </main>
  );
}
