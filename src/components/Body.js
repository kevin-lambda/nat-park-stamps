import React, { useState } from "react"
import { StampData } from "./index.js"
import stampLogo from "../assets/stamp3.png"

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

      <article>
        {userState ? (
          <StampData
            userStateSelect={userState}
            additionalCheckBox={additionalCheckBox}
          />
        ) : (
          <>
            <p className="no-data-fetched-yet-p">
              <img src={stampLogo} alt="stamp logo" width="400px" />
            </p>
            <p className="no-data-fetched-yet-p">
              <i>Your park passport stamps are waiting!</i>
            </p>
          </>
        )}
      </article>
    </div>
  )
}

export default Body
