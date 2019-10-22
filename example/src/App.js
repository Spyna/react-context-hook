import React from 'react'
import { useMyHook } from 'react-context-hook'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App