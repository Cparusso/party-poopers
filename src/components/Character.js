import React, { Component } from 'react'

import './styles/character.css'

class Character extends Component {
  render() {
    return (
      <div id='character-container'>
        {this.props.win === 'win' ? '🤩' : '☹️'}
      </div>
    )
  }
}

export default Character
