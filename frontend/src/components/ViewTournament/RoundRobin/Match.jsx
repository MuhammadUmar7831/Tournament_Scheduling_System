import React, { useState, useContext, useEffect } from 'react'
import ScheduleContext from '../../context/ScheduleContext';
import UpdateMatch from './UpdateMatch';
import EditMatch from './EditMatch';

export default function Match(props) {

    function formatDate(inputDate) {
        const dateParts = inputDate.split('-');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);

        // Create a Date object with the parsed values
        const formattedDate = new Date(year, month - 1, day);

        // Options for formatting the date
        const options = { day: 'numeric', month: 'short', year: 'numeric' };

        // Format the date using the options
        const result = formattedDate.toLocaleDateString('en-US', options);

        return result;
    }

    const [updateDisplay, setUpdateDisplay] = useState('hidden');
    const [editMatchDisplay, setEditMatchDisplay] = useState('hidden')
    const { pin, selectedSport } = useContext(ScheduleContext);

    return (
        <>
            <div className={`w-11/12 lg:w-5/12 bg-${props.match.number === props.lastMatch ? 'blue' : 'yellow'}-100 h-48 mx-auto rounded-md border border-gray-200 m-5`}>
                <div className='flex  justify-between w-full h-1/4 rounded-t-md p-2'>
                    <span className='text-gray-600 font-bold'>Match#{props.match.number}</span>
                    <span className='text-gray-600'>{props.match.time.startTime} to {props.match.time.endTime}</span>
                    <span className='text-gray-600'>{formatDate(props.match.date)}</span>
                </div>

                <div className='w-11/12 h-2/4 m-auto px-6'>
                    <div className='flex justify-between my-2'>
                        <span className='text-gray-700'>{props.match.team1}</span>
                        <span className='text-gray-700'>
                            {props.match.score1}/{props.match.out1} ({props.match.boundries1})
                        </span>
                    </div>
                    <div className='flex justify-between my-2'>
                        <span className='text-gray-700'>{props.match.team2}</span>
                        <span className='text-gray-700'>
                            {props.match.score2}/{props.match.out2} ({props.match.boundries2})
                        </span>
                    </div>
                    <div className='my-2 m-auto text-center'>
                        <span className='text-gray-400'>{props.match.winner ? `${props.match.winner} won` : null}</span>
                    </div>
                </div>

                <div className='flex  justify-between w-full h-1/4 p-2'>
                    <span className='text-gray-400 font-semibold'>{props.match.venue}</span>
                    <div>
                        {(props.pinAuth) && (props.lastMatch < props.match.number) && (props.matches.length - 2 > props.match.number) && (
                            <button onClick={() => { setEditMatchDisplay(''); }} type="button" className="text-white w-10 h-6 bg-amber-600 hover:bg-amber-700 rounded-md text-sm text-center font-bold me-2 shadow-md shadow-red-900">
                                edit
                            </button>
                        )}
                        {(props.pinAuth)
                            && (props.lastMatch < props.matches.length)
                            && (props.lastMatch + 1 === props.match.number || props.lastMatch === props.match.number)
                            && ((props.nextStage === 1 && (props.matches.length - 2 <= props.match.number)) || ((props.matches.length - 2 > props.match.number) && (props.nextStage !== 1)))
                            && (((props.nextStage !== 0) && (props.match.number === props.matches.length)) || (props.match.number !== props.matches.length && props.matches[props.matches.length - 2].winner === "")) && (
                                <button onClick={() => { setUpdateDisplay(''); }} type="button" className="text-white w-14 h-6 bg-yellow-600 hover:bg-yellow-700 rounded-md text-sm text-center font-bold me-2 shadow-md shadow-red-900">
                                    update
                                </button>
                            )}

                    </div>
                </div>
            </div>

            <UpdateMatch display={updateDisplay} setDisplay={setUpdateDisplay} match={props.match} pin={pin} matches={props.matches} />
            <EditMatch display={editMatchDisplay} setDisplay={setEditMatchDisplay} date={props.match.date} venue={props.match.venue} dateLimit={props.matches[props.matches.length - 4].date} match={props.match} pin={pin} />
        </>
    )
}
