import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Componets/Landing/LandingPage.jsx"

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
