import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import ScheduleContext from '../context/ScheduleContext';

export default function TournamentCard({ schedule }) {

    const { setPin, setSelectedSport } = useContext(ScheduleContext);
    const navigate = useNavigate();

    const handleClick = () => {
        setPin(schedule.pin);
        setSelectedSport(schedule.sport);
        if (schedule.format === 'Round Robin') {
            navigate('/roundrobin/viewFixtures');
        }
        else if (schedule.format === 'Group Stage') {
            navigate('/groupstage/viewFixtures');
        } else if (schedule.format === 'Knock out') {
            navigate('/knockout/viewFixtures');
        }
    }

    return (
        <>
            <div className='flex flex-col border border-purple-200 rounded-lg w-3/5 m-auto my-4 md:w-2/4 md:m-6 lg:w-1/4 lg:m-6 bg-zinc-100 hover:bg-gray-200'>
                <h1 className='bg-gradient-to-r from-pink-500 to-yellow-500 rounded-t text-xl lg:text-2xl p-3 text-white font-bold hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 transition-colors'>{schedule.name}</h1>
                <div className='block'>

                    <span className='block w-full px-3 my-1 text-base text-gray-600'>
                        {schedule.teamNumber} Teams
                    </span>
                    <span className='block w-full px-3 my-1 text-base text-gray-600'>
                        from {schedule.startDate} to {schedule.endDate}
                    </span>
                    <span className='block w-full px-3 my-1 text-base text-gray-600'>
                        {schedule.format} fromat
                    </span>
                    <span className='block w-full px-3 my-1 text-base text-gray-600'>
                        {schedule.sport}
                    </span>

                </div>
                <div className='flex flex-auto justify-end'>
                    <button onClick={handleClick} className='bg-red-500 text-white text-sm h-10 mt-auto font-semibold p-2 m-2 rounded-lg'>
                        View Fixtures
                    </button>
                </div>
            </div>
        </>
    )
}
