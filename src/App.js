import React, { Component } from 'react'
import Room from './components/Room.js'
import DirectionCard from './components/DirectionCard.js'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Room />
        <DirectionCard />
      </div>
    )
  }
}

export default App
