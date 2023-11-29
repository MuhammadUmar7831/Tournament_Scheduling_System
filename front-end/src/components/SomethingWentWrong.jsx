import React, { useContext } from 'react'
import ScheduleContext from './context/ScheduleContext';

export default function () {
    const { somethingWrong, setSomethingWrong } = useContext(ScheduleContext);

    const handleClick = () => {
        setSomethingWrong('hidden');
        document.body.classList.remove('overflow-hidden');
    }
    return (
        <>
            <div id="modal" className={`${somethingWrong} z- w-[100vw] h-[100vh] absolute top-0 left-0 bg-opacity-30 bg-gray-500`}>
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8 w-2/4 m-auto mt-24">
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Something went wrong try again later</h3>
                        <button onClick={handleClick} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">OK</button>
                    </div>
                </div>
            </div>
        </>
    )
}
