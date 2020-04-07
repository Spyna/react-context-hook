import React from 'react'
import { useStoreState } from 'react-context-hook'
import nonComponentExample from './nonComponentExample'

export default function Description() {
  const globalState = useStoreState()
  return (
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
        <button onClick={() => nonComponentExample()}>Modify the store</button> from a{' '}
        <em>NON Component</em> Object or function.
      </p>
    </section>
  )
}
