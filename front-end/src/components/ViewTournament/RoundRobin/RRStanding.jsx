import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleContext from '../../context/ScheduleContext';

export default function () {
    const navigate = useNavigate();
    const { pin, detail, getDetail } = useContext(ScheduleContext);

    useEffect(() => {
        getDetail(pin);
    }, [pin, detail]);

    const sortedTeams = detail.teams.sort((a, b) => {
        // First, compare by points
        if (b.points !== a.points) {
            return b.points - a.points;
        }

        // If points are equal, compare by boundaries
        return b.boundries - a.boundries;
    });

    return (
        <>
            <div className={`flex w-full h-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}>
                <div className='h-full flex items-center justify-center'>
                    <img onClick={() => { navigate('/viewTournament') }} src="/back.png" className='w-10 h-10 hover:cursor-pointer' alt="" srcSet="" />
                </div>
                <div className="flex items-center justify-between h-full w-2/4 m-auto">
                    <p onClick={() => { navigate('/roundrobin/viewFixtures') }} className="mx-2 self-end text-white text-lg md:text-xl lg:text-xl border-b-4 border-b-yellow-500 hover:text-amber-400 hover:cursor-pointer hover:border-b-amber-400">Fixtures</p>
                    <p className="mx-2 self-end text-white text-lg md:text-xl lg:text-xl border-b-4 border-b-white hover:text-amber-400 hover:cursor-pointer hover:border-b-amber-400">Standings</p>
                </div>
            </div>

            <div className='w-2/3 m-auto my-[10vh]'>
                <div className='w-full rounded-md p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 text-center text-white text-lg font-bold'>Points Table</div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Team
                                </th>
                                <th scope="col" class="px-6 py-3 text-center">
                                    Points
                                </th>
                                <th scope="col" class="px-6 py-3 text-center">
                                    Boundries
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTeams.map((team, index) => (
                                <tr key={index} className={index < 4 ? 'bg-gradient-to-r from-yellow-200 via-red-200 to-pink-200 bg-opacity-5 border-b hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500' : 'bg-white border-b hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500'}>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {team.name}
                                    </th>
                                    <td class="px-6 py-4 text-center text-black">
                                        {team.points}
                                    </td>
                                    <td class="px-6 py-4 text-center text-black">
                                        {team.boundries}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
