import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import ScheduleContext from '../context/ScheduleContext';

export default function TournamentCard({ schedule }) {

    const {setPin} = useContext(ScheduleContext);
    const navigate = useNavigate();

    const handleClick = () => {
        setPin(schedule.pin);
        if (schedule.format === 'Round Robin') {
            navigate('/roundrobin/viewFixtures');
        }
        else if (schedule.format === 'Group Stage'){
            navigate('/groupstage/viewFixtures');
        }
    }

    return (
        <>
            <div className='card'>
                <h1 className='card-heading'>{schedule.name}</h1>
                <div className='card-body'>

                    <span className='block w-full px-3 my-1 text-base text-gray-600'>
                        {schedule.teamNumber} Teams
                    </span>
                    <span className='block w-full px-3 my-1 text-base text-gray-600'>
                        from {schedule.startDate} to {schedule.endDate}
                    </span>
                    <span className='block w-full px-3 my-1 text-base text-gray-600'>
                        {schedule.format} fromat
                    </span>

                    <div className='flex justify-end'>
                        <button onClick={handleClick} className='bg-red-500 text-white text-sm font-semibold p-2 m-2 rounded-lg'>
                            View Fixtures
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
