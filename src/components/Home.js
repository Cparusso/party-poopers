import React, { Component } from 'react'
import Room from './Room.js'
import DirectionCard from './DirectionCard.js'

import './styles/home.css'

class Home extends Component {
  state = {
    playing: false
  }

  togglePlaying = () => {
    console.log('lol');
    this.setState({
      playing: !this.state.playing
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.playing ?
          <div>
            <Room />
            <DirectionCard />
          </div>
        :
          <div className="home-screen-container">
            <h1>Party Poopers</h1>
            <button className="game-button" onClick={ () => this.togglePlaying() } > Start </button>
          </div>
        }
      </div>
    )
  }
}

export default Home
