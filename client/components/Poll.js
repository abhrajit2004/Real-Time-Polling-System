"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Link from "next/link";

const socket = io("http://localhost:8000")

export const Poll = ()=> {

    const searchparam = useSearchParams();

    const [poll, setPoll] = useState(null);


    const pollid = searchparam.get("id");

    const fetchData = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "pollId": pollid
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/getpoll", requestOptions, {next: {revalidate: 1}})
            .then((response) => response.json())
            .then((result) => {
                setPoll(result.poll)
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {

        socket.emit('joinpoll', pollid);

        

        socket.on('pollData', (updateddata) => {
            setPoll(updateddata);
        });

        fetchData();

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        })

    }, [pollid])

    const handleVote = (optionIndex) => {
        socket.emit('vote', pollid, optionIndex)
    }

    return <div>
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg overflow-hidden">

                <div className="p-6">
                    <h2 className="text-lg md:text-base font-medium text-gray-800 mb-4">{poll && poll.question}</h2>
                    <p className="text-lg md:text-base text-gray-500 my-4">Created by: <span className="text-gray-700 font-medium">{poll && poll.name}</span></p>
                    <div className="space-y-4">

                        {poll && poll.options.map((option, index) => {

                            return <button onClick={() => handleVote(index)}
                                className="w-full flex items-center justify-between bg-gray-100 hover:bg-blue-100 text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200" key={index}>
                                <span className="text-lg md:text-base">{option.text}</span>
                                <span className="text-gray-500 text-lg md:text-base">{option.votes} votes</span>
                            </button>
                        })}


                    </div>
                </div>

                <div className="p-6 bg-gray-50 flex items-center justify-between">
                    <p className="text-sm text-gray-500"></p>
                    {/* <button
    className="text-blue-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    View Detailed Results
  </button> */}
                </div>

            </div>
            <Link className="mt-6 md:text-base text-lg bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-600 transition text-white" href={"/polls"}>Back to Poll</Link>
        </div>

    </div>
}

export const dynamic = 'force-dynamic';