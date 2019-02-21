import React, { Component } from 'react'

import './styles/direction-card.css'

class DirectionCard extends Component {
  componentDidMount = () => {
    this.props.changeAction()
  }
  render() {
    return (
      <div className="direction-card" >
        <p className="currentDirection">{ this.props.currentAction }</p>
      </div>
    )
  }
}

export default DirectionCard

// Option:
// Add the below onclick to the direction card (in the p tag)
// *** onClick={ () => this.props.changeAction() ***
// This addition, in conjunction to a counter, would allow the user to manually skip the currently selected
// action if needed - a sort of handicap for the single player experience
