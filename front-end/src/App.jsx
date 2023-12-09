import './App.css'

import Home from './components/Home'
import ScheduleTournament from './components/ScheduleTournament/ScheduleTournament'
import ViewTournament from './components/ViewTournament/ViewTournament'

import RoundRobin from './components/ViewTournament/RoundRobin/RoundRobin'
import RRStanding from './components/ViewTournament/RoundRobin/RRStanding'

import GroupStage from './components/ViewTournament/GroupStage/GroupStage'
import GSStanding from './components/ViewTournament/GroupStage/GSStanding'

import ScheduleUseState from './components/context/ScheduleUseState'
import ViewUseState from './components/context/ViewUseState'
import GroupStageUseState from './components/context/GroupStageUseState'

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>

        <ScheduleUseState>
          <ViewUseState>
            <GroupStageUseState>

              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/scheduleTournament" element={<ScheduleTournament />}></Route>
                <Route path="/viewTournament" element={<ViewTournament />}></Route>

                <Route path="/roundrobin/viewFixtures" element={<RoundRobin />}></Route>
                <Route path="/roundrobin/viewStandings" element={<RRStanding />}></Route>

                <Route path="/groupstage/viewFixtures" element={<GroupStage />}></Route>
                <Route path="/groupstage/viewStandings" element={<GSStanding />}></Route>

              </Routes>

            </GroupStageUseState>
          </ViewUseState>
        </ScheduleUseState>

      </BrowserRouter>
    </>
  )
}

export default App
