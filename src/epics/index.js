import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { ajax } from 'rxjs/ajax'

import {
  FETCH_MATCHES,
  FETCH_PLAYERS,
  fetchMatchesFailure,
  fetchPlayersFailure,
  fetchMatchesSuccess,
  fetchPlayersSuccess
} from '../actions'

import { api_key, tourney } from '../config'

function fetchMatchesEpic(action$) {
  return action$
    .ofType(FETCH_MATCHES)
    .mergeMap(action => ajax({
      url: `https://cors-anywhere.herokuapp.com/https://api.challonge.com/v1/tournaments/${tourney}/matches.json?state=open&api_key=${api_key}`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    }).map(matches => {
      console.log(matches.response)
      return matches.response
    }))
    .map(matches => fetchMatchesSuccess(matches))
    .catch(error => Observable.of(fetchMatchesFailure(error.message)))
}

function fetchPlayersEpic(action$) {
  return action$
    .ofType(FETCH_PLAYERS)
    .mergeMap(action => ajax({
      url: `https://cors-anywhere.herokuapp.com/https://api.challonge.com/v1/tournaments/${tourney}/participants.json?api_key=${api_key}`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    }).map(players => {
      console.log(players.response)
      return players.response
    }))
    .map(players => fetchPlayersSuccess(players))
    .catch(error => Observable.of(fetchPlayersFailure(error.message)))
}

export const rootEpic = combineEpics(fetchMatchesEpic, fetchPlayersEpic)