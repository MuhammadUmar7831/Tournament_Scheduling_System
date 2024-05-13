import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleContext from '../../context/ScheduleContext';

import SingleGroup from './SingleGroup';

export default function () {
    const navigate = useNavigate();
    const { pin, detail, getDetail } = useContext(ScheduleContext);

    useEffect(() => {
        getDetail(pin);
    }, [pin, detail]);

    return (
        <>
            <div className={`flex w-full h-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}>
                <div className='h-full flex items-center justify-center'>
                    <img onClick={() => { navigate('/viewTournament') }} src="/back.png" className='w-10 h-10 hover:cursor-pointer' alt="" srcSet="" />
                </div>
                <div className="flex items-center justify-between h-full w-2/4 m-auto">
                    <p onClick={() => { navigate('/groupstage/viewFixtures') }} className="mx-2 self-end text-white text-lg md:text-xl lg:text-xl border-b-4 border-b-yellow-500 hover:text-amber-400 hover:cursor-pointer hover:border-b-amber-400">Fixtures</p>
                    <p className="mx-2 self-end text-white text-lg md:text-xl lg:text-xl border-b-4 border-b-white hover:text-amber-400 hover:cursor-pointer hover:border-b-amber-400">Standings</p>
                </div>
            </div>

            <div className='w-full flex m-auto flex-wrap-reverse'>
                {(detail)
                    && (detail.groups.length !== 0 && detail.groups.map((group) => {
                        return (
                            <SingleGroup key={group.name} teams={group.teams} name={group.name}/>
                        )
                    }))}
            </div>
        </>
    );
}
