import React from 'react'

export const useFlashWhenRender = () => {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current.classList.toggle('flash')
    setTimeout(() => ref.current && ref.current.classList.toggle('flash'), 100)
  })
  return ref
}
