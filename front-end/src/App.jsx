import './App.css'

import Home from './components/Home'
import ScheduleTournament from './components/ScheduleTournament/ScheduleTournament'
import ViewTournament from './components/ViewTournament/ViewTournament'
import RoundRobin from './components/ViewTournament/RoundRobin/RoundRobin'
import Standing from './components/ViewTournament/RoundRobin/Standing'

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
              <Route path="/viewFixtures" element={<RoundRobin />}></Route>
              <Route path="/viewStandings" element={<Standing />}></Route>
            </Routes>

          </ViewUseState>
        </ScheduleUseState>

      </BrowserRouter>
    </>
  )
}

export default App
