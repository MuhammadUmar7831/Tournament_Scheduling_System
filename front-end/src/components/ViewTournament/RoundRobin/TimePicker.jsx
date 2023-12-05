import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Timepicker(props) {

    const [hour, setHour] = useState('1');
    const [minute, setMinute] = useState('00');
    const [ampm, setAmpm] = useState('AM');

    useEffect(() => {
        console.log(props.time);
    }, [])
    
    // useEffect(() => {
    //     updateSelectedTime();
    // }, [hour, minute, ampm])


    // const handleHourChange = (e) => {
    //     setHour(e.target.value);
    // };

    // const handleMinuteChange = (e) => {
    //     setMinute(e.target.value);
    // };

    // const handleAmpmChange = (e) => {
    //     setAmpm(e.target.value);
    // };

    // const updateSelectedTime = () => {
    //     const formattedTime = `${hour}:${minute} ${ampm}`;

    //     const updatedTimes = [...props.time];
    //     updatedTimes[props.index] = formattedTime;

    //     props.setTime(updatedTimes);
    // };

    return (
        <div className='mx-auto'>
            <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">{props.header}</label>
            <div className="mt-2 p-5 w-40 bg-white rounded-lg shadow-xl">
                <div className="flex">
                    <select name="hours" className="bg-transparent text-xl appearance-none outline-none">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <span className="text-xl mx-3 font-bold">:</span>
                    <select name="minutes" className="bg-transparent text-xl appearance-none outline-none mr-4">
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                    </select>

                    <select name="ampm" className="bg-transparent text-xl appearance-none outline-none">
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
