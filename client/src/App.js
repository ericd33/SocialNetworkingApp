import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./Components/pages/Home/Home.jsx";
import LandingPage from "./Components/pages/Landing/LandingPage.jsx";
import './App.css'
import EventList from "./Components/Events/EventList.jsx";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/event" element={<EventList/>}/>
    </Routes>
    </>
  )
}

export default App
