import React, { useState, useContext } from 'react'
import Match from './Match';
import ViewContext from '../../context/ViewContext';
import LoadingBar from 'react-top-loading-bar';

export default function ({ matches, lastMatch, pinAuth, nextStage, pin }) {

    const semiFinals = matches.slice(-3, -1);
    const { activeNextStage, finalStage } = useContext(ViewContext);
    const [progress, setProgress] = useState(0);

    const handleEnterFinalClick = () => {
        setProgress(30);
        activeNextStage(pin);

        setProgress(70);
        finalStage(pin);

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
            <div className="mb-4 text-xl font-bold h-full text-center">Semi-finals/final</div>

            <div className={`flex bg-white w-full h-full flex-wrap`}>
                {semiFinals.map((match) => (
                    <Match key={match.number} match={match} pinAuth={pinAuth} matches={matches} lastMatch={lastMatch} nextStage={nextStage} />
                ))}
            </div>

            {(pinAuth) && (nextStage === 2) && (matches[matches.length - 2].winner !== "") && (
                <button onClick={handleEnterFinalClick} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Enter Final
                </button>)}
            <div className={`flex bg-white w-full h-full flex-wrap`}>
                <Match key={matches[matches.length - 1].number} match={matches[matches.length - 1]} pinAuth={pinAuth} matches={matches} lastMatch={lastMatch} nextStage={nextStage} />
            </div>
        </>
    );
};

