import React, { Component } from 'react'

import './styles/square.css'

class Square extends Component {
  render() {
    let clicked = this.props.isSelected === this.props.id ? 'clicked' : null
    let exitPoint = this.props.isExitPoint === this.props.id ? 'exitPoint' : null
    let charAllowed = this.props.charAllowed ? 'path' : 'block'
    let win = clicked === 'clicked' && exitPoint === 'exitPoint' ? 'win' : null

    return (
      <div className={`square ${clicked} ${charAllowed} ${exitPoint} ${win}`} onClick={ this.props.charAllowed ? () => this.props.selectTile(this.props.id) : null }>
        {win === 'win' ? '🏆' : null}
      </div>
    )
  }
}

export default Square
