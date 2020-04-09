import React from 'react'
import { useStoreState } from 'react-context-hook'
import { useFlashWhenRender } from './utils/useFlash'

export default function Description() {
  const globalState = useStoreState()
  return (
    <section ref={useFlashWhenRender()}>
      <h3>
        This is a React App that has a global state. This is the value of the
        global <em>state</em>.
      </h3>
      <pre>
        <code id="global-state">{JSON.stringify(globalState, null, ' ')}</code>
      </pre>
      <p>
        You can change the global state from different components, using the
        buttons you find in this page
      </p>
      <p>Every time a component renders, it flashes. </p>
    </section>
  )
}
