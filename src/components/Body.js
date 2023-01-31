/** TO DO list
 *
 * Make header. logo, hero?
 * Make footer.
 * credits
 * about
 * built by
 *
 * extra1
 * how to manually override pico css
 * divide controls from results somehow. color h1? cardify?
 *
 *
 * extra2
 * eval map integration, check if nps api has location data for park or stamp
 *
 *
 *
 */

import React, { useState } from "react"
import { StampData } from "./index.js"

function Body() {
  const [userState, setUserState] = useState("")
  const [additionalCheckBox, setAdditionalCheckBox] = useState(false)

  const listOfStates = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ]

  function handleChange(event) {
    setUserState(event.target.value)
  }

  const handleCheckboxChange = () => {
    setAdditionalCheckBox(!additionalCheckBox)
  }

  return (
    <div>
      <select onChange={handleChange}>
        <option value="" defaultValue={""}>
          Select your state
        </option>
        <>
          {listOfStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </>
      </select>
      <fieldset>
        <label>
          <input
            type="checkbox"
            id="additional"
            name="additional"
            checked={additionalCheckBox}
            onChange={handleCheckboxChange}
          />
          Show additional locations (*stamps will be locations in parks that
          include, but may not be in the selected state)
        </label>
      </fieldset>

      {userState ? (
        <StampData
          userStateSelect={userState}
          additionalCheckBox={additionalCheckBox}
        />
      ) : null}
    </div>
  )
}

export default Body
