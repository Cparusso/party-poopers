import React, { Component } from 'react'
import Square from './Square.js'

import './styles/room.css'

class Room extends Component {
  state = {
    isSelected: null,
    isExitPoint: [],
    squareArray: [],
    charLocations: [45, 46, 55, 56] //Need to think of a way to be comparing this array and the exit point array
                                    //When they match you win and the game should end
                                    //Each exit point can be tied to a character via their indexes
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // LOAD BOARD ⬇️
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  componentDidMount = () => {
    let arr = []
    let newArr = []
    let i = 0
    let borderSquareArr = []
    const exitPoints = []

    window.addEventListener('keydown', (event) => this.handleKeyDown(event.code))

    while (arr.length < 100) {
      arr.push(++i)
    }

    arr.forEach(el => {
      let obj = {id: el, charAllowed: this.determineAllowed(), selectTile:false}

      if (this.topSquare(el) || this.rightSquare(el) || this.bottomSquare(el) || this.leftSquare(el)) {
        borderSquareArr.push(obj)
      }

      newArr.push(obj)
    })

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// THIS IS WHERE I ENSURE A PLAYABLE FIELD ⬇️
// Understanding what a matrix is/does would really take care of most of this for me...
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //This function picks four random squares out of the array of all the border squares.
    //These will be used as the exit exitPoints.
    const selectExitPoints = (num) => {
      for (let i = 0; i < num; ++i) {
        let randBorderSquare = borderSquareArr[Math.floor(Math.random()*borderSquareArr.length)].id

        if (!exitPoints.includes(randBorderSquare)) {
          exitPoints.push(randBorderSquare)
          console.log(exitPoints);
        } else {
          selectExitPoints(1)
        }
      }
    }

    selectExitPoints(4)

    //Here is where I attempted to fill out more of the board with traversable squares.
    //This needs a LOT of fine tuning as most of the boards I load are unplayable.
    //I am considering building rooms with a canvas instead of randomizing the boards.
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

      if (exitPoints.includes(squareObj.id)) {
        squareObj.charAllowed = true
      }
    })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ENDPOINT SELECTION ⬇️
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    this.setState({ squareArray: newArr, isExitPoint: exitPoints })
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TILE SELECTION ⬇️
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  selectTile = (selectedSquareId, currentChar) => {
    //Create a copy of the character locations array so that I can alter the state of a single element from the array
    let charLocationsArr = this.state.charLocations.slice()
    charLocationsArr[currentChar] = selectedSquareId

    if (this.state.charLocations.includes(selectedSquareId)) {
      this.setState({
        isSelected: selectedSquareId,
        charLocations: charLocationsArr
      })
    }

    if (this.state.isSelected === selectedSquareId) {
      this.setState({
        isSelected: null,
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

  topSquare = (currentlySelected) => {
    return currentlySelected < 10 ? true : false
  }

  rightSquare = (currentlySelected) => {
    return currentlySelected.toString().split('').pop() === '0' ? true : false
  }

  bottomSquare = (currentlySelected) => {
    return currentlySelected > 91 ? true : false
  }

  leftSquare = (currentlySelected) => {
    return currentlySelected.toString().split('').pop() === '1' ? true : false
  }

  handleKeyDown = (keyPressed) => {
    if (this.state.isSelected) {
      let currentlySelected = this.state.isSelected
      let currentChar = this.state.charLocations.indexOf(currentlySelected)

      switch (keyPressed) {
        case 'ArrowRight':
          if (!this.rightSquare(currentlySelected)) {
            currentlySelected = currentlySelected + 1
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed && !this.state.charLocations.includes(nextSpace.id)) {
              this.selectTile(currentlySelected, currentChar)
            }
          }
          break
        case 'ArrowLeft':
          if (!this.leftSquare(currentlySelected)) {
            currentlySelected = currentlySelected - 1
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed && !this.state.charLocations.includes(nextSpace.id)) {
              this.selectTile(currentlySelected, currentChar)
            }
          }
          break
        case 'ArrowUp':
          if (!this.topSquare(currentlySelected)) {
            currentlySelected = currentlySelected - 10
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed && !this.state.charLocations.includes(nextSpace.id)) {
              this.selectTile(currentlySelected, currentChar)
            }
          }
          break
        case 'ArrowDown':
          if (!this.bottomSquare(currentlySelected)) {
            currentlySelected = currentlySelected + 10
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed && !this.state.charLocations.includes(nextSpace.id)) {
              this.selectTile(currentlySelected, currentChar)
            }
          }
            break
        default:
          break
      }
    }
  }


  render() {
    const { charLocations, isSelected, isExitPoint } = this.state

    return (
      <div className='game-room'>
        <div className="room grid-container">
          {this.state.squareArray.map(el => <Square
            charLocations={ charLocations }
            isSelected={ isSelected }
            key={ el.id }
            id={ el.id }
            charAllowed={ el.charAllowed }
            isExitPoint={ isExitPoint }
            selectTile={ this.selectTile }/>)}
        </div>
      </div>
    )
  }
}

export default Room
