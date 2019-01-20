import React, { Component } from 'react'

import './styles/character.css'

class Character extends Component {
  charCreator = (charNum) => {
    let name
    switch (charNum) {
      case 0:
        name = 'red'
        break
      case 1:
        name = 'purple'
        break
      case 2:
        name = 'pink'
        break
      case 3:
        name = 'blue'
        break
      default:
        break
      }
    return name
  }

  render() {
    let charName = this.charCreator(this.props.charNum)

    return (
      <div id='character-container'>
        <div className={`character ${charName} `}>
          {this.props.win === 'win' ? '🤩' : '🤓'}
        </div>
      </div>
    )
  }
}

export default Character
