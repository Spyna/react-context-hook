# react-context-hook

> A React.js global state manager with Hooks and Context API

[![NPM](https://img.shields.io/npm/v/react-context-hook.svg)](https://www.npmjs.com/package/react-context-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-context-hook
```

## Documentation

Read the documentation of `react-context-hook`: 

* [Documentation in HTML format](https://spyna.github.io/react-context-hook/docs/)

* [Documentation in Github MarkDown](./DOCS.md)

## Usage

Wrap your React App in the store Provider using the function `createStore`. 

```JS
import { createStore} from 'react-context-hook'

const initialState = { count: 10 }

const storeConfig = {
  listener: state => {
    console.log('state changed', state)
  },
  logging: true //process.env.NODE_ENV !== 'production'
}

export default createStore(App, initialState, storeConfig)
```

`createStore` creates a React *Context.Provider* which wrap your application the value of the Provider is the **store**. The **store** is similar to a [Javascript Map](https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Map) where you can put, read, and delete values by their key. 

For example `store.set('username',  {name: 'spyna', email: 'me@spyna.it'})` will set a `username` key in the store map. Then you can read, modify or delete it from the map using `store.get('username')` or `store.remove('username')`. 

The store is exported as `store` from *react-context-hook*, so you can use it in the Components. 
However for convenience, in React Components you can use the hooks exported from *react-context-hook*. 

## Hooks

### createStore - [doc](./DOCS.md#createstore)
### useStore - [docs](./DOCS.md#usestore)
### useStoreState - [docs](./DOCS.md#usestorestate)
### useSetStoreValue - [docs](./DOCS.md#usesetstorevalue)
### useDeleteStoreValue - [docs](./DOCS.md#usedeletestorevalue)
### useGetAndset - [docs](./DOCS.md#usegetandset)
### useGetAndDelete - [docs](./DOCS.md#usegetanddelete)
### useSetAndDelete - [docs](./DOCS.md#usesetanddelete)
### useStoreValue - [docs](./DOCS.md#usestorevalue)


## License

MIT © [Spyna](https://github.com/Spyna)

[![Analytics](https://ga-beacon.appspot.com/UA-89584671-2/github/react-context-hook)](https://github.com/igrigorik/ga-beacon)
