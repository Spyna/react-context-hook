import { storeHandler } from './storeProxyHandler'
import defaultConfig from './defaultConfig'
import devTools from './devTools'

export default function createStore(
  config = defaultConfig,
  state,
  setState
) {
  const userConfig = Object.freeze({ ...defaultConfig, ...config })
  const { listener, proxyStore, logging } = userConfig
  function updateState(storage) {
    return new Promise(resolve => {
      const newState = { ...state, ...storage }
      setState(newState)
      resolve(storage)
      if (logging) {
        devTools.log(newState)
      }
      listener(storage)
    })
  }

  let store = {
    get: (key, defaultValue) => {
      let value = state[key]
      if (value === undefined) {
        value = defaultValue
      }
      return value
    },
    set: (key, value) => {
      if (logging) {
        devTools.push({ ...state }, 'set', key, value)
      }
      state[key] = value
      return updateState(state)
    },
    remove: key => {
      if (logging) {
        devTools.push({ ...state }, 'remove', key)
      }
      delete state[key]
      return updateState(state)
    },
    getState: () => {
      return Object.assign({}, state)
    }
  }
  if (proxyStore) {
    store = new Proxy(store, storeHandler)
  }
  return store
}
