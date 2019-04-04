import {
  FETCH_MATCHES,
  FETCH_MATCHES_FAILURE,
  FETCH_MATCHES_SUCCESS
} from '../actions'

const initialState = {
  matches: [],
  isLoading: false,
  loadedMatches: false,
  error: null
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MATCHES:
      return {
        ...state,
        isLoading: true,
        loadedIssues: false,
        error: null
      }
    case FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        matches: [
          ...action.payload
        ],
        isLoading: false,
        loadedIssues: true,
        error: null
      }
    case FETCH_MATCHES_FAILURE:
      return {
        ...state,
        isLoading: false,
        loadedIssues: false,
        error: action.payload
      }
    default:
      return state
  }
}