import GroupStageContext from "./GroupStageContext";
import { useState } from "react";

const host = 'http://localhost:';

const GroupStageUseState = (props) => {

    const updateMatchResult = async (matchNumber, score1, out1, boundries1, score2, out2, boundries2, pin) => {
        try {
            const url = `${host}/schedules/group-stage/updateMatchResult`;

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


    return (
        <GroupStageContext.Provider value={{ updateMatchResult, queueNextStage}}>
            {props.children}
        </GroupStageContext.Provider>
    );
};
export default GroupStageUseState