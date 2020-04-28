import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import { logger, listernerMiddleware } from './middleware'

export default function storeCreator(initialValue = {}, config = {}) {
  const { logging, listener } = config

  const middlewares = [
    listener && listernerMiddleware(listener),
    logging && logger
  ].filter(Boolean)

  return createStore(
    rootReducer,
    { main: initialValue },
    applyMiddleware(...middlewares)
  )
}
