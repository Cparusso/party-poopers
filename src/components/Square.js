import React, { Component } from 'react'
import Character from './Character.js'

import './styles/square.css'

class Square extends Component {
  render() {
    const { isSelected, id, isExitPoint, charAllowed, charLocations, selectTile } = this.props

    let clicked = isSelected === id ? 'clicked' : null
    let exitPoint = isExitPoint.includes(id) ? 'exitPoint' : null
    let charOnTile = charLocations.includes(id)
    let charIsAllowed = charAllowed ? 'path' : 'block'
    let win = clicked === 'clicked' && exitPoint === 'exitPoint' ? 'win' : null

    return (
      <div className={`square ${clicked} ${charIsAllowed} ${exitPoint} ${win}`} onClick={ charAllowed ? () => selectTile(id) : null }>
        {charOnTile ? <Character win={win}/> : null}
      </div>
    )
  }
}

export default Square
