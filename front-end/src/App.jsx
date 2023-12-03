import './App.css'

import Home from './components/Home'
import ScheduleTournament from './components/ScheduleTournament/ScheduleTournament'
import ViewTournament from './components/ViewTournament/ViewTournament'
import RoundRobin from './components/ViewTournament/RoundRobin/RoundRobin'
import RRStanding from './components/ViewTournament/RoundRobin/RRStanding'

import ScheduleUseState from './components/context/ScheduleUseState'
import ViewUseState from './components/context/ViewUseState'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>

        <ScheduleUseState>
          <ViewUseState>

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/scheduleTournament" element={<ScheduleTournament />}></Route>
              <Route path="/viewTournament" element={<ViewTournament />}></Route>

              <Route path="/roundrobin/viewFixtures" element={<RoundRobin />}></Route>
              <Route path="/roundrobin/viewStandings" element={<RRStanding />}></Route>

            </Routes>

          </ViewUseState>
        </ScheduleUseState>

      </BrowserRouter>
    </>
  )
}

export default App
