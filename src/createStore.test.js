import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { createStore } from './createStore'

function App() {
  return <div>hello</div>
}

describe('Create Store test', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })
  let container = null

  it('should create a HOC and inject the store', () => {
    const WithStore = createStore(App)

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe('hello')
  })
})
