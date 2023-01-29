import React, { useState, useEffect } from "react"
import axios from "axios"

function StampData() {
  let preDefinedObj = {
    id: "",
    parkCode: "",
    label: "",
    fullName: "",
    url: "",
    type: "",
  }

  const [stampData, setStampData] = useState(null)
  const [userState, setUserState] = useState("FL")
  const [topResults, setTopResults] = useState([preDefinedObj])
  const [possibleResults, setPossibleResults] = useState([preDefinedObj])
  const [showPossibleResults, setShowPossibleResults] = useState(true)

  /** NPS API params
   * parkCode  = string, 4 char   // search by park code
   * stateCode = string, 2 char   // search by state
   * q = string                   // search by q(uery)
   * limit = int, default 50      // how many results to return
   * start = int, default 0       // at what result to start, and returns limit amount
   */
  const API_NPS_BASE_URL = "https://developer.nps.gov/api/v1/"
  let api_nps_category = `passportstamplocations?`
  let api_nps_park_code = ``
  let api_nps_state_code = `${userState}`
  let api_nps_q = ``
  let api_nps_limit = 100
  let api_nps_start = 0
  const API_NPS_KEY = process.env.REACT_APP_API_KEY_NAT_PARK
  let API_NPS_URL = `${API_NPS_BASE_URL}${api_nps_category}stateCode=${api_nps_state_code}&limit=${api_nps_limit}&start=${api_nps_start}&api_key=${API_NPS_KEY}`

  const parseStampData = (rawStampData) => {
    let oneStateArr = []
    let unMultiStateArr = []
    let sortedMultiStateArr = []

    let formattedOneState = []
    let formattedMultiState = []
    let formMultiParkIndex = []

    console.log("raw data: ", rawStampData)

    const locationListArray = rawStampData.data.data
    console.log(locationListArray)

    for (const elem of locationListArray) {
      if (elem.parks[0].states === `${userState}`) {
        oneStateArr.push(elem)
      } else {
        unMultiStateArr.push(elem)
      }
    }

    for (const elem of unMultiStateArr) {
      if (elem.type === "places") {
        sortedMultiStateArr.push(elem)
      } else if (elem.type === "visitorcenters") {
        sortedMultiStateArr.unshift(elem)
      } else {
        sortedMultiStateArr.push(elem)
      }
    }

    for (const e of oneStateArr) {
      const tempObj = {
        id: e.id,
        parkCode: e.parks[0].parkCode,
        label: e.label,
        fullName: e.parks[0].fullName,
        url: e.parks[0].url,
        type: e.type,
      }
      formattedOneState.push(tempObj)
    }

    for (let j = 0; j < sortedMultiStateArr.length; j++) {
      const e = sortedMultiStateArr[j]

      for (let i = 0; i < e.parks.length; i++) {
        const parkElem = e.parks[i].states
        if (parkElem.includes(userState)) {
          formMultiParkIndex.push(i)
          break
        }
      }

      const tempObj = {
        id: e.id,
        parkCode: e.parks[formMultiParkIndex[j]].parkCode,
        label: e.label,
        fullName: e.parks[formMultiParkIndex[j]].fullName,
        url: e.parks[formMultiParkIndex[j]].url,
        type: e.type,
      }
      formattedMultiState.push(tempObj)
    }

    setTopResults(formattedOneState)
    setPossibleResults(formattedMultiState)
  }

  const getData = async () => {
    try {
      console.log("=============in get data")
      const fetchedData = await axios.get(`${API_NPS_URL}`)
      parseStampData(fetchedData)
    } catch (error) {
      console.log("error in axios get nps: ", error)
    }
  }

  useEffect(() => {
    console.log("==============in use effect")
    getData()
  }, [])

  console.log("top: ", topResults)
  console.log("possible: ", possibleResults)

  return (
    <div>
      StampData
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Stamp Location</th>
            <th scope="col">National Park Site</th>
          </tr>
        </thead>
        <tbody>
          {topResults.map((e, index, arr) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{e.label}</td>
              <td>
                <a href={e.url}> {e.fullName}</a>
              </td>
            </tr>
          ))}
          {showPossibleResults ? (
            <tr>
              <td>SPACING</td>
            </tr>
          ) : null}
          {showPossibleResults
            ? possibleResults.map((e, index, arr) => (
                <tr>
                  <th scope="row">{topResults.length + index + 1}</th>
                  <td>{e.label}</td>
                  <td>
                    <a href={e.url}> {e.fullName}</a>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}

export default StampData
