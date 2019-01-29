import React, { Component } from 'react'
import Room from './Room.js'
import DirectionCard from './DirectionCard.js'

class Home extends Component {
  state = {

  }

  render() {
    return (
      <div className="app">
        
        <Room />
        <DirectionCard />
      </div>
    )
  }
}

export default Home
