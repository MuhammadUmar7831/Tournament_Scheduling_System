import React, { useContext, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import ViewContext from "../../context/ViewContext";
import KnockoutContext from "../../context/KnockoutContext";
import ScheduleContext from "../../context/ScheduleContext";

export default function (props) {
  const { queueNextStage } = useContext(ViewContext);
  const { updateMatchResult } = useContext(KnockoutContext);
  const { selectedSport } = useContext(ScheduleContext);
  const [progress, setProgress] = useState(0);

  const stageLastMatch = () => {
    let stageLastMatch = 0;
    for (let i = 1; i <= props.currentStage; i++) {
      stageLastMatch += props.totalTeams / Math.pow(2, i);
    }

    return stageLastMatch;
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setProgress(10);

    const formData = new FormData(e.target);
    setProgress(20);

    if (
      props.match.number === stageLastMatch() &&
      props.match.number !== props.matches.length
    ) {
      await queueNextStage(props.pin);
    }

    const score1 = formData.get("score1");
    let out1;
    let boundries1 = formData.get("boundries1");
    const score2 = formData.get("score2");
    let out2;
    let boundries2;
    setProgress(30);

    out1 = formData.get("out1");
    out2 = formData.get("out2");
    boundries1 = formData.get("boundries1");
    boundries2 = formData.get("boundries2");

    await updateMatchResult(
      props.match.number,
      score1,
      out1,
      boundries1,
      score2,
      out2,
      boundries2,
      props.pin
    );
    setProgress(100);
    props.setDisplay("hidden");
  };

  return (
    <>
      <LoadingBar
        color="#EAB208"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={5}
      />

      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${props.display} bg-slate-400 bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full`}
      >
        <div className="relative m-auto mt-[10vh] p-4 w-2/3 max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Match Result
              </h3>
              <button
                onClick={() => {
                  props.setDisplay("hidden");
                }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={handleUpdateSubmit}>
              <div
                className={`grid gap-4 mb-4 grid-cols-3`}
              >
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="score1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {props.match.team1} Score
                  </label>
                  <input
                    type="number"
                    name="score1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="score of team 1"
                    required=""
                    min={0}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="out1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {props.match.team1} Out
                  </label>
                  <input
                    type="number"
                    name="out1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="out of team 1"
                    required=""
                    min={0}
                    max={10}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="boundries1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {props.match.team1} Boundries
                  </label>
                  <input
                    type="number"
                    name="boundries1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="boundries of team 1"
                    required=""
                    min={0}
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="score2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {props.match.team2} Score
                  </label>
                  <input
                    type="number"
                    name="score2"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="score of team 2"
                    required=""
                    min={0}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="out2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {props.match.team2} Out
                  </label>
                  <input
                    type="number"
                    name="out2"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="out of team 2"
                    required=""
                    min={0}
                    max={10}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="boundries2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {props.match.team2} Boundries
                  </label>
                  <input
                    type="number"
                    name="boundries2"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="boundries of team 2"
                    required=""
                    min={0}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
