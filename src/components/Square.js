import React, { Component } from 'react'
import Character from './Character.js'

import './styles/square.css'

class Square extends Component {
  createChar = (win) => {
    let charNum = this.props.charLocations.indexOf(this.props.id)

    return <Character win={win} charNum={ charNum } />
  }

  render() {
    const { isSelected, id, isExitPoint, charAllowed, charLocations, selectTile } = this.props

    let clicked = isSelected === id ? 'clicked' : null
    let exitPoint = isExitPoint.includes(id) ? 'exitPoint' : null
    let charOnTile = charLocations.includes(id)
    let charIsAllowed = charAllowed ? 'path' : 'block'
    let win = charOnTile && exitPoint === 'exitPoint' ? 'win' : null

    return (
      <div className={`square ${clicked} ${charIsAllowed} ${exitPoint} ${win}`} onClick={ charOnTile ? () => selectTile(id) : null }>
        {charOnTile ? this.createChar(win) : null}
      </div>
    )
  }
}

export default Square

// {charOnTile ? <Character win={win}/> : null}
