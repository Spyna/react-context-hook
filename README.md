# react-context-hook

> A React.js global state manager with Hooks and Context API

[![NPM](https://img.shields.io/npm/v/react-context-hook.svg)](https://www.npmjs.com/package/react-context-hook) 
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/react-context-hook)](https://bundlephobia.com/result?p=react-context-hook)

## Install

```bash
npm install --save react-context-hook
```

## Documentation

Read the documentation of `react-context-hook`: 

* [Documentation in HTML format](https://spyna.github.io/react-context-hook/docs/)

* [Documentation in Github MarkDown](./DOCS.md)

## Usage

First, wrap your React App in the *Store Provider* using the function `withStore`. 

```JS
import { withStore} from 'react-context-hook'

export default withStore(App)
```

Next use the hook in your Components

```JS
import { useStore } from 'react-context-hook'

// const [count, setCount, deleteCount] = useStore('count', 0)

export default function () {
  const [count, setCount, deleteCount] = useStore('count', 0)
  return (
    <>
      <button onClick={() => setCount(count - 1)}>Decrement - </button>
      <span className="count">{count}</span>
      <button onClick={() => setCount(count + 1)}>Increment + </button>
      <button onClick={() => deleteCount()}>Delete "count" from store</button>
    </>
  )
}
```

### More hooks: 


 * withStore - [docs](./DOCS.md#withStore)
 * useStore - [docs](./DOCS.md#usestore)
 * useStoreState - [docs](./DOCS.md#usestorestate)
 * useSetStoreValue - [docs](./DOCS.md#usesetstorevalue)
 * useDeleteStoreValue - [docs](./DOCS.md#usedeletestorevalue)
 * GetAndSet - [docs](./DOCS.md#useGetAndSet)
 * GetAndDelete - [docs](./DOCS.md#usegetanddelete)
 * SetAndDelete - [docs](./DOCS.md#usesetanddelete)
 * StoreValue - [docs](./DOCS.md#usestorevalue)

### Advanced use of withStore

```JS
import { withStore} from 'react-context-hook'

const initialState = { count: 10 }

const storeConfig = {
  listener: (state, key, prevValue, nextValue) => {
      console.log(`the key "${key}" changed in the store`)
      console.log('the old value is', prevValue)
      console.log('the current value is', nextValue)
      console.log('the state is', state)
  },
  logging: true //process.env.NODE_ENV !== 'production'
}

export default withStore(App, initialState, storeConfig)
```

`withStore` creates a React *Context.Provider* which wrap your application the value of the Provider is the **store**. The **store** is similar to a [Javascript Map](https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Map) where you can put, read, and delete values by their key. 

For example `store.set('username',  {name: 'spyna', email: 'me@spyna.it'})` will set a `username` key in the store map. Then you can read, modify or delete it from the map using `store.get('username')` or `store.remove('username')`. 

The store is exported as `store` from *react-context-hook*, so you can use it in the Components. 
However for convenience, in React Components you can use the hooks exported from *react-context-hook*. 

## Using store outside of React components

`react-context-hook` exports a `store` object which can be used outside of React Components, but will affect the global state. This *object* has the following methods: 

* reset: a function to reset the store state to the specified value: Eg: `store.reset({initialValue: 0})`. 

This *store* is automatically initialized when you use the `withStore` function (`export default withStore(App)`). This means you can use it **only after** calling that function.

## License

MIT © [Spyna](https://github.com/Spyna)

[![Analytics](https://ga-beacon.appspot.com/UA-89584671-2/github/react-context-hook)](https://github.com/igrigorik/ga-beacon)
