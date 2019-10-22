const stack = []

export default {
  push: (state, action, key, value) => {
    stack.push({ action, state, key, value })
  },
  log: state => {
    const { action, state: prevState, key, value } = stack[stack.length - 1]
    console.group(`%c react-context-hook`, 'font-weight: bold')
    console.info(
      `%c ${'PREV STATE'} `,
      'background: #00e5a0;font-weight: bold',
      prevState
    )
    console.info(
      `%c ${'ACTION'} %c ${action}`,
      'background: yellow;font-weight: bold',
      'font-weight: bold;',
      key,
      value
    )
    console.info(
      `%c ${'NEXT STATE'} `,
      'background: #00cbff;font-weight: bold',
      state
    )
    console.groupEnd()
  }
}
