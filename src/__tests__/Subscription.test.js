import Subscription from '../redux/util/Subscription'

describe('Subscription test', () => {
  let subscription = null

  let mockStore = {
    subscribe: () => {
      return jest.fn()
    }
  }

  beforeEach(() => {
    subscription = new Subscription(mockStore, () => {})
  })

  afterEach(() => {
    subscription = null
  })

  it('should create a HOC and inject the store', () => {
    subscription.subscribe()

    // expect(container.textContent).toBe('hello')
  })
})
