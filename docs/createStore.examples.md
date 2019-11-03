
#createStore

```

const initialState = { count: 10 }

const storeConfig = {
  listener: state => {
    console.log('state changed', state)
  },
  logging: true //process.env.NODE_ENV !== 'production'
}

export default createStore(App, initialState, storeConfig)

```