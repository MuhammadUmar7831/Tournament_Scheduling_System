import ScheduleContext from "./ScheduleContext";
import { useState } from "react";


const host = 'http://localhost:';

const ScheduleUseState = (props) => {

    const [somethingWrong, setSomethingWrong] = useState('hidden');

    const getSchedules = async () => {
        const url = `${host}/schedules/get/getSchedules`;
        // const response = await 
        const response = await fetch(url, {
            method: "GET"
        });

        const json = await response.json();
        setSchedules(json);
    }

    const getDetail = async (pin) => {
        const url = `${host}/schedules/get/getDetail?pin=${pin}`;

        // const response = await 
        const response = await fetch(url, {
            method: "GET",
        });

        const json = await response.json();
        setDetail(json);
    }

    const addSchedule = async () => {
        try {
            const url = `${host}/schedules/post/addSchedule`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    name: tournamentName,
                    sport: selectedSport,
                    teamNumber: teamNames.length,
                    startDate: dates.startDate,
                    endDate: dates.endDate,
                    venues: venues,
                    teams: teamNames,
                    format: matchFormat,
                }),
            });

            if (!response.ok) {
                // Check if the response status is not in the range 200-299
                // throw new Error(`HTTP error! Status: ${response.status}`);
                throw "Something went wrong"
            }
            else {
                const json = await response.json();
                return json;
            }

        } catch (error) {
            console.log("error occured");
            setSomethingWrong('flex');
            return "error";
        }
    };

    const [schedules, setSchedules] = useState([]);
    const [detail, setDetail] = useState(null);
    const [pin, setPin] = useState('')

    const [tournamentName, setTournamentName] = useState('');
    const [selectedSport, setSelectedSport] = useState('Cricket');
    const [matchFormat, setMatchFormat] = useState('Round Robin')
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date()
    })

    const [noteams, setNoTeams] = useState(0);
    const [venues, setVenues] = useState([]);
    const [teamNames, setTeamNames] = useState([]);


    const addNewVenue = (item) => {
        setVenues([...venues, item]);
    }
    const removeVenue = (itemToRemove) => {
        setVenues((prevVenues) => {
            const filteredVenues = prevVenues.filter((item) => item !== itemToRemove);
            return filteredVenues;
        });
    };
    return (
        <ScheduleContext.Provider value={{ setTournamentName, setSelectedSport, noteams, setNoTeams, dates, setDates, venues, addNewVenue, removeVenue, teamNames, setTeamNames, setMatchFormat, matchFormat, getSchedules, schedules, addSchedule, somethingWrong, setSomethingWrong, getDetail, detail, pin, setPin }}>
            {props.children}
        </ScheduleContext.Provider>
    );
};
export default ScheduleUseState