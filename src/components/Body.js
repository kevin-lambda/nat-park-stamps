import React from "react"
import { StampData } from "./index.js"

function Body() {
  return (
    <div>
      Body
      <select>
        <option value="" disabled selected>
          Select your state
        </option>
        <option value="AL">AL</option>
        <option value="AK">AK</option>
        <option value="AR">AR</option>
      </select>
      <StampData />
    </div>
  )
}

export default Body
