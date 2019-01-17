import React, { Component } from 'react'
import Square from './Square.js'

import './styles/room.css'

class Room extends Component {
  state = {
    isSelected: null,
    squareArray: []
  }

  componentDidMount = () => {
    let arr = []
    let newArr = []
    let i = 0

    window.addEventListener('keydown', (event) => this.handleKeyDown(event.code))

    while (arr.length < 100) {
      arr.push(++i)
    }

    arr.forEach(el => {
      let obj = {id: el, charAllowed: this.determineAllowed(), selectTile:false}
      newArr.push(obj)
    })

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// THIS IS WHERE I ENSURE A PLAYABLE FIELD ⬇️
// A matrix would really take care of this for me...
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    newArr.forEach(squareObj => {
      let squareAbove = newArr.find(square => square.id === squareObj.id - 10)
      let squareRight = newArr.find(square => square.id === squareObj.id + 1)
      let squareBelow = newArr.find(square => square.id === squareObj.id + 10)
      let squareLeft = newArr.find(square => square.id === squareObj.id - 1)

      switch (squareObj.id) {
        case 45:
          squareAbove.charAllowed = true
          squareLeft.charAllowed = true
          squareObj.charAllowed = true
          break
        case 46:
          squareRight.charAllowed = true
          squareAbove.charAllowed = true
          squareObj.charAllowed = true
          break
        case 55:
          squareBelow.charAllowed = true
          squareLeft.charAllowed = true
          squareObj.charAllowed = true
          break
        case 56:
          squareBelow.charAllowed = true
          squareRight.charAllowed = true
          squareObj.charAllowed = true
          break
        default:
          break
      }

      if (squareAbove && squareRight && squareBelow && squareLeft) {
        if (!squareAbove.charAllowed && !squareRight.charAllowed && !squareBelow.charAllowed && !squareLeft.charAllowed) {
          squareObj.charAllowed = true
          squareAbove.charAllowed = true
          squareRight.charAllowed = true
          squareBelow.charAllowed = true
          squareLeft.charAllowed = true
        }
      }
    })

    this.setState({ squareArray: newArr })
  }

  selectTile = (selectedSquareId) => {
    console.log(selectedSquareId);
    if (this.state.isSelected === selectedSquareId) {
      this.setState({
        isSelected: null,
      })
    } else {
      this.setState({
        isSelected: selectedSquareId,
      })
    }
  }

  determineAllowed = () => {
    let num  = Math.floor(Math.random() * 2)
    if (num % 2 === 0) {
      return true
    } else {
      return false
    }
  }

  handleKeyDown = (keyPressed) => {
    if (this.state.isSelected) {
      let currentlySelected = this.state.isSelected

      switch (keyPressed) {
        case 'ArrowRight':
          if (currentlySelected.toString().split('').pop() !== '0') {
            currentlySelected = currentlySelected + 1
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed) {
              this.selectTile(currentlySelected)
            }
          }
          break
        case 'ArrowLeft':
          if (currentlySelected.toString().split('').pop() !== '1') {
            currentlySelected = currentlySelected - 1
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed) {
              this.selectTile(currentlySelected)
            }
          }
          break
        case 'ArrowUp':
          if (currentlySelected > 10) {
            currentlySelected = currentlySelected - 10
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed) {
              this.selectTile(currentlySelected)
            }
          }
          break
        case 'ArrowDown':
          if (currentlySelected < 91) {
            currentlySelected = currentlySelected + 10
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed) {
              this.selectTile(currentlySelected)
            }
          }
            break
        default:
          break
      }
    }
  }

  render() {
    return (
      <div className='game-room'>
        <div className="room grid-container">
          {this.state.squareArray.length > 24 ? this.state.squareArray.map(el => <Square isSelected={ this.state.isSelected } key={ el.id } id={el.id} charAllowed={el.charAllowed} selectTile={this.selectTile}/>) : null}
        </div>
      </div>
    )
  }
}

export default Room
