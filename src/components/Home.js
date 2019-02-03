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

//Add an actionCompleted boolean
//You should be able to freely select a character
//Once you move them once you should be able to move them again as many times as you would like
//AFTER you move them once the actionCompleted bool should be flipped
//If the bool is true then once you switch characters you get a new action
