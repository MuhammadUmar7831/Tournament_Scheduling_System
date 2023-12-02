import React, { useState } from 'react'
import ST_page1 from './ST_page1'
import ST_page2 from './ST_page2'
import ST_page3 from './ST_page3'
import Navbar from '../Navbar'

export default function ScheduleTournament() {
    const [currPage, setCurrPage] = useState(1);

    const prevPage = (e) => {
        if (e) e.preventDefault();
        setCurrPage(currPage - 1);
    }

    const nextPage = (e) => {
        if (e) e.preventDefault();
        setCurrPage(currPage + 1);
    }

    return (
        <>
            <Navbar />

            <div style={{ display: currPage === 1 ? 'block' : 'none' }}>
                <ST_page1 nextPage={nextPage} />
            </div>
            <div style={{ display: currPage === 2 ? 'block' : 'none' }}>
                <ST_page2 prevPage={prevPage} nextPage={nextPage} />
            </div>
            <div style={{ display: currPage === 3 ? 'block' : 'none' }}>
                <ST_page3 prevPage={prevPage} nextPage={nextPage} />
            </div>
        </>
    )
}
