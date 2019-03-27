import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import './App.css'
import 'materialize-css/dist/css/materialize.min.css'

const socket = openSocket('http://localhost:3010')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOneName: '',
      playerOneScore: 0
    }

    socket.on('match_update', msg => console.log(msg))

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    socket.emit('match_update', {
      name: this.state.playerOneName,
      score: this.state.playerOneScore
    })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='playerOneName'>
            Player One:
            <input name='playerOneName' type='text' className='Player' id='playerOneName' value={this.state.playerOneName} onChange={this.handleChange} />
          </label>
          <label htmlFor='playerOneScore'>
            Score:
            <input name='playerOneScore' type='number' className='Player' id='playerOneScore' value={this.state.playerOneScore} onChange={this.handleChange} />
          </label>
          <input className='waves-effect waves-light btn-large' type='submit' id='submitScore' value='GO!' />
        </form>
      </div>
    )
  }
}

export default App
