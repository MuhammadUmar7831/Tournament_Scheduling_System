import React, { useContext, useEffect } from 'react';

export default function (props) {

    const sortedTeams = props.teams.sort((a, b) => {
        // First, compare by points
        if (b.points !== a.points) {
            return b.points - a.points;
        }

        // If points are equal, compare by boundaries
        return b.boundries - a.boundries;
    });

    return (
        <>
            <div className=' m-auto my-5'>
                <div className='w-full rounded-md p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 text-center text-white text-lg font-bold'>{props.name}</div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Team
                                </th>
                                <th scope="col" class="px-6 py-3 text-center">
                                    Matches Played
                                </th>
                                <th scope="col" class="px-6 py-3 text-center">
                                    Won
                                </th>
                                <th scope="col" class="px-6 py-3 text-center">
                                    Lost
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
                                <tr key={index} className={index < 2 ? 'bg-gradient-to-r from-yellow-200 via-red-200 to-pink-200 bg-opacity-5 border-b hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500' : 'bg-white border-b hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500'}>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {team.name}
                                    </th>
                                    <td class="px-6 py-4 text-center text-black">
                                        {team.matchesPlayed}
                                    </td>
                                    <td class="px-6 py-4 text-center text-black">
                                        {team.won}
                                    </td>
                                    <td class="px-6 py-4 text-center text-black">
                                        {team.lost}
                                    </td>
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
