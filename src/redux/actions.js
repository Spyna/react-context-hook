import { SET_VALUE, REMOVE_VALUE, RESET } from './actionTypes'

export const setStoreValueAction = (key, value) => ({
  type: SET_VALUE,
  payload: {
    key,
    value
  }
})

export const deleteStoreValueAction = (key) => ({
  type: REMOVE_VALUE,
  payload: {
    key
  }
})

export const resetStoreWithValue = (state = {}) => ({
  type: RESET,
  payload: state
})
