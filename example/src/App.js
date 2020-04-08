import React from 'react'
import { withStore } from 'react-context-hook'
import Header from './layout/Header'
import SetAmount from './SetAmountExample'
import SetUsernameExample from './SetUsernameExample'
import './App.css'
import SetObjectExample from './SetObjectExample'
import UseStoreExample from './UseStoreExample'
import UseSetAndDeleteExample from './UseSetAndDeleteExample'
import Description from './Description'

function App() {
  return (
    <div>
      <Header />
      <main className="App">
        <Description />
        <SetAmount />
        <SetUsernameExample />
        <SetObjectExample />
        <UseStoreExample />
        <UseSetAndDeleteExample />
      </main>
    </div>
  )
}

const initialState = { count: 10 }

const storeConfig = {
  listener: (state) => {
    console.log('state changed', state)
  },
  logging: true //process.env.NODE_ENV !== 'production'
}

export default withStore(App, initialState, storeConfig)
