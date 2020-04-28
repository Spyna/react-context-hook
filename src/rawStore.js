import {
  resetStoreWithValue,
  setStoreValueAction,
  deleteStoreValueAction
} from './redux/actions'

export function createRawStore(store) {
  return {
    /**
     * Resets the state to the given input.
     *
     * @param {Object} state the new value to reset the state to.
     */
    reset: function (state) {
      store.dispatch(resetStoreWithValue(state))
    },
    /**
     * Sets the specified key in the store. This function is equivaluent to the `useSetStoreValue` hook.
     *
     * @param {string} key the property to set in the store
     * @param {Object} value the value of the property
     */
    set: function (key, value) {
      store.dispatch(setStoreValueAction(key, value))
    },
    /**
     * delete the specified key from the store. This function is equivaluent to the `useDeleteStoreValue` hook.
     *
     * @param {string} key the property to set in the store
     */
    delete: function (key) {
      store.dispatch(deleteStoreValueAction(key))
    },
    /**
     * @returns the global state value of the store
     */
    getState: function () {
      return store.getState().main
    }
  }
}
