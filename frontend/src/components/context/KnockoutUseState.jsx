import KnockoutContext from "./KnockoutContext";
import { useState } from "react";

const host = 'http://localhost:';

const KnockoutUseState = (props) => {

    const updateMatchResult = async (matchNumber, score1, out1, boundries1, score2, out2, boundries2, pin) => {
        try {
            const url = `${host}/schedules/knock-out/updateMatchResult`;

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

    const gotoNextStage = async (tournamentPin) => {
        try {
            const url = `${host}/schedules/knock-out/gotoNextStage`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
                body: JSON.stringify({
                    tournamentPin
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

    return (
        <KnockoutContext.Provider value={{ gotoNextStage, updateMatchResult }}>
            {props.children}
        </KnockoutContext.Provider>
    );
};
export default KnockoutUseState