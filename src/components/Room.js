//Add an actionCompleted boolean
//You should be able to freely select a character
//Once you move them once you should be able to move them again as many times as you would like in the same direction
//AFTER you move them once the actionCompleted bool should be flipped
//If the bool is true then once you switch characters you get a new action

import React, { Component } from 'react'
import Square from './Square.js'

import './styles/room.css'

class Room extends Component {
  state = {
    isSelected: null,
    squareArray: [],
    isExitPoint: [],
    actionCompleted: false,
    charLocations: [45, 46, 55, 56], //Need to think of a way to be comparing this array and the exit point array
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

    window.addEventListener('keydown', (event) => this.handleKeyDown(event.code, this.props.currentAction))

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
// THIS IS WHERE I ENSURE A PLAYABLE FIELD ⬇️ This is bad.
// Understanding what a matrix is/does would really take care of most of this for me...
//
//THOUGHT:
//Render the board randomly (with a box around the characters) and then FROM EACH CHARACTER randomly create a path of passable squares until I hit the edge of the board, where I will place their exit point.
//This will require recursion.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //This function picks four random squares out of the array of all the border squares.
    //These will be used as the exit exitPoints.
    // const selectExitPoints = (num) => {
    //   for (let i = 0; i < num; ++i) {
    //     let randBorderSquare = borderSquareArr[Math.floor(Math.random()*borderSquareArr.length)].id
    //
    //     if (!exitPoints.includes(randBorderSquare)) {
    //       exitPoints.push(randBorderSquare)
    //     } else {
    //       selectExitPoints(1)
    //     }
    //   }
    // }
    //
    // selectExitPoints(4)


    //Here is where I attempted to fill out more of the board with traversable squares.
    //This needs a LOT of fine tuning as most of the boards I load are unplayable.
    //I am considering building rooms with a canvas instead of randomizing the boards.
    newArr.forEach(squareObj => {
      //Find the squares around the current square.
      // let squareAbove = newArr.find(square => square.id === squareObj.id - 10)
      // let squareUpRight = newArr.find(square => square.id === squareObj.id - 9)
      // let squareRight = newArr.find(square => square.id === squareObj.id + 1)
      // let squareDownRight = newArr.find(square => square.id === squareObj.id + 11)
      // let squareBelow = newArr.find(square => square.id === squareObj.id + 10)
      // let squareDownLeft = newArr.find(square => square.id === squareObj.id + 9)
      // let squareLeft = newArr.find(square => square.id === squareObj.id - 1)
      // let squareUpLeft = newArr.find(square => square.id === squareObj.id - 11)

      //This is a recursive function that will hopefully create a path from a starting point to an exitpoint.
      const createPathToExitPoint = (squareObj) => {
        let newSquareAbove = newArr.find(square => square.id === squareObj.id - 10)
        let newSquareRight = newArr.find(square => square.id === squareObj.id + 1)
        let newSquareBelow = newArr.find(square => square.id === squareObj.id + 10)
        let newSquareLeft = newArr.find(square => square.id === squareObj.id - 1)

        let surroundingSquares = [newSquareAbove, newSquareRight, newSquareBelow, newSquareLeft]

        let randomSurroundingSquare = surroundingSquares[Math.floor(Math.random()*surroundingSquares.length)]

        //If the randomly selected surrounding square is within the confines of the board, run the function again on this new squareObj UNLESS this randomly selected square is one of the borderSquares.
        //In this case, simply add the square to the exitpoints array.
        //Each time we move on, we ensure that the randomly selected square is made into a path
        if (borderSquareArr.includes(randomSurroundingSquare)) {
          if (exitPoints.includes(randomSurroundingSquare.id)) {
            createPathToExitPoint(randomSurroundingSquare)
          } else {
            randomSurroundingSquare.charAllowed = true
            exitPoints.push(randomSurroundingSquare.id)
          }
        } else {
          randomSurroundingSquare.charAllowed = true
          createPathToExitPoint(randomSurroundingSquare)
        }
      }

      //Ensure that there is a box around the center squares where the characters will appear.
      switch (squareObj.id) {
        case 45:
          createPathToExitPoint(squareObj)
          squareObj.charAllowed = true
          // squareAbove.charAllowed = true
          // squareLeft.charAllowed = true
          break
        case 46:
          createPathToExitPoint(squareObj)
          squareObj.charAllowed = true
          // squareRight.charAllowed = true
          // squareAbove.charAllowed = true
          break
        case 55:
          createPathToExitPoint(squareObj)
          squareObj.charAllowed = true
          // squareBelow.charAllowed = true
          // squareLeft.charAllowed = true
          break
        case 56:
          createPathToExitPoint(squareObj)
          squareObj.charAllowed = true
          // squareBelow.charAllowed = true
          // squareRight.charAllowed = true
          break
        default:
          break
      }

      //Check to see if this is an internal square.
      // if (squareAbove && squareRight && squareBelow && squareLeft) {
      //   // If it IS an internal square, check to see if it is surrounded by blocks.
      //   if (!squareAbove.charAllowed && !squareRight.charAllowed && !squareBelow.charAllowed && !squareLeft.charAllowed) {
      //     //If it IS surrounded by blocks, change this square and all surrounding blocks to paths.
      //     squareObj.charAllowed = true
      //     squareAbove.charAllowed = true
      //     squareRight.charAllowed = true
      //     squareBelow.charAllowed = true
      //     squareLeft.charAllowed = true
      //   }
      // }
    })

    borderSquareArr.forEach(square => {
      if (!exitPoints.includes(square.id)) {
        square.charAllowed = false
      }
    })

    this.setState({ squareArray: newArr, isExitPoint: exitPoints })
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TILE SELECTION ⬇️
  // Note: - After any character is moved at least once, the actionCompleted (in state) should be changed to true
  //         If the actionCompleted is true when selecting a new character the action should be changed in the direction card
  //       - I should be able to select and unselect characters at will without triggering the action to change UNLESS I've
  //         already use the action
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  selectTile = (selectedSquareId, currentChar, keyOrClick) => {
    //Create a copy of the character locations array so that I can alter the state of a single element from the array
    console.log('selected square:', selectedSquareId);
    console.log('current character:', currentChar);
    console.log('key or click:', keyOrClick);
    let charLocationsArr = this.state.charLocations.slice()
    charLocationsArr[currentChar] = selectedSquareId

    // If I cick on a square I should be selecting, or unselecting it
    // I should be able to do this as many times as I want without changing the actionCompleted status
    // IF I am using a keypress to select a tile I should be changing the actionCompleted status
    if (keyOrClick === 'click') {
      //clicking the selected square should remove the selection.
      if (this.state.isSelected === selectedSquareId) {
        this.setState({
          actionCompleted: false,
          isSelected: null,
        }, () => console.log('actionCompleted:', this.state.actionCompleted))
      } else {
        console.log('actionCompleted before state change:', this.state.actionCompleted)
        if (this.state.actionCompleted) {
          this.props.changeAction()
        }

        this.setState({
          actionCompleted: false,
          isSelected: selectedSquareId,
          charLocations: charLocationsArr,
        }, () => console.log('actionCompleted after state change:', this.state.actionCompleted))
      }
    }

    if (keyOrClick === 'keyPress') {
      this.setState({
        actionCompleted: true,
        isSelected: selectedSquareId,
        charLocations: charLocationsArr,
      }, () => console.log('actionCompleted:', this.state.actionCompleted))
    }
  }

  //This function is the initial decider on wether or not a square is a path or a block - 50/50 chance
  determineAllowed = () => {
    let num  = Math.random()
    if (num < 0.5) {
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


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // KEY DOWN FUNCTIONALITY ⬇️
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  handleKeyDown = (keyPressed, currentAction) => {
    const acceptedKeys = ['Enter', 'Space']
    // Check to see that there is currently a character selected AND that the key pressed is the space bar
    // if (this.state.isSelected && keyPressed === 'Enter' || this.state.isSelected && keyPressed === 'Space') {
    if (this.state.isSelected && acceptedKeys.includes(keyPressed)) {
      // Set currentlySelected to the selection in state
      let currentlySelected = this.state.isSelected
      // Set currentChar to the index of the currentlySelected character in the charLocations array
      let currentChar = this.state.charLocations.indexOf(currentlySelected)

      // This switch will move the selected character in whatever direction is held in the action card (currentAction)
      switch (currentAction) {
        case 'right':
          // If the selected square is on the right border of the board do nothing otherwise...
          if (!this.rightSquare(currentlySelected)) {
            // increment currentlySelected by 1 (really this is an adjacent square - this variable should be renamed)
            // could also probably just rename nextSpace to adjacentSquare and find the squareObj.id === currentlySelected + 1
            currentlySelected = currentlySelected + 1
            // find the square object in the squareArray is one space to the right of the selection
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            // if this nextSpace allows characters in it AND it is unoccupied by another character... (is this redundant?)
            if (nextSpace.charAllowed && !this.state.charLocations.includes(nextSpace.id)) {
              // run the selectTile function on the currentlySelected square and the currentChar
              // additionally we need to pass in an argument that will inform the selectTile function that it is being run on a
              // keypress and not a click
              this.selectTile(currentlySelected, currentChar, 'keyPress')
              this.checkForWin()
            }
          }
          break
        case 'left':
          if (!this.leftSquare(currentlySelected)) {
            currentlySelected = currentlySelected - 1
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed && !this.state.charLocations.includes(nextSpace.id)) {
              this.selectTile(currentlySelected, currentChar, 'keyPress')
              this.checkForWin()
            }
          }
          break
        //ArrowUp causes an error on the bottom left square
        case 'up':
          if (!this.topSquare(currentlySelected)) {
            currentlySelected = currentlySelected - 10
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed && !this.state.charLocations.includes(nextSpace.id)) {
              this.selectTile(currentlySelected, currentChar, 'keyPress')
              this.checkForWin()
            }
          }
          break
        //ArrowDown causes an error on the bottom left square
        case 'down':
          if (!this.bottomSquare(currentlySelected)) {
            currentlySelected = currentlySelected + 10
            let nextSpace = this.state.squareArray.find(squareObj => squareObj.id === currentlySelected)

            if (nextSpace.charAllowed && !this.state.charLocations.includes(nextSpace.id)) {
              this.selectTile(currentlySelected, currentChar, 'keyPress')
              this.checkForWin()
            }
          }
            break
        default:
          break
      }
    }
  }

  //Currently the win condition is just that all four characters are in an exit point
  //At some point each exit point should be character specific (based on the indexes)
  checkForWin = () => {
    console.log("DID I WIN?!?!?!?")
    console.log("Exit Points:", this.state.isExitPoint)
    console.log("Character Positions:", this.state.charLocations)
    let winCheck = true

    this.state.isExitPoint.forEach(position => {
      if (!this.state.charLocations.includes(position)) {
        winCheck = false
      }
    })

    this.props.toggleWin(winCheck)
  }

  render() {
    const { charLocations, isSelected, isExitPoint, win } = this.state

    return (
      <div className='game-room'>
        <div className="room grid-container">
          {this.state.squareArray.map(el => 
            <Square
              charLocations={ charLocations }
              isSelected={ isSelected }
              key={ el.id }
              id={ el.id }
              charAllowed={ el.charAllowed }
              isExitPoint={ isExitPoint }
              selectTile={ this.selectTile }
              win={ win }
            />)}
            { this.props.win ? <div>You Win!</div> : <div></div>}
        </div>
      </div>
    )
  }
}

export default Room
