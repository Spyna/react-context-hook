import React from 'react'
import StoreContext from './StoreContext'
import createStore from './redux/store'
import defaultConfig from './defaultConfig'

/**
 * @param {ReactElement} WrappedComponent the component to connect with the store
 * @param {Object} initialValue the initial store value or nothing
 * @param {Object} config the custom configuration. If nothing is passed will use the default config
 * @param {Function} config.listener a function that is triggered each time the store is modified.
 * @param {boolean} config.proxyStore - default `true` - if true the store will be protected by a Proxy. Set to false if your environment does not support Proxy. If you use `react-context-hook` in the browser set it to true
 * @example
 *const initialState = { count: 10 }
 *
 *const storeConfig = {
 *  listener: state => {
 *    console.log('state changed', state)
 *  },
 *  logging: true //process.env.NODE_ENV !== 'production'
 *}
 *
 *export default withStore(App, initialState, storeConfig)
 */
const withStore = (WrappedComponent, initialValue, config) => {
  const userConfig = Object.freeze({ ...defaultConfig, ...config })
  const store = createStore(initialValue, userConfig)
  return function (props) {
    return (
      <StoreContext.Provider value={{ store }}>
        <WrappedComponent {...props} />
      </StoreContext.Provider>
    )
  }
}

export { withStore }
