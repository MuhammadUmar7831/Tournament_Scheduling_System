import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Duration(props) {

    const [hour, setHour] = useState(() => {
        const [hours] = props.time.split(':');
        return hours;
    });

    const [minute, setMinute] = useState(() => {
        const [, minutes] = props.time.split(':');
        return minutes;
    });

    useEffect(() => {
        const formattedTime = `${hour}:${minute}`;
        console.log('formattedTime', hour, minute);

        props.setTime(formattedTime);
    }, [hour, minute]);

    const handleHourChange = (e) => {
        if (minute === '00' && e.target.value === '00') {
            return;
        }
        setHour(e.target.value);
    };

    const handleMinuteChange = (e) => {
        if (hour === '00' && e.target.value === '00') {
            return;
        }
        setMinute(e.target.value);
    };

    const handleAmpmChange = (e) => {
        setAmpm(e.target.value);
    };

    return (
        <div className='mx-auto'>
            <label htmlFor="date" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">{props.header}</label>
            <div className="mt-2 p-5 w-40 bg-white rounded-lg shadow-xl">
                <div className="flex justify-between">
                    <select name="hours" value={hour} onChange={handleHourChange} className="bg-transparent text-xl appearance-none outline-none">
                        <option value="00">00</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                    </select>
                    <span className="text-xl mx-3 font-bold">:</span>
                    <select name="minutes" value={minute} onChange={handleMinuteChange} className="bg-transparent text-xl appearance-none outline-none mr-4">
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
