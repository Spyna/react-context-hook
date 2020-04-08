import { combineReducers } from 'redux'

import { SET_VALUE, REMOVE_VALUE } from './actionTypes'

function mainReducer(state = {}, action) {
  switch (action.type) {
    case SET_VALUE: {
      const { key, value } = action.payload
      const newState = {
        ...state
      }
      newState[key] = value
      return newState
    }
    case REMOVE_VALUE: {
      const { key } = action.payload
      const newState = {
        ...state
      }
      delete newState[key]
      return newState
    }
    default:
      return state
  }
}

export default combineReducers({ main: mainReducer })
