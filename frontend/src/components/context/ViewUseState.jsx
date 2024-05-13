import ViewContext from "./ViewContext";
import { useState } from "react";

const host = 'http://localhost:';

const ViewUseState = (props) => {

    const updateMatchResult = async (matchNumber, score1, out1, boundries1, score2, out2, boundries2, pin) => {
        try {
            const url = `${host}/schedules/post/updateMatchResult`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    matchNumber,
                    score1,
                    score2,
                    out1,
                    out2,
                    boundries1,
                    boundries2,
                    pin,
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
            return "error";
        }
    };

    const editMatchDate = async (matchNumber, pin, date) => {
        try {
            const url = `${host}/schedules/post/updateMatchDate`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    matchNumber,
                    pin,
                    date
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
            return "error";
        }
    };

    const queueNextStage = async (pin) => {
        try {
            const url = `${host}/schedules/post/queueNextStage`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    pin
                }),
            });

            if (!response.ok) {
                throw "Something went wrong"
            }
            else {
                const json = await response.json();
                return json;
            }

        } catch (error) {
            console.log("error occured");
            return "error";
        }
    };

    const activeNextStage = async (pin) => {
        try {
            const url = `${host}/schedules/post/activeNextStage`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    pin
                }),
            });

            if (!response.ok) {
                throw "Something went wrong"
            }
            else {
                const json = await response.json();
                return json;
            }

        } catch (error) {
            console.log("error occured");
            return "error";
        }
    };

    const deActiveNextStage = async (pin) => {
        try {
            const url = `${host}/schedules/post/deActiveNextStage`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    pin
                }),
            });

            if (!response.ok) {
                throw "Something went wrong"
            }
            else {
                const json = await response.json();
                return json;
            }

        } catch (error) {
            console.log("error occured");
            return "error";
        }
    };

    const editMatchVenue = async (matchNumber, pin, venue) => {
        try {
            const url = `${host}/schedules/post/updateMatchVenue`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    matchNumber,
                    pin,
                    venue
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
            return "error";
        }
    };
    
    
    const editMatchTime = async (matchNumber, pin, time) => {
        try {
            const url = `${host}/schedules/post/updateMatchTime`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    matchNumber,
                    pin,
                    time
                }),
            });

            if (!response.ok) {
                // Check if the response status is not in the range 200-299
                throw "Something went wrong"
            }
            else {
                const json = await response.json();
                return json;
            }

        } catch (error) {
            console.log("error occured");
            return "error";
        }
    };


    const semiFinalStage = async (pin, team1, team2, team3, team4) => {
        try {
            const url = `${host}/schedules/round-robin/SemiFinalsStage`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    pin,
                    team1,
                    team2,
                    team3,
                    team4
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
            return "error";
        }
    };

    const finalStage = async (pin) => {
        try {
            const url = `${host}/schedules/round-robin/FinalsStage`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    pin
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
            return "error";
        }
    };

    return (
        <ViewContext.Provider value={{ updateMatchResult, editMatchDate, editMatchVenue, editMatchTime, queueNextStage, activeNextStage, deActiveNextStage, semiFinalStage, finalStage }}>
            {props.children}
        </ViewContext.Provider>
    );
};
export default ViewUseState