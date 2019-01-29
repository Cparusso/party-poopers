import React, { Component } from 'react'
import Room from './Room.js'
import DirectionCard from './DirectionCard.js'

import './styles/home.css'

class Home extends Component {
  state = {
    playing: false,
    currentAction: '↑',
  }

  togglePlaying = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  changeAction = () => {
    let possibleActions = ['↑', '→', '↓', '←']
    let currentAction = this.state.currentAction
    let nextAction = possibleActions[Math.floor(Math.random()*possibleActions.length)]
    console.log('Current (before):', currentAction)
    console.log('Next:', nextAction)
    console.log('Match:', nextAction === currentAction)

    if (nextAction === currentAction) {
      this.changeAction()
    } else {
      this.setState({
        currentAction: nextAction
      }, () => (console.log('Current (after):', this.state.currentAction)))
    }
  }

  render() {
    const { currentAction } = this.state

    return (
      <div className="app">
        {this.state.playing ?
          <div>
            <Room />
            <DirectionCard currentAction={ currentAction } changeAction={ this.changeAction } />
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
