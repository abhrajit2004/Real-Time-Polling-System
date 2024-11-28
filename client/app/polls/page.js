"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Polls() {

    const [polls, setPolls] = useState([]);

    const { data: session } = useSession();

    const fetchPolls = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": session.user.email
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/getallpolls", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setPolls(result.polls);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        if(session && session.user){
            fetchPolls();
        }
    }, [session])


    return (
        <div className='min-h-[91vh]'>
            <h1 className='italic font-bold text-5xl text-center mt-4'>Your Polls</h1>
            <div className='polls flex flex-col md:flex-row justify-center items-center flex-wrap my-6 mx-6 gap-6'>
                {polls.length === 0 && <h1 className='text-2xl font-semibold text-center'>No Polls Available!</h1>}
                {polls.map((poll, index) => {

                    return <Link href={`/poll?id=${poll.pollId}`} key={index}><div className="poll md:w-[20vw] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 min-h-[50vh] w-[80vw]">
                        <div className="px-6 py-4">
                            <h2 className="text-xl font-semibold text-gray-800">{poll.question}</h2>
                            <p className="text-sm text-gray-500 mt-2">Created by: <span className="text-gray-700 font-medium">{poll.name}</span></p>
                        </div>
                        <div className="px-6 py-4">
                            <div className="space-y-2">


                                {poll.options.map((option, index) => {
                                    return <button className="w-full bg-gray-100 hover:bg-blue-100 text-gray-800 font-medium py-2 px-4 rounded transition duration-200" key={index}>
                                        {option.text}
                                    </button>
                                })
                                }


                            </div>
                        </div>
                    </div>
                    </Link>
                })}

            </div>
        </div>
    )
}