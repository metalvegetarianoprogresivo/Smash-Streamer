export const FETCH_MATCHES = 'FETCH_MATCHES'
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS'
export const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE'

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
