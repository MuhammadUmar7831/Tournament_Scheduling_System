import React, { useState, useContext } from 'react';
import ScheduleContext from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

import SomethingWentWrong from '../SomethingWentWrong';


export default function ST_page3(props) {

    const [progress, setProgress] = useState(0);

    const schedule = useContext(ScheduleContext);
    const { setMatchFormat, matchFormat } = useContext(ScheduleContext);
    const { noteams } = schedule;
    const { addSchedule } = schedule;
    const { somethingWrong } = schedule;

    const [alert, setAlert] = useState('hidden');
    const [areYouSure, setAreYourSure] = useState('hidden');


    const [finalMessage, setFinalMessage] = useState('hidden');

    const navigate = useNavigate();

    const { teamNames, setTeamNames } = useContext(ScheduleContext);

    const handleInputChange = (index, value) => {
        // Create a copy of the teamNames array
        const newTeamNames = [...teamNames];
        // Update the value at the specified index
        newTeamNames[index] = value;
        if (value == "") {
            newTeamNames.splice(index, 1);
        }

        // Set the updated teamNames array in the context
        setTeamNames(newTeamNames);
    };

    const divs = Array.from({ length: noteams }).map((_, index) => (
        <div key={index} className="relative my-2">
            <input
                type="text"
                id={`floating_filled_${index}`}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={teamNames[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <label
                htmlFor={`floating_filled_${index}`}
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
                Team#{index + 1}
            </label>
        </div>
    ));

    const autofillClick = () => {
        for (let index = 0; index < noteams; index++) {
            const reqDiv = document.getElementById(`floating_filled_${index}`);
            if (reqDiv.value.trim() === '') {
                reqDiv.value = `Team#${index + 1}`;
                teamNames[index] = `Team#${index + 1}`;
            }
        }
    }

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setMatchFormat(value);
    };

    const finalizeClick = () => {
        if (noteams != teamNames.length) {
            setAlert('flex');
        }
        else {
            setAreYourSure('flex');
            document.body.classList.add('overflow-hidden');
        }
    }

    const iamsureClick = async () => {
        document.body.classList.add('overflow-hidden');
        setProgress(progress + 30);
        const response = await addSchedule();

        setProgress(progress + 70)
        setAreYourSure('hidden');

        if (response !== "error") {
            setFinalMessage('flex');
            const pinI1 = document.getElementById('pin_i_1');
            const pinI2 = document.getElementById('pin_i_2');
            const pinI3 = document.getElementById('pin_i_3');
            const pinI4 = document.getElementById('pin_i_4');

            pinI1.value = response[0];
            pinI2.value = response[1];
            pinI3.value = response[2];
            pinI4.value = response[3];

            console.log(response[0]);
        }
        setProgress(progress + 100);
    }

    return (
        <>
            <LoadingBar
                color='#EAB208'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={5}
            />

            {/*input fields empty alert */}
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

                <div className='flex justify-between my-2'>
                    <button onClick={props.prevPage} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Previous</button>
                    <button onClick={finalizeClick} type="submit" className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">Finalize</button>
                </div>


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
                            <input onChange={handleRadioChange} disabled={noteams % 2 === 1} id="horizontal-list-radio-group" type="radio" value="Group Stage" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-group" className={`w-full py-3 ml-2 text-sm font-medium text-gray-${noteams % 2 == 1 ? '400' : '900'} dark:text-gray-300`}>Group Stage</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input onChange={handleRadioChange} disabled={noteams % 2 === 1} id="horizontal-list-radio-knock" type="radio" value="Knock out" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-knock" className={`w-full py-3 ml-2 text-sm font-medium text-gray-${noteams % 2 == 1 ? '400' : '900'} dark:text-gray-300`}>Knock out</label>
                        </div>
                    </li>
                </ul>

                <div id='venue' className="block my-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className='flex justify-between'>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Team Names
                        </h5>
                        <button onClick={autofillClick} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Autofill</button>
                    </div>
                    {divs}
                </div>


                {/* are you sure modal */}
                <div id="modal" className={`${areYouSure} z-10 w-full h-full absolute top-0 left-0 bg-opacity-30 bg-gray-500`}>
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8 w-2/4 m-auto mt-24">
                        <button onClick={() => { setAreYourSure('hidden'); document.body.classList.remove('overflow-hidden'); }} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to finalize the schedule?</h3>
                            <button onClick={iamsureClick} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                Yes, I'm sure
                            </button>
                            <button onClick={() => { setAreYourSure('hidden'); document.body.classList.remove('overflow-hidden'); }} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                        </div>
                    </div>
                </div>

                <SomethingWentWrong />
                {/* final message */}
                <div id="modal" className={`${finalMessage} z-10 w-[100vw] h-[100vh] absolute top-0 left-0 bg-opacity-30 bg-gray-500`}>
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8 w-2/4 m-auto mt-24">
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="playpenSans mb-5 text-2xl font-normal text-orange-500 dark:text-orange-400">Your Tournament has been scheduled</h3>
                            <div className="flex space-x-3" data-hs-pin-input>
                                <div className='m-auto'>
                                    <input type="text" id='pin_i_1' className="w-[38px] h-[38px] m-2 text-center bg-gray-300 border-transparent rounded-md text-sm" placeholder="⚬" disabled data-hs-pin-input-item />
                                    <input type="text" id='pin_i_2' className="w-[38px] h-[38px] m-2 text-center bg-gray-300 border-transparent rounded-md text-sm" placeholder="⚬" disabled data-hs-pin-input-item />
                                    <input type="text" id='pin_i_3' className="w-[38px] h-[38px] m-2 text-center bg-gray-300 border-transparent rounded-md text-sm" placeholder="⚬" disabled data-hs-pin-input-item />
                                    <input type="text" id='pin_i_4' className="w-[38px] h-[38px] m-2 text-center bg-gray-300 border-transparent rounded-md text-sm" placeholder="⚬" disabled data-hs-pin-input-item />
                                </div>
                            </div>
                            <p className="playpenSans mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">you can see it in View Tournaments section</p>
                            <button onClick={() => { document.body.classList.remove('overflow-hidden');navigate('/viewTournament')}} data-modal-hide="popup-modal" type="button" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}