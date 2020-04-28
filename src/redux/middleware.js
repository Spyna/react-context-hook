export const logger = ({ getState }) => (next) => (action) => {
  const prevState = getState().main
  const returnValue = next(action)
  console.group(`%c react-context-hook`, 'font-weight: bold')
  console.info(
    `%c ${'PREV STATE'} `,
    'background: #00e5a0;font-weight: bold',
    prevState
  )
  console.info(
    `%c ${'ACTION'} %c ${action.type}`,
    'background: yellow;font-weight: bold',
    'font-weight: bold;',
    action.payload.key || '',
    action.payload.value || action.payload
  )
  console.info(
    `%c ${'NEXT STATE'} `,
    'background: #00cbff;font-weight: bold',
    getState().main
  )
  console.groupEnd()
  return returnValue
}

export const listernerMiddleware = (listener) => ({ getState }) => (next) => (
  action
) => {
  const { key } = action.payload
  const prevValue = getState().main[key]
  const value = next(action)
  const nextValue = getState().main[key]
  listener(getState().main, key, prevValue, nextValue)
  return value
}
