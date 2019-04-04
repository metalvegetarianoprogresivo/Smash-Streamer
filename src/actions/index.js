export const FETCH_MATCHES = 'FETCH_MATCHES'
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS'
export const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE'
export const FETCH_PLAYERS = 'FETCH_PLAYERS'
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS'
export const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE'

export const fetchMatches = matches => ({
  type:  FETCH_MATCHES,
  payload: matches
})

export const fetchMatchesSuccess = issues => ({
  type:  FETCH_MATCHES_SUCCESS,
  payload: issues
})

export const fetchMatchesFailure = message => ({
  type:  FETCH_MATCHES_FAILURE,
  payload: message
})

export const fetchPlayers = matches => ({
  type:  FETCH_PLAYERS,
  payload: matches
})

export const fetchPlayersSuccess = issues => ({
  type:  FETCH_PLAYERS_SUCCESS,
  payload: issues
})

export const fetchPlayersFailure = message => ({
  type:  FETCH_PLAYERS_FAILURE,
  payload: message
})
