import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { ajax } from 'rxjs/observable/dom/ajax'

import {
  FETCH_MATCHES,
  fetchMatchesFailure,
  fetchMatchesSuccess
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
    }).map(matches => matches.response))
    .map(matches => fetchMatchesSuccess(matches))
    .catch(error => Observable.of(fetchMatchesFailure(error.message)))
}

export const rootEpic = combineEpics(fetchMatchesEpic)