import React from 'react'
import { withStore, useStoreState } from 'react-context-hook'
import Header from './layout/Header'
import SetAmount from './SetAmountExample'
import SetUsername from './SetUsername'
import nonComponent from './nonComponentExample'
import './App.css'
import SetObjectExample from './SetObjectExample'
import UseStoreExample from './UseStoreExample'
import UseSetAndDeleteExample from './UseSetAndDeleteExample'
import Description from './Description'

function App() {
  return (
    <div className="App">
      <Header/>
      <Description />
      
      <SetAmount />
      <SetUsername />
      <SetObjectExample />
      <UseStoreExample />
      <UseSetAndDeleteExample />
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
