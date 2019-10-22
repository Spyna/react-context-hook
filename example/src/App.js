import React from 'react'
import { createStore, useStoreState } from 'react-context-hook'
import SetAmount from './SetAmount'
import SetString from './SetString'
import nonComponent from './nonComponent'
import './App.css'
import SetObject from './SetObject'
import UseStoreExample from './UseStoreExample'
import UseSetAndDeleteExample from './UseSetAndDeleteExample'

function App({ title, subtitle }) {
  const globalState = useStoreState()
  return (
    <div className="App">
      <header className="App-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>
      <section>
        <h3>
          This is a React App that has a global state. This is the global{' '}
          <em>store</em> value.
        </h3>
        <pre>
          <code>{JSON.stringify(globalState, null, ' ')}</code>
        </pre>
        <h4>
          You can change the global state from different components, using the
          buttons you find in this page
        </h4>
        <p>
          Uh, you can event
          <button onClick={() => nonComponent()}>Modify the store</button> from
          a <em>NON Component</em> Object or function.
        </p>
      </section>
      <SetAmount />
      <SetString />
      <SetObject />
      <UseStoreExample />
      <UseSetAndDeleteExample />
    </div>
  )
}

const initialState = { count: 10 }

const storeConfig = {
  listener: state => {
    console.log('state changed', state)
  },
  logging: true //process.env.NODE_ENV !== 'production'
}

export default createStore(App, initialState, storeConfig)
