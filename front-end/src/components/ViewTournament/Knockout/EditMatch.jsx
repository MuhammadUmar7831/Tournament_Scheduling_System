import React, { useState, useEffect, useContext } from 'react'
import Datepicker from "react-tailwindcss-datepicker";
import ViewContext from '../../context/ViewContext';
import TimePicker from './TimePicker';

import LoadingBar from 'react-top-loading-bar'

export default function (props) {

    const { editMatchDate, editMatchVenue, editMatchTime } = useContext(ViewContext);

    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const [prevDate, setPrevDate] = useState({});
    const [dateLimit, setDateLimit] = useState({});
    const [newVenue, setNewVenue] = useState(props.venue);
    const [startTime, setStartTime] = useState(props.match.time.startTime);
    const [endTime, setEndTime] = useState(props.match.time.endTime);

    const handleDateChange = (newdate) => {
        setDate(newdate);
    };

    const handleVenueChange = (event) => {
        setNewVenue(event.target.value);
    }

    useEffect(() => {
        if (props.display !== 'hidden') {

            const [day, month, year] = props.date.split('-');
            const newDate = new Date(`${year}-${month}-${day}`);

            const [dayLimit, monthLimit, yearLimit] = props.dateLimit.split('-');
            const newDateLimit = new Date(`${yearLimit}-${monthLimit}-${dayLimit}`);

            setDate({ startDate: `${year}-${month}-${day}`, endDate: newDate });
            setPrevDate({ startDate: newDate, endDate: newDate });
            setDateLimit({ startDate: newDateLimit, endDate: newDateLimit })

        }
    }, [props.date, props.display]);

    const [progress, setProgress] = useState(0);

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        setProgress(25);
        await editMatchDate(props.match.number, props.pin, date.startDate);
        setProgress(50);
        await editMatchVenue(props.match.number, props.pin, newVenue);
        setProgress(75);
        await editMatchTime(props.match.number, props.pin, { startTime: startTime, endTime: endTime });
        setProgress(100);

        props.setDisplay('hidden');
    }
    useEffect(() => {
        if (props.display !== 'hidden') {
            console.log("trigg");
            console.log(startTime, endTime);
        }
    }, [startTime, endTime])


    return (
        <>
            <LoadingBar
                color='#EAB208'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={5}
            />

            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${props.display} bg-slate-400 bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full`}>
                <div className="relative m-auto mt-[5vh] p-4 w-2/3 max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Match Date and Venue
                            </h3>
                            <button onClick={() => { props.setDisplay('hidden'); }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form className="p-4 md:p-5" onSubmit={handleEditSubmit}>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                                {props.match.team1} vs {props.match.team2} on {props.match.date} at {props.match.venue}
                            </h3>
                            <div className="grid gap-4 mb-4 grid-cols-1">
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="Date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Match Date</label>
                                    <Datepicker
                                        value={date}
                                        onChange={handleDateChange}
                                        readOnly={true}
                                        useRange={false}
                                        asSingle={true}
                                        placeholder='Select date range'
                                        primaryColor={"amber"}
                                        minDate={prevDate.startDate}
                                        maxDate={dateLimit.startDate}
                                        inputClassName="w-full p-3 rounded-md focus:ring-0 font-normal text-sm border border-gray-300 bg-gray-50 dark:bg-green-900 dark:placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="venue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Match Venue</label>
                                    <input type="text" name='venue' value={newVenue} onChange={handleVenueChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Match Venue" required="" />
                                </div>

                                <div className='flex justify-between'>
                                    <TimePicker header={"Start Time"} time={props.match.time.startTime} setTime={setStartTime} />
                                    <TimePicker header={"End Time"} time={props.match.time.endTime} setTime={setEndTime} />
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
