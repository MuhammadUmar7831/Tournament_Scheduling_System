import React from 'react'
import { useContext, useEffect } from 'react';
import ScheduleContext from '../context/ScheduleContext';
import TournamentCard from './TournamentCard';
import Navbar from '../Navbar';

export default function () {
    const { getSchedules, schedules } = useContext(ScheduleContext);

    useEffect(() => {
        getSchedules();
    }, [])
    return (
        <>
          <Navbar />

            <div className='flex flex-wrap w-11/12 my-10 m-auto'>
                {schedules.length !== 0 && schedules.map((schedule) => {
                    return (
                        <TournamentCard key={schedule._id} schedule={schedule} />
                    )
                })}
            </div>
        </>
    )
}