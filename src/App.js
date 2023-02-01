import React from "react"
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/index.js"
import "@picocss/pico"
// ! pico imported here.

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
