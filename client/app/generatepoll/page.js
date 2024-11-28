"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';

const Generate = () => {

    const { data: session } = useSession();

    const [question, setQuestion] = useState("");
    const [optionsArray, setOptionsArray] = useState([{ text: "", votes: 0 }]);
    const router = useRouter();

    const addOptions = () => {
        setOptionsArray(optionsArray.concat([{ text: "", votes: 0 }]));
    }

    const handleChange = (index, text, votes) => {

        setOptionsArray((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { text, votes }
                }
                else {
                    return item
                }
            })
        })
    }

    const createPoll = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "question": question,
            "options": optionsArray,
            "email" : session.user.email,
            "name" : session.user.name,
            "pollId": uuidv4()
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/add", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setOptionsArray([{ text: "", votes: 0 }]);
                setQuestion("");
                router.push("/polls");
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className='min-h-[91vh] flex flex-col justify-start items-center gap-4 my-5'>
            <h1 className='text-3xl font-bold italic'>Step 1: Enter a question</h1>
            <input type="text" onChange={(e)=>setQuestion(e.target.value)} value={question} placeholder='Enter question' className='border border-black px-4 md:py-2 rounded-lg w-[85vw] md:w-[30vw] text-xl py-4' />
            <h1 className='text-3xl font-bold italic'>Step 2: Enter options</h1>
            <div className="options flex flex-col justify-center gap-4 items-center">
                {optionsArray.map((option, index) => {
                    return (
                        <div key={index} className='flex flex-col md:flex-row justify-center items-center gap-5'>
                            <input value={option.text} onChange={(e) => handleChange(index, e.target.value, option.votes)} type="text" placeholder={`Enter option ${index + 1}`} className='border border-black px-4 md:py-2 py-4 md:w-[20vw] rounded-lg text-xl w-[85vw]' />
                            <button onClick={() => addOptions()} className="bg-black text-white px-4 py-2 rounded-lg font-extralight text-xl transition w-[30vw] md:text-base md:w-[9vw] disabled:bg-gray-500" disabled={option.text<1}>
                                + Add
                            </button>
                        </div>

                    )
                })}

            </div>

            <button disabled={question.length < 5 || optionsArray.length < 2} onClick={() => createPoll()} className="bg-black text-white px-4 py-2 rounded-lg font-extralight transition w-[40vw] md:w-[9vw] disabled:bg-gray-500 md:text-base text-xl">
                Create Poll
            </button>


        </div>
    )
}

export default Generate
