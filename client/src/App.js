import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./Components/pages/Home/Home.jsx";
import LandingPage from "./Components/pages/Landing/LandingPage.jsx";
import './App.css'
import EventDetail from "./Components/Events/EventDetail.jsx"
import EventsPage from "./Components/pages/EventsPage/EventsPage.jsx";
import Home from "./Components/pages/Home/Home.jsx";
import Profile from "./Components/pages/ProfileUser/Profile.jsx";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/events" element={<EventsPage/>}/>
      <Route exact path='/events/:id' element={<EventDetail/>}/>
      <Route exact path='/profile/:email' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App
