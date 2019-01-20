import React, { Component } from 'react'

import './styles/character.css'

class Character extends Component {
  charCreator = (charNum) => {
    let name
    switch (charNum) {
      case 0:
        name = 'charlie'
        break
      case 1:
        name = 'bill'
        break
      case 2:
        name = 'heather'
        break
      case 3:
        name = 'meat'
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
