import React, { useState } from "react"

function GetTemperature() {
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [isFahr, setIsFahr] = useState(true)
  const [tempF, setTempF] = useState()
  const [tempC, setTempC] = useState()
  const [humidity, setHumidity] = useState()
  const [wind, setWind] = useState()
  const [cloudy, setCloudy] = useState()
  const [name, setName] = useState()
  const [iconImg, setIconImg] = useState()

  function getData(event) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()},${state.toLowerCase()},200&appid=da5b56a0cac5a192583758c94049b99e`
    )
      .then(response => {
        if (!response.ok) {
          throw Error(
            alert("This city is not valid. Please enter another city...")
          )
        }
        return response.json()
      })
      .then(data => {
        const tempK = data.main.temp
        const Fahr = (tempK - 273.15) * (9 / 5) + 32
        const Celsius = (Fahr - 32) * (5 / 9)
        setTempF(Math.round(Fahr))
        setTempC(Math.round(Celsius))
        setHumidity(data.main.humidity)
        setWind(data.wind.speed)
        setCloudy(
          data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1)
        )
        setName(data.name)
        setIconImg(data.weather[0].icon)
      })
  }

  function handleCity(event) {
    const { value } = event.target
    setCity(value)
  }

  function handleState(event) {
    const { value } = event.target
    setState(value)
  }

  function tempChange() {
    setIsFahr(prevTemp => !prevTemp)
  }

  const currDate = new Date().getDay()
  const buttonTemp = isFahr ? "Celsius" : "Fahrenheit"
  const Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  const inputStyles = { height: "38px" }

  const viewStyles =
    tempF === undefined ? { display: "none" } : { display: "block" }

  const iconImgStyles =
    iconImg === undefined
      ? null
      : `http://openweathermap.org/img/wn/${iconImg}@2x.png`

  const tempDisp = isFahr ? tempF + " °" : tempC + " °"

  const headerStyles = {
    padding: "10px"
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1 style={headerStyles}>Weather App</h1>
        <input
          style={inputStyles}
          type='text'
          value={city}
          name='city'
          placeholder='City'
          onChange={handleCity}
        />
        <input
          style={inputStyles}
          type='text'
          value={state}
          name='state'
          placeholder='State'
          onChange={handleState}
        />
        <button
          className='btn searchButton'
          style={{ marginBottom: "3px" }}
          onClick={getData}
        >
          Search
        </button>
      </div>

      <div style={viewStyles} className='weatherSection'>
        <div style={{ textAlign: "center" }}>
          <img
            src={iconImgStyles}
            alt='weather icon'
          />
          <span className='display-3'>{tempDisp}</span>
          <p className="lead leadTxt">
            {name}
          </p>
          <p className='m-0 lead descriptiveTxt'>{cloudy}</p>
        </div>
        <div className='pt-4'>
        <p className='m-0 lead descriptiveTxt'>{Days[currDate]}</p>
            <hr/>
          <div className='row'>
            <div className='col'>
              <button
                style={{marginTop: "7px"}}
                type='button'
                className='btn tempButton'
                onClick={tempChange}
              >
                {buttonTemp}
              </button>
            </div>
            <div className='col' style={{ textAlign: "right" }}>
              <ul>
                <li className="lead descriptiveTxt">Humidity: {humidity}%</li>
                <li className="lead descriptiveTxt">Wind: {wind}mph</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetTemperature
