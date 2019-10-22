import React, { useState } from 'react'
import StoreContext from './StoreContext'
import createStoreInternal from './createStoreInternal'

let rawStore

/**
 * @param {ReactElement} WrappedComponent the component to connect with the store
 * @param {Object} initialValue the initial store value or nothing
 * @param {Object} config the custom configuration. If nothing is passed will use the default config
 */
const createStore = (WrappedComponent, initialValue, config) => {
  return function(props) {
    const [state, setState] = useState({ ...initialValue })
    const store = createStoreInternal(config, state, setState)
    rawStore = store
    return (
      <StoreContext.Provider value={store}>
        <WrappedComponent {...props} />
      </StoreContext.Provider>
    )
  }
}

export { createStore, rawStore }
