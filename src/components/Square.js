import React, { Component } from 'react'

import './styles/square.css'

class Square extends Component {
  state = {
    isClicked: false,
  }

  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  render() {
    let clicked = this.props.isSelected === this.props.id ? 'clicked' : ''
    let charAllowed = this.props.charAllowed ? 'path' : 'block'

    return (
      <div className={`square ${clicked} ${charAllowed}`} onClick={ this.props.charAllowed ? () => this.props.selectTile(this.props.id) : null }>
      </div>
    )
  }
}

export default Square
