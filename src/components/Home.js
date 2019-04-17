import React, { Component } from 'react'
import Room from './Room.js'
import DirectionCard from './DirectionCard.js'
import Timer from './Timer.js'

import './styles/home.css'

class Home extends Component {
  state = {
    playing: false,
    currentAction: 'up',
  }

  togglePlaying = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  changeAction = () => {
    let possibleActions = ['up', 'right', 'down', 'left']
    let currentAction = this.state.currentAction
    let currentActionIndex = possibleActions.indexOf(currentAction)

    possibleActions.splice(currentActionIndex, 1)

    let nextAction = possibleActions[Math.floor(Math.random()*possibleActions.length)]

    this.setState({
      currentAction: nextAction
    })
  }

  render() {
    const { currentAction } = this.state

    return (
      <div className="app">
        {this.state.playing ?
          <div className="game-room-and-controls">
            <Room
              currentAction={ currentAction }
              changeAction={ this.changeAction }
              quit={ this.togglePlaying }
              />
            <div>
              <Timer/>
              <DirectionCard
                currentAction={ currentAction }
                changeAction={ this.changeAction }
              />
            </div>
          </div>
        :
          <div className="home-screen-container">
            <h1>Party Poopers</h1>
            <button
              className="game-button"
              onClick={ () => this.togglePlaying() }
            >
              Start
            </button>
          </div>
        }
      </div>
    )
  }
}

export default Home
