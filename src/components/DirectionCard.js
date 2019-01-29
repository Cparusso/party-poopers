import React, { Component } from 'react'

import './styles/direction-card.css'

class DirectionCard extends Component {
  render() {
    return (
      <div className="direction-card" >
        <p class="currentDirection" onClick={ () => this.props.changeAction() } >{ this.props.currentAction }</p>
      </div>
    )
  }
}

export default DirectionCard
