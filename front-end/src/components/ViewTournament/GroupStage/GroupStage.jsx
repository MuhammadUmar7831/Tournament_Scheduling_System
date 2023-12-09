import React, { useContext, useEffect, useState } from 'react'
import ScheduleContext from '../../context/ScheduleContext';
import Match from './Match'
import { useNavigate } from 'react-router-dom';
import EnterPin from './EnterPin';
import Alert from '../Alert';
import LoadingBar from 'react-top-loading-bar';
import LastMatchesSection from './LastMatchesSection';
import ViewContext from '../../context/ViewContext';


export default function RoundRobin() {

    const { getDetail, detail, pin } = useContext(ScheduleContext);
    const { activeNextStage, semiFinalStage } = useContext(ViewContext);
    const [pinDisplay, setPinDisplay] = useState('hidden');
    const [pinAuth, setPinAuth] = useState(false);
    const [alertDispaly, setAlertDispaly] = useState('hidden');

    const nevigate = useNavigate();

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // setProgress(50);
        getDetail(pin);
        // setProgress(100);

    }, [pin, detail])

    const handleNextStageClick = async () => {
        setProgress(30);
        await activeNextStage(pin);

        const sortedTeams = detail.teams.sort((a, b) => {
            // First, compare by points
            if (b.points !== a.points) {
                return b.points - a.points;
            }

            // If points are equal, compare by boundaries
            return b.boundries - a.boundries;
        });
        setProgress(50);
        await semiFinalStage(pin, sortedTeams[0].name, sortedTeams[1].name, sortedTeams[2].name, sortedTeams[3].name);
        setProgress(100);
    }

    const isNextStageButtonShow = (match) => {

        let matchNo = 0;

        for (let i = 0; i < detail.currentStage; i++) {
            matchNo += ((detail.teams.length / (i + 1)) / 4) * 6;
        }

        return matchNo === match.number;
    }

    const gotoNextStage = () => {

    }

    return (
        <>
            <LoadingBar
                color='#EAB208'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={5}
            />
            <div className={`flex w-full h-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}>
                <div className='h-full flex items-center justify-center'>
                    <img onClick={() => { nevigate('/viewTournament') }} src="/back.png" className='w-10 h-10 hover:cursor-pointer' alt="" srcSet="" />
                </div>
                <div className="flex items-center justify-between h-full w-2/4 m-auto">
                    <p className="mx-2 self-end text-white text-lg md:text-xl lg:text-xl border-b-4 border-b-white hover:text-amber-400 hover:cursor-pointer hover:border-b-amber-400">Fixtures</p>
                    <p onClick={() => { nevigate('/groupstage/viewStandings') }} className="mx-2 self-end text-white text-lg md:text-xl lg:text-xl border-b-4 border-b-yellow-500 hover:text-amber-400 hover:cursor-pointer hover:border-b-amber-400">Standings</p>
                </div>
            </div>
            <Alert display={alertDispaly} setDisplay={setAlertDispaly} message={"Pin authentication successfull"} />

            <div className="inline-flex rounded-md shadow-sm mx-2 mt-4" role="group">
                <button onClick={() => { setPinDisplay(''); }} disabled={pinAuth} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    Enter Pin
                </button>
                <button disabled={!pinAuth} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-r border-t border-b border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    Edit Schedule
                </button>
            </div>

            {(!detail) && (<div className='w-full text-5xl text-center mt-[10vh]'>
                :( Something went wrong
            </div>
            )}


            <div className={`flex bg-white w-full h-full flex-wrap`}>
                {detail &&
                    detail.matches &&
                    detail.matches.length !== 0 &&
                    detail.matches.slice(0, -1).map((match) => (
                        <React.Fragment key={match.number}>
                            <Match match={match} pinAuth={pinAuth} matches={detail.matches} lastMatch={detail.lastMatch} nextStage={detail.nextStage} teams={detail.teams} currentStage={detail.currentStage} totalTeams={detail.teams.length} />

                            {(isNextStageButtonShow(match)) && (pinAuth) && (detail.nextStage !== 0) &&
                                (
                                    <div className='w-full text-center p-2'>
                                        <button
                                            onClick={gotoNextStage}
                                            type="button"
                                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Enter Next Stage
                                        </button>
                                    </div>
                                )}
                        </React.Fragment>
                    ))}
            </div>


            {(detail) && (detail.matches) && (
                <div className='w-full flex items-center flex-col'>
                    <LastMatchesSection matches={detail.matches} lastMatch={detail.lastMatch} pinAuth={pinAuth} nextStage={detail.nextStage} pin={pin} teams={detail.teams} currentStage={detail.currentStage} totalTeams={detail.teams.length} />
                </div>
            )}


            <EnterPin display={pinDisplay} setDisplay={setPinDisplay} pin={pin} setPinAuth={setPinAuth} setAlertDispaly={setAlertDispaly} />
        </>
    )
}