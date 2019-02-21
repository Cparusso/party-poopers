import React, { Component } from 'react'
import Room from './Room.js'
import DirectionCard from './DirectionCard.js'

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
          <div>
<<<<<<< HEAD
            <Room
              currentAction={ currentAction }
              changeAction={ this.changeAction }
              quit={ this.togglePlaying }
            />
            <DirectionCard
              currentAction={ currentAction }
              changeAction={ this.changeAction }
            />
=======
            <Room currentAction={ currentAction } changeAction={ this.changeAction } />
            <DirectionCard currentAction={ currentAction } changeAction={ this.changeAction } />
>>>>>>> direction-card
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
