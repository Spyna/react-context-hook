import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import { logger, listernerMiddleware } from './middleware'

export default function createStoreCreator(initialValue = {}, config) {
  const { logging, listener } = config

  return createStore(
    rootReducer,
    { main: initialValue },
    applyMiddleware(
      ...[listener && listernerMiddleware(listener), logging && logger].filter(
        Boolean
      )
    )
  )
}
