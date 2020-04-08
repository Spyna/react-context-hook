import React from 'react'
import { useStore } from 'react-context-hook'
import { useFlashWhenRender } from './utils/useFlash'

export default function SetUsernameExample() {
  const [username, setUsername] = useStore('username', 'spyna', false)
  const [textValue, setTextValue] = React.useState(username)
  function onChange(event) {
    setTextValue(event.target.value)
  }

  function onSubmit(event) {
    event.preventDefault()
    setUsername(textValue)
  }

  return (
    <section ref={useFlashWhenRender()}>
      <h3>
        Set the value <em>"username"</em> in the store
      </h3>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={textValue}
          placeholder="type your username"
        />
        <button>Change value in store</button>
      </form>
    </section>
  )
}
