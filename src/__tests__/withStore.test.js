import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { withStore } from '../withStore'

function App() {
  return <div>hello</div>
}

describe('Create Store test', () => {
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })
  let container = null

  it('should create a HOC and inject the store', () => {
    const WithStore = withStore(App)

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe('hello')
  })
})
