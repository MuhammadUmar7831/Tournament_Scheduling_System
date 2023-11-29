import React, {useEffect} from 'react'

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

    return (
        <>
            <div className='w-11/12 lg:w-5/12 bg-yellow-100 h-48 mx-auto rounded-md border border-gray-200 m-5'>
                <div className='flex  justify-between w-full h-1/4 rounded-t-md p-2'>
                    <span className='text-gray-600'>Match#{props.match.number}</span>
                    <span className='text-gray-600'>{formatDate(props.match.date)}</span>
                </div>

                <div className='w-11/12 h-2/4 m-auto px-6'>
                    <div className='flex justify-between my-2'>
                        <span className='text-gray-700'>{props.match.team1}</span>
                        <span className='text-gray-700'>{props.match.score1}/{props.match.out1} ({props.match.boundries1})</span>
                    </div>
                    <div className='flex justify-between my-2'>
                        <span className='text-gray-700'>{props.match.team2}</span>
                        <span className='text-gray-700'>{props.match.score2}/{props.match.out2} ({props.match.boundries2})</span>
                    </div>
                    <div className='my-2 m-auto text-center'>
                        <span className='text-gray-400'>{props.match.winner ? `${props.match.winner} won` : null}</span>
                    </div>
                </div>

                <div className='flex  justify-between w-full h-1/4 p-2'>
                    <span className='text-gray-400'>{props.match.venue}</span>
                    <div>
                        <button type="button" className="text-white w-10 h-5 bg-amber-600 hover:bg-amber-700 rounded-md text-sm text-center me-2 ">edit</button>
                        <button type="button" className="text-white w-14 h-5 bg-yellow-600 hover:bg-yellow-700 rounded-md text-sm text-center me-2 ">update</button>
                    </div>
                </div>
            </div>
        </>
    )
}
