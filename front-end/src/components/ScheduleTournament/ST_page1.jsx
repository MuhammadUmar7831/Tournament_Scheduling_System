import React from 'react'
import { useContext } from 'react';
import ScheduleContext from '../context/ScheduleContext';


export default function ScheduleTournament(props) {
    const {setTournamentName, setSelectedSport } = useContext(ScheduleContext);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setTournamentName(inputValue);
    };


    const handleSelectChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedSport(selectedValue);
    };

    return (
        <>
            <div className='w-2/3 m-auto mt-10'>
                <form onSubmit={props.nextPage}>
                    <div className="mb-6">
                        <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Tournament name</label>
                        <input onChange={handleInputChange} type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your sport</label>
                    <select onChange={handleSelectChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Cricket</option>
                        <option>Football</option>
                        <option>Hockey</option>
                        <option>Futsal</option>
                        <option>Baketball</option>
                    </select>
                    <div className='flex justify-end my-2'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
                    </div>
                </form>
            </div>
        </>
    )
}