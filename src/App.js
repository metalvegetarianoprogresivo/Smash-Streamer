import React, { Component } from 'react'
import openSocket from 'socket.io-client'

import { CharacterSelect, GeneralInput, PlayerInput } from './components'
import { characterData } from './utils/playerUpdates'
import './App.css'
import 'materialize-css/dist/css/materialize.min.css'

const socket = openSocket('http://localhost:3010')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOneName: '',
      playerOneScore: 0,
      playerOneCharacter: '',
      playerTwoName: '',
      playerTwoScore: 0,
      playerTwoCharacter: '',
      inputName: '',
      inputRound: ''
    }

    socket.on('match_update', msg => console.log(msg))

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    console.log(value, name)

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
    socket.emit('match_update', {
      playerOne: {
        team: this.state.playerOneTeam,
        name: this.state.playerOneName,
        score: this.state.playerOneScore,
        character: characterData(this.state.playerOneCharacter)[0]
      },
      playerTwo: {
        team: this.state.playerTwoTeam,
        name: this.state.playerTwoName,
        score: this.state.playerTwoScore,
        character: characterData(this.state.playerTwoCharacter)[0]
      },
      tournyName: this.state.inputName,
      tournyRound: this.state.inputRound
    })
  }

  render() {
    return (
      <div className='App container'>
        <form onSubmit={this.handleSubmit}>
          <div class='section'>
            <h5>Player Match</h5>
            <p>1v1</p>
          </div>
          <div class='divider'></div>
          <div class='row'>
            <div class='col s6'>
              <div class='section'>
                <h5>Player One</h5>
              </div>
              <PlayerInput title='Team' playerNumber='one' playerValue={this.state.playerOneTeam} type='team' handleChange={this.handleChange} />
              <PlayerInput title='Name' playerNumber='one' playerValue={this.state.playerOneName} type='name' handleChange={this.handleChange} />
              <PlayerInput title='Score' playerNumber='one' playerValue={this.state.playerOneScore} type='score' handleChange={this.handleChange} />
              <CharacterSelect playerNumber='one' handleChange={this.handleChange} playerValue={this.state.playerOneCharacter}/>
            </div>
            <div class='col s6'>
              <div class='section'>
                <h5>Player Two</h5>
              </div>
              <PlayerInput title='Team' playerNumber='two' playerValue={this.state.playerTwoTeam} type='team' handleChange={this.handleChange} />
              <PlayerInput title='Name' playerNumber='two' playerValue={this.state.playerTwoName} type='name' handleChange={this.handleChange} />
              <PlayerInput title='Score' playerNumber='two' playerValue={this.state.playerTwoScore} type='score' handleChange={this.handleChange} />
              <CharacterSelect playerNumber='two' handleChange={this.handleChange} playerValue={this.state.playerTwoCharacter} />
            </div>
            <div class='col s12'>
              <GeneralInput title='Tournament Name' inputValue={this.state.tourneyName} type='name' handleChange={this.handleChange} />
              <GeneralInput title='Tournament Round' inputValue={this.state.tourneyRound} type='round' handleChange={this.handleChange} />
              <input className='waves-effect waves-light btn-large' type='submit' id='submitScore' value='GO!' />
            </div> 
          </div> 
        </form>
      </div>
    )
  }
}

export default App
