import './App.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import ScheduleTournament from './components/ScheduleTournament/ScheduleTournament'
import ViewTournament from './components/ViewTournament/ViewTournament'
import RoundRobin from './components/ViewTournament/RoundRobin'

import ScheduleUseState from './components/context/ScheduleUseState'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <ScheduleUseState>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/scheduleTournament" element={<ScheduleTournament />}></Route>
            <Route path="/viewTournament" element={<ViewTournament />}></Route>
            <Route path="/viewFixtures" element={<RoundRobin />}></Route>
          </Routes>


        </ScheduleUseState>
      </BrowserRouter>
    </>
  )
}

export default App
