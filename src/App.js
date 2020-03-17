import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import GetTemperature from "./components/GetTemperature"
import "./App.css"

function App() {
  return (
    <div className='App'>
      <section className='wrapper'>
        <div className='bgImg'>
          <GetTemperature />
        </div>
      </section>
    </div>
  )
}

export default App
