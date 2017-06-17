import React, { Component } from 'react'
import logo from './logo.svg'
import backgroundImage from './img/background.jpg'
import './App.css'

console.log(backgroundImage)

class App extends Component {
  render() {
    return (
      <div className="AdventureMachine">
        <img id="background-image" src={backgroundImage} alt="" />
      </div>
    )
  }
}

export default App

        // <div className="App-header">
        //   <img src={logo} className="App-logo" alt="logo" />
        //   <h2>Welcome to React</h2>
        // </div>
        // <p className="App-intro">
        //   To get started, edit <code>src/App.js</code> and save to reload.
        // </p>