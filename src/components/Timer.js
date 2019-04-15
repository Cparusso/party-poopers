import React, { Component } from 'react'

export default class Timer extends Component {
    state={
        minutes: 2,
        seconds: 59,
        timesUp: false
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            if (this.state.seconds > -1) {
                this.setState(previousState => ({
                    seconds: previousState.seconds - 1
                }))
            }
            if (this.state.seconds === -1) {
                if (this.state.minutes === 0) {
                    this.setState({timesUp: true})
                } else {
                    this.setState(previousState => ({
                        minutes: previousState.minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
    
    render() {
        const { minutes, seconds, timesUp } = this.state
        console.log(timesUp)
        return (
        <div>
                { timesUp ? 
                <h1>BUSTED</h1>
                :
                <h1>Time Remaining : {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</h1> 
                }
        </div>
        )
    }
}
