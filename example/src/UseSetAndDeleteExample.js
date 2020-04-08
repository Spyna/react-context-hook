import React from 'react'
import { useSetAndDelete } from 'react-context-hook'
import { useFlashWhenRender } from './utils/useFlash'

export default function UseSetAndDeleteExample() {
  const [setValue, deleteValue] = useSetAndDelete('a-sample-key')
  return (
    <section ref={useFlashWhenRender()}>
      <h3>
        Set/Remove the key<code>'a-sample-key'</code> with the value{' '}
        <code>'the value'</code>
      </h3>
      <button onClick={() => setValue('the value')}>
        set 'a-sample-key' in store
      </button>
      <button onClick={() => deleteValue()}>
        remove 'a-sample-key' from store
      </button>
    </section>
  )
}
