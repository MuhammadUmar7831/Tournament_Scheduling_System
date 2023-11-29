import React, { useContext, useEffect, useState } from 'react'
import ScheduleContext from '../context/ScheduleContext';
import Match from './Match'
import { useNavigate } from 'react-router-dom';


export default function RoundRobin() {

    const { getDetail, detail, pin } = useContext(ScheduleContext);
    const nevigate = useNavigate();

    useEffect(() => {
        getDetail(pin);
    }, [pin])
    useEffect(() => {
        console.log(detail);
    }, [detail])

    return (
        <>
            <div className={`flex w-full h-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 absolute top-0 left-0`}>
                <div className='h-full flex items-center justify-center'>
                    <img onClick={() => { nevigate('/viewTournament') }} src="back.png" className='w-10 h-10 hover:cursor-pointer' alt="" srcSet="" />
                </div>
                <div className="flex items-center justify-between h-4/5 w-2/4 m-auto">
                    <p className="mx-2 self-end text-white text-lg md:text-xl lg:text-xl border-b-4 border-b-yellow-500 hover:text-amber-400 hover:cursor-pointer hover:border-b-amber-400">Fixtures</p>
                    <p className="mx-2 self-end text-white text-lg md:text-xl lg:text-xl border-b-4 border-b-yellow-500 hover:text-amber-400 hover:cursor-pointer hover:border-b-amber-400">Standings</p>
                </div>
            </div>


            <div className={`flex bg-white absolute w-full h-full left-0 flex-wrap`}>
                {detail &&
                    detail.matches &&
                    detail.matches.length !== 0 &&
                    detail.matches.map((match) => (
                        <Match key={match.number} match={match} />
                    ))}
            </div>
        </>
    )
}
