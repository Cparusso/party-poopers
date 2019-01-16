import React, { Component } from 'react'
import Square from './Square.js'

import './styles/row.css'

class Row extends Component {
  render() {
    return (
      <div className="row grid">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    )
  }
}

export default Row
