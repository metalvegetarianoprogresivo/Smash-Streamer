import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import openSocket from 'socket.io-client'

import { fetchMatches } from './actions'
import { CharacterSelect, GeneralInput, PlayerInput, MatchSelect } from './components'
import { characterData, getOpenMatches } from './utils/playerUpdates'
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
      inputRound: '',
      inputText: ''
    }
  }

  componentDidMount() {
    const { fetchMatches } = this.props
    // getOpenMatches('7d5lit4f')
    //   .then(res => {
    //     console.log('complete')
    //     this.setState({ matches: res })
    //   })
    //   .catch(err => console.log(err))
  }

  handleChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleMatchSubmit = event => {
    event.preventDefault()
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
      tourneyName: this.state.inputName,
      tourneyRound: this.state.inputRound
    })
  }

  handleTourneySubmit = event => {
    event.preventDefault()
    console.log('id', this.state.inputText)
    getOpenMatches(this.state.inputText)
      .then(res => {
        console.log('complete')
        this.setState({ matches: res })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='App container'>
        <div class='section'>
          <h5>Player Match</h5>
          <p>1v1</p>
        </div>
        <div class='divider'></div>
        <div class='row'>
          <form onSubmit={this.handleTourneySubmit}>
            <div class='col s12'>
              <div class='section'>
                <h5>Get Tournament Data</h5>
              </div>
            </div>
            <div class='col s6'>
              <GeneralInput title='Tournament Information' type='text' inputValue={this.state.inputText} handleChange={this.handleChange} />
            </div>
            <div class='col s6'>
              <input className='waves-effect waves-light btn-large' type='submit' id='submitTournament' value='Get Matches' />
            </div>
          </form>
        </div>
        <div class='divider'></div>
        <div class='row'>
          <form onSubmit={this.handleMatchSubmit}>
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
            <input className='waves-effect waves-light btn-large' type='submit' id='submitScore' value='Update Match' />
          </div>
          </form>
        </div>
        <div className='col s12'>
          <form onSubmit={this.handleMatchSubmit}>
            <GeneralInput title='Tournament Name' inputValue={this.state.tourneyName} type='name' handleChange={this.handleChange} />
            <GeneralInput title='Tournament Round' inputValue={this.state.tourneyRound} type='round' handleChange={this.handleChange} />
            {this.state.matches && 
              <div>
                <MatchSelect selectName='MatchSelectId' matches={this.state.matches} handleChange={this.handleChange} />
              </div>
            }
            <input className='waves-effect waves-light btn-large' type='submit' id='submitEvent' value='Update Event' />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })
const mapDispatchToProps = dispatch =>
  (bindActionCreators({
    fetchMatches
  }, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(App)
