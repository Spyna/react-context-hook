import createStoreInternal from './createStoreInternal'

describe('Create Store internal test', () => {
  let state
  let setState
  beforeEach(() => {
    // setup a DOM element as a render target
    state = { test: 'test value' }
    setState = newState => {
      state = newState
    }
  })

  afterEach(() => {
    // cleanup on exiting
    state = null
  })

  it('should create the store', () => {
    const config = {}
    const setState = () => {}
    const store = createStoreInternal(config, state, setState)

    expect(typeof store.get).toBe('function')
    expect(typeof store.set).toBe('function')
    expect(typeof store.remove).toBe('function')
    expect(typeof store.getState).toBe('function')
  })

  it('should update a value in the store', async () => {
    const config = {}
    const store = createStoreInternal(config, state, setState)

    const key = 'a key'
    const value = 'a value'
    await store.set(key, value)
    expect(state[key]).toBe(value)
  })

  it('should update a value in the store and log it', async () => {
    const config = { logging: true }
    const store = createStoreInternal(config, state, setState)

    const key = 'a key'
    const value = 'a value'
    await store.set(key, value)
    expect(state[key]).toBe(value)
  })

  it('should get a value from the store', async () => {
    const config = {}
    const store = createStoreInternal(config, state, setState)

    const value = store.get('test')
    expect(value).toBe('test value')
  })

  it('should get the default value from the store if the key is not present', async () => {
    const config = {}
    const store = createStoreInternal(config, state, setState)

    const defaultValue = 'a test value'
    const value = store.get('a not present key', defaultValue)
    expect(value).toBe(defaultValue)
  })

  it('should remove a vaue from the store', async () => {
    const config = {}
    const store = createStoreInternal(config, state, setState)

    store.remove('test')
    expect(state.test).toBe(undefined)
  })

  it('should remove a vaue from the store and log it', async () => {
    const config = { logging: true }
    const store = createStoreInternal(config, state, setState)

    store.remove('test')
    expect(state.test).toBe(undefined)
  })

  it('should get the store state', async () => {
    const config = { logging: true }
    const store = createStoreInternal(config, state, setState)

    const storeState = store.getState()
    expect(storeState).toStrictEqual(state)
  })
})

describe('Proxy Store test', () => {
  let state
  let setState
  beforeEach(() => {
    // setup a DOM element as a render target
    state = { test: 'test value' }
    setState = newState => {
      state = newState
    }
  })

  afterEach(() => {
    // cleanup on exiting
    state = null
  })

  it('should create the store as a Proxy', () => {
    const config = {}
    const store = createStoreInternal(config, state, setState)

    store.set = 'this assignment will fail'
    store.get = 'this assignment will fail'

    expect(typeof store.set).toBe('function')
    expect(typeof store.get).toBe('function')
  })

  it('should create the store NOT as a Proxy', () => {
    const config = { proxyStore: false }
    const store = createStoreInternal(config, state, setState)

    const value = 'this assignment will fail'
    store.set = value
    store.get = value

    expect(store.set).toBe(value)
    expect(store.get).toBe(value)
  })
})
