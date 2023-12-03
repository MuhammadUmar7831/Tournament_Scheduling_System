import React from 'react'
import { useState, useContext, useEffect } from 'react';
import ScheduleContext from '../context/ScheduleContext';
import TournamentCard from './TournamentCard';
import Navbar from '../Navbar';
import LoadingBar from 'react-top-loading-bar';

export default function () {
    const { getSchedules, schedules } = useContext(ScheduleContext);

    const [progress, setProgress] = useState(0)
    useEffect(() => {
        setProgress(50);
        getSchedules();
        setProgress(100);
    }, [])

    return (
        <>
            <LoadingBar
                color='#EAB208'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={5}
            />
            <Navbar />

            {(schedules.length === 0) && (<div className='w-full text-5xl text-center mt-[10vh]'>
                :( No Tournament Scheduled
            </div>
            )}
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