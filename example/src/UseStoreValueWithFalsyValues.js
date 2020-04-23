import React from 'react'
import { useStoreValue } from 'react-context-hook'
import { useFlashWhenRender } from './utils/useFlash'

export default function UseStoreValueWithFalsyValues() {
  const login = useStoreValue('logIn')
  const counter = useStoreValue('counter')
  const nullValue = useStoreValue('nullValue')
  return (
    <section ref={useFlashWhenRender()}>
      <h3>"Falsy" value are preserved</h3>
      <p>
        "logIn" value is: <code>{JSON.stringify(login)}</code>
      </p>
      <p>
        "counter" (not count) value is: <code>{JSON.stringify(counter)}</code>
      </p>
      <p>
        "nullValue" value is: <code>{JSON.stringify(nullValue)}</code>
      </p>
    </section>
  )
}
