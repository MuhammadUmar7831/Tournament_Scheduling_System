import React, { useState, useContext, useEffect } from 'react'
import Datepicker from "react-tailwindcss-datepicker";
import AddVenue from './AddVenue';
import ScheduleContext from '../context/ScheduleContext';

import DayStartEnd from './DayStartEnd'
import Duration from './Duration';

import { generateSlots } from '../../utilities/utilities';

export default function ST_page2(props) {

    const [inputValue, setInputValue] = useState('');
    const [alert, setAlert] = useState('hidden');

    const { setNoTeams, venues } = useContext(ScheduleContext);
    const { setTeamNames } = useContext(ScheduleContext);
    const { dates, setDates } = useContext(ScheduleContext);
    const { matchFormat, setMatchFormat, noteams } = useContext(ScheduleContext);
    const { setStartingTimes, setEndingTimes, noTimeSlots} = useContext(ScheduleContext);

    const goToNext = () => {
        if (!correctTime()) {
            setIsValidTime(true);
            return;
        } else{
            generateSlots(dayStartTime, noTimeSlots, matchDuration, setStartingTimes, setEndingTimes);
        }

        if (inputValue != '' && venues.length > 0 && matchFormat !== '' && dates !== null) {
            props.nextPage();
        } else {
            setAlert('flex')
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNoTeams(0);
        setInputValue('0');
        setTeamNames([]);

        if (value === '' || parseInt(value) < 4) {
            setInputValue('4');
            setNoTeams(4);
        } else if (value > 65) {
            setInputValue('64');
            setNoTeams(64);
        } else {
            setInputValue(value);
            setNoTeams(value);
        }

        const isPowerOfTwo = Number.isInteger(Math.log2(value));

        if (matchFormat !== "Round Robin" && !isPowerOfTwo) {
            setMatchFormat('');
        }

    };

    const handleDateChange = (newDates) => {
        setDates(newDates);
    };

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setMatchFormat(value);
    };

    const [dayStartTime, setDayStartTime] = useState('09:00 AM');
    const [dayEndTime, setDayEndTime] = useState('05:00 PM');


    function correctTime() {
        let [stime, sampmValue] = dayStartTime.split(' ');

        let [shours, sminutes] = stime.split(':');

        // Convert hours to 24-hour format
        shours = (parseInt(shours, 10) % 12) + (sampmValue === 'PM' ? 12 : 0);

        const stotal = shours * 60 + parseInt(sminutes, 10);

        let [etime, eampmValue] = dayEndTime.split(' ');

        let [ehours, eminutes] = etime.split(':');

        // Convert hours to 24-hour format
        ehours = (parseInt(ehours, 10) % 12) + (eampmValue === 'PM' ? 12 : 0);

        const etotal = ehours * 60 + parseInt(eminutes, 10);

        console.log(dayEndTime, dayStartTime, dayStartTime, etotal, stotal, etotal - stotal);

        return etotal - stotal > 0;
    }

    const [isValidTime, setIsValidTime] = useState(false);
    const [matchDuration, setMatchDuration] = useState('01:30');

    return (
        <>
            {/*danger alert */}
            <div id="alert-border-2" className={`${alert} items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800`} role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="ml-3 text-sm font-medium">
                    Input fields are empty.
                </div>
                <button onClick={() => setAlert('hidden')} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-2" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>


            <div className='w-2/3 m-auto mt-10'>
                <div>
                    <label htmlFor="visitors" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Number of Teams</label>
                    <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="3 < x < 65" required min={2} value={inputValue} onInput={handleInputChange} />
                </div>


                <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Enter date range</label>
                <Datepicker
                    value={dates}
                    onChange={handleDateChange}
                    readOnly={true}
                    placeholder='Select date range'
                    primaryColor={"amber"}
                    minDate={new Date().toJSON().slice(0, 10)}
                    inputClassName="w-full p-3 rounded-md focus:ring-0 font-normal text-sm border border-gray-300 bg-gray-50 dark:bg-green-900 dark:placeholder:text-gray-400"
                />

                <AddVenue />

                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Match Format</h3>
                <ul className="items-center w-full my-2 text-sm font-medium text-gray-900  bg-white shadow border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input onChange={handleRadioChange} defaultChecked={true} id="horizontal-list-radio-round" type="radio" value="Round Robin" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-round" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Round Robin</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input onChange={handleRadioChange} disabled={!Number.isInteger(Math.log2(noteams))} checked={matchFormat === 'Group Stage' && Number.isInteger(Math.log2(noteams))} id="horizontal-list-radio-group" type="radio" value="Group Stage" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-group" className={`w-full py-3 ml-2 text-sm font-medium text-gray-${!Number.isInteger(Math.log2(noteams)) ? '400' : '900'} dark:text-gray-300`}>Group Stage</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input onChange={handleRadioChange} disabled={!Number.isInteger(Math.log2(noteams))} checked={matchFormat === 'Knock out' && Number.isInteger(Math.log2(noteams))} id="horizontal-list-radio-knock" type="radio" value="Knock out" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-knock" className={`w-full py-3 ml-2 text-sm font-medium text-gray-${!Number.isInteger(Math.log2(noteams)) ? '400' : '900'} dark:text-gray-300`}>Knock out</label>
                        </div>
                    </li>
                </ul>

                <div id='venue' className="block my-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Enter Start & End Time of Day
                    </h5>
                    {(isValidTime) && (<p className={`text-red-500`}>*Invalid Time</p>)}
                    <div className='flex justify-between'>
                        <DayStartEnd header={`Starting Time`} time={dayStartTime} setTime={setDayStartTime} />
                        <DayStartEnd header={`Ending Time`} time={dayEndTime} setTime={setDayEndTime} />
                    </div>
                    <div className='flex justify-between'>
                        <Duration header={`Match Duration`} time={matchDuration} setTime={setMatchDuration} />
                    </div>
                </div>

                <div className='flex justify-between mb-2'>
                    <button onClick={props.prevPage} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Previous</button>
                    <button onClick={goToNext} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
                </div>
            </div>

        </>
    )
}