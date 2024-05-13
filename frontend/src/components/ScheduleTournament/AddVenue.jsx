import React, { useState, useContext } from 'react'
import ScheduleContext from '../context/ScheduleContext'

export default function AddVenue() {

    const schedule = useContext(ScheduleContext);
    const {addNewVenue, removeVenue} = schedule;

    const [venue, setVenue] = useState('');
    const [venueCount, setVenueCount] = useState(0);
    ;
    const show = () => {
        const modal = document.getElementById("modal");
        modal.style.display = "block";
    }

    const hide = () => {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
    }


    const addVenue = (e) => {
        setVenueCount(venueCount + 1);
        hide();
        e.preventDefault();
        const venueContainer = document.getElementById("venue"); // Get the target container
        const newSpan = mySpan(); // Call mySpan to get the span element
        venueContainer.append(newSpan); // Append the span element to the container

        setVenue('');
        document.getElementById("text").value = '';
        addNewVenue(venue);
    }

    const mySpan = () => {
        const spanContainer = document.createElement('span'); // Create a temporary container
        spanContainer.className = `inline-flex items-center px-2 py-1 mr-2 mb-2 text-sm font-medium text-white bg-amber-500 rounded dark:bg-gray-700 dark:text-gray-300`;
        spanContainer.id = "venue" + venueCount;
        spanContainer.innerHTML = `
        ${venue}
        <button id="venue${venueCount}btn" type="button" class="inline-flex items-center p-1 ml-2 text-sm text-red-900 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover-text-gray-300" data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
    `;

        const button = spanContainer.querySelector('button');

        // Add a click event listener to the button
        button.addEventListener('click', function () {

            const parentContainer = document.getElementById('venue');
            const elementToRemove = document.getElementById(spanContainer.id);

            if (elementToRemove) {
                parentContainer.removeChild(elementToRemove);
                removeVenue(elementToRemove.textContent.trim());
            }

        });
        return spanContainer; // Return the first child, which is the span element

    }
    return (
        <>
            <div id='venue' className="block my-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className='flex justify-between'>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Enter Venues
                    </h5>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-rose-600 hover:cursor-pointer hover:text-orange-500" onClick={show}>
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>


            <div id="modal" className='hidden w-[100vw] h-[100vh] fixed top-0 left-0 bg-opacity-30 bg-gray-500'>
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8 w-2/3 m-auto mt-24">
                    <form onSubmit={addVenue}>
                        <div className="mb-6">
                            <div className='flex justify-between'>
                                <h1 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Venue Name</h1>

                                <button onClick={hide} type="button" className="inline-flex items-center p-2 mb-4 text-red-900 bg-transparent rounded-md hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover-text-gray-300" data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
                            </div>
                            <input type="text" id="text" value={venue} onChange={(e) => setVenue(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aleem Dar Academy" required />
                        </div>
                        <div className='flex justify-end'>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">OK</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
