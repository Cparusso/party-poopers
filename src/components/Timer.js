import React, { Component } from 'react'

import './styles/timer.css'

class Timer extends Component {

  render() {
    return (
      <div className="timer-container">
        <p className="clock-words">
          Time Remaining
        </p>
        <p className="time">
          03:00
        </p>
      </div>
    )
  }
}

export default Timer
