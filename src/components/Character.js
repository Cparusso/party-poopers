import React, { Component } from 'react'

import './styles/character.css'

class Character extends Component {
  charCreator = (charNum) => {
    let name
    switch (charNum) {
      case 0:
        return name = 'charlie'
        break
      case 1:
        return name = 'bill'
        break
      case 2:
        return name = 'heather'
        break
      case 3:
        return name = 'meat'
        break
    }
  }

  render() {
    let charName = this.charCreator(this.props.charNum)

    return (
      <div id='character-container'>
        <div className={`character ${charName} `}>
          {this.props.win === 'win' ? '🤩' : '☹️'}
        </div>
      </div>
    )
  }
}

export default Character
