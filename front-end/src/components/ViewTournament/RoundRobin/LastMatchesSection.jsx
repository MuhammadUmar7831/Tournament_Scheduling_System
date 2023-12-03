import React from 'react'
import Match from './Match';

export default function ({ matches, lastMatch, pinAuth, nextStage }) {

    const lastThreeMatches = matches.slice(-3);

    return (
        <>
            <div className="mb-4 text-xl font-bold h-full text-center">Qualifiers</div>
            <div className={`flex bg-white w-full h-full flex-wrap`}>
                {lastThreeMatches.map((match) => (
                    <Match key={match.number} match={match} pinAuth={pinAuth} matches={matches} lastMatch={lastMatch} nextStage={nextStage}/>
                ))}
            </div>
        </>
    );
};

