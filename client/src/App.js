import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./Components/pages/Home/Home.jsx";
import LandingPage from "./Components/pages/Landing/LandingPage.jsx";
import './App.css'
import EventDetail from "./Components/Events/EventDetail.jsx"
import EventsPage from "./Components/pages/EventsPage/EventsPage.jsx";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/events" element={<EventsPage/>}/>
      <Route exact path='/events/:id' element={<EventDetail/>}/>

    </Routes>
    </>
  )
}

export default App
