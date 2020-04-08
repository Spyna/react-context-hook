import { SET_VALUE, REMOVE_VALUE } from './actionTypes'

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
