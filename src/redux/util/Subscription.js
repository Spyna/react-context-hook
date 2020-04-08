class Subscription {
  constructor(store, onStateChange) {
    this.store = store
    // this.handleChangeWrapper = this.handleChangeWrapper.bind(this)
    this.unsuscribeFromSubscription = null
    this.onStateChange = onStateChange.bind(this)
  }

  subscribe() {
    this.unsuscribeFromSubscription = this.store.subscribe(this.onStateChange)
  }

  unsubscribe() {
    this.unsuscribeFromSubscription()
    this.unsuscribeFromSubscription = null
  }
}

export default Subscription
