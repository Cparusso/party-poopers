import React, { Component } from 'react'
import Room from './Room.js'
import DirectionCard from './DirectionCard.js'
import Timer from './Timer.js'

import './styles/home.css'

class Home extends Component {
  state = {
    playing: false,
    currentAction: 'up',
    win: false,
  }

  togglePlaying = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  toggleWin = (winCheck) => {
    this.setState({
      win: winCheck
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
    const { currentAction, win } = this.state

    return (
      <div>
        {this.state.playing ?
          <div className="game-room-and-controls">
            <Room
              currentAction={ currentAction }
              changeAction={ this.changeAction }
              quit={ this.togglePlaying }
              toggleWin={ this.toggleWin }
              />
            <div id="game-info-section">
              <Timer
                win={win}
              />
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
