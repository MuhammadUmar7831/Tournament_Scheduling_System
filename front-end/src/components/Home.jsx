import React from 'react'
import Navbar from './Navbar'

export default function Home() {
    return (
        <>
          <Navbar />

            <div className='flex'>
                <div className='w-3/5 mt-6'>
                    <h1 className='text-center text-7xl text-orange-500 dancing'>Wellcome to <span className='urdu text-5xl'>کھیل</span> !</h1>
                    <p className='p-9 text-lg text-emerald-900 playpenSans'><span className='urdu'>کھیل</span> is a <b>Tournament Scheduling System</b> that will generate a schedule for your sports tournaments. You only need to provide some basic information, and  <span className='urdu'>کھیل</span> will get your tournament up and running. With our user-friendly interface and customizable options, managing your sports events has become easier.</p>

                    <h1 className='text-5xl text-sky-600 dancing p-7'>How to use?</h1>
                    <p className='playpenSans px-7 pb-5'>
                        1. Click on Schedule Tournament section<br/>
                        2. Select your desired sports categorized in indoor and outdoor games<br/>
                        3. Provide<br/>
                        <span className='text-sm'>
                        &emsp;• Tournament name <br/>
                        &emsp;• Number of teams <br/>
                        &emsp;• Team names <br/>
                        &emsp;• Desired format <br/>
                        &emsp;• Venues & time <br/>
                        &emsp;• Matches per day <br/>
                        </span>
                        4. Click on Schedule and remember the provided pin to edit in future<br/>
                        5. To view the tournament click on View Tournaments<br/><br/>
                        <b><i>Note:</i></b> you can also download the fixtures as png<br/>
                    </p>

                </div>
                <div className='w-2/5'>
                    <img src="../../public/sports.png" alt="" className='' id='sport'/>
                </div>
            </div>
        </>
    )
}
