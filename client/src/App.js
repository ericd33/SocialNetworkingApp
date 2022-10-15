import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./Components/pages/Home/Home.jsx";
import LandingPage from "./Components/pages/Landing/LandingPage.jsx";
import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
    </>
  )
}

export default App
