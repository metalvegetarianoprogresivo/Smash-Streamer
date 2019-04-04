import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import openSocket from 'socket.io-client'

import { fetchMatches, fetchPlayers } from './actions'
import { CharacterSelect, GeneralInput, PlayerInput } from './components'
import { characterData, getOpenMatches, updateMatch } from './utils/playerUpdates'
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
      currentMatch: '',
      inputName: '',
      inputRound: '',
      inputText: ''
    }
  }

  componentDidMount() {
    const { fetchMatches, fetchPlayers } = this.props

    fetchMatches()
    fetchPlayers()
    // getOpenMatches('7d5lit4f')
    //   .then(res => {
    //     console.log('complete')
    //     this.setState({ matches: res })
    //   })
    //   .catch(err => console.log(err))
  }

  updateMatch = (id, player) => {
    this.setState({
      currentMatch: id,
      playerOneName: player[0].participant.name,
      playerOneId: player[0].participant.id,
      playerTwoName: player[1].participant.name,
      playerTwoId: player[1].participant.id,
      playerOneScore: 0,
      playerTwoSecore: 0,
    })
  }

  handleChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  completeCurrentMatch = () => {
    const {
      playerOneId,
      playerTwoId,
      playerOneScore,
      playerTwoScore,
      currentMatch
    } = this.state

    let matchWinner = ''

    if (playerOneScore > playerTwoScore) {
      matchWinner = playerOneId
    } else if (playerTwoScore > playerOneScore) {
      matchWinner = playerTwoId
    }

    updateMatch(currentMatch, `${playerOneScore}-${playerTwoScore}`, matchWinner)
      .then(res => {
        console.log(res)
        const { fetchMatches } = this.props
        fetchMatches()
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
    const {
      isLoading,
      players,
      matches
    } = this.props

    return (
      <div className='App container'>
        <div class='section'>
          <h5>Player Match</h5>
          <p>1v1</p>
        </div>
        <div class='divider'></div>
        <div className='col s12'>
          {!isLoading && matches.lenght !== 0 && players.lenght !== 0 &&
            <div>
              {matches.map(e => {
                const player = players.filter(p => p.participant.id === e.match.player1_id || p.participant.id === e.match.player2_id)
                return (
                  <div class="col s4">
                    <div class="card blue-grey darken-1">
                      <div class="card-content white-text">
                        <span class="card-title">{player[0].participant.name} vs. {player[1].participant.name}</span>
                      </div>
                      <div class="card-action">
                        <input className='waves-effect waves-light btn-large' type='button' onClick={() => this.updateMatch(e.match.id, player)} id={`updateMatch${e.match.id}`} value='Update Match' />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          }
        </div>
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
            <input className='waves-effect waves-light btn-large' type='button' onClick={this.completeCurrentMatch} id={`completeMatch`} value='Complete Match' />
          </div>
          </form>
        </div>
        <div className='col s12'>
          <form onSubmit={this.handleMatchSubmit}>
            <GeneralInput title='Tournament Name' inputValue={this.state.tourneyName} type='name' handleChange={this.handleChange} />
            <GeneralInput title='Tournament Round' inputValue={this.state.tourneyRound} type='round' handleChange={this.handleChange} />
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
    fetchMatches,
    fetchPlayers
  }, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(App)
