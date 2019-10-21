import React, { Component } from 'react'

export default class Timer extends Component {
    state = {
        minutes: 3,
        seconds: 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    display = (minutes, seconds, win) => {
        if (win) {
            return <h1>You Win!</h1>
        } else {
            if (minutes === 0 && seconds === 0) {
                return <h1>Busted!</h1>
            } else {
                return <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        }
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                { this.display(minutes, seconds, this.props.win) }
            </div>
        )
    }
}