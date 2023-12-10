import KnockoutContext from "./KnockoutContext";
import { useState } from "react";

const host = 'http://localhost:';

const KnockoutUseState = (props) => {

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
        <KnockoutContext.Provider value={{gotoNextStage}}>
            {props.children}
        </KnockoutContext.Provider>
    );
};
export default KnockoutUseState