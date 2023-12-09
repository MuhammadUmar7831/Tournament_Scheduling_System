import React, { useState, useContext, useEffect } from 'react';
import ScheduleContext from '../context/ScheduleContext';
import TournamentCard from './TournamentCard';
import Navbar from '../Navbar';
import LoadingBar from 'react-top-loading-bar';

export default function ViewTournament() {
    const { getSchedules, schedules } = useContext(ScheduleContext);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const asyncFun = async ()=>{   
            setProgress(50);
            await getSchedules();
            setProgress(100);
        }
        asyncFun();
    }, []);

    return (
        <>
            <LoadingBar
                color='#EAB208'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={5}
            />
            <Navbar />

            {(!schedules || schedules.length === 0) && (
                <div className='w-full text-5xl text-center mt-[10vh]'>
                    :( No Tournament Scheduled
                </div>
            )}
            {Array.isArray(schedules) && schedules.length !== 0 && (
                <div className='flex flex-wrap w-11/12 my-10 m-auto'>
                    {schedules.map((schedule) => (
                        <TournamentCard key={schedule._id} schedule={schedule} />
                    ))}
                </div>
            )}
        </>
    );
}