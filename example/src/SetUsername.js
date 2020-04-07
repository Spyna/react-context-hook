import React from 'react'
import { useStore } from 'react-context-hook'

export default function SetUsername() {
  const [username, setUsername] = useStore('username', 'spyna', true)
  const [textValue, setTextValue] = React.useState(username)
  function onChange(event) {
    setTextValue(event.target.value)
  }

  function onSubmit(event) {
    event.preventDefault()
    setUsername(textValue)
  }

  return (
    <section>
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
