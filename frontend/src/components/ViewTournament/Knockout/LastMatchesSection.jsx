import React, { useState, useContext } from 'react'
import Match from './Match';
import KnockoutContext from '../../context/KnockoutContext';
import ViewContext from '../../context/ViewContext';
import LoadingBar from 'react-top-loading-bar';

export default function ({ matches, lastMatch, pinAuth, nextStage, pin, teams, currentStage, totalTeams }) {

    const { gotoNextStage } = useContext(KnockoutContext);
    const { deActiveNextStage } = useContext(ViewContext);
    const [progress, setProgress] = useState(0);

    const handleEnterFinalClick = async () => {
        setProgress(30);
        await gotoNextStage(pin);
        setProgress(70);
        await deActiveNextStage(pin);
        setProgress(100);
    }

    return (
        <>
            <LoadingBar
                color='#EAB208'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={5}
            />
            <div className="mb-4 text-xl font-bold h-full text-center">Final</div>

            {(pinAuth) 
            && (nextStage === 2) 
            && (matches[matches.length - 2].winner !== "") && (
                <button onClick={handleEnterFinalClick} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Enter Final
                </button>)}
            <div className={`flex bg-white w-full h-full flex-wrap`}>
                <Match key={matches[matches.length - 1].number} match={matches[matches.length - 1]} pinAuth={pinAuth} matches={matches} lastMatch={lastMatch} nextStage={nextStage} teams={teams} currentStage={currentStage} totalTeams={totalTeams}/>
            </div>
        </>
    );
};

