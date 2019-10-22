const warnUser = prop => {
  console.group('%c react-context-hook ', 'background: #fcc; color: #333')
  console.error(`Sorry, you can't modify the [${prop}] property this way.`)
  console.groupEnd()
}

const storeHandler = {
  set(obj, prop, value) {
    warnUser(prop)
    return true
  },
  deleteProperty(target, prop) {
    warnUser(prop)
    return true
  }
}
export { storeHandler }
