import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { withStore, rawStore } from '../withStore'
import { useStoreValue } from '../useStore'

function App() {
  const name = useStoreValue('name')
  return <div>{name}</div>
}

describe('Use the raw store outside of a React Component', () => {
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

  it('should read the store value', () => {
    const WithStore = withStore(App, { name: 'pippo' })

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe('pippo')

    expect(rawStore.getState().name).toBe('pippo')
  })

  it('should update the store value', () => {
    const WithStore = withStore(App, { name: 'pippo' })

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe('pippo')

    act(() => {
      rawStore.set('name', 'pluto')
    })
    expect(container.textContent).toBe('pluto')
  })

  it('should delete the store value', () => {
    const WithStore = withStore(App, { name: 'pippo' })

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe('pippo')

    act(() => {
      rawStore.delete('name')
    })
    expect(container.textContent).toBe('')
  })

  it('should reset the store initial value', () => {
    const WithStore = withStore(App, { name: 'pippo' })

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe('pippo')

    act(() => {
      rawStore.reset({ name: 'pluto' })
    })
    expect(container.textContent).toBe('pluto')
  })

  it('should reset the store without a value', () => {
    const WithStore = withStore(App, { name: 'pippo' }, { logging: true })

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe('pippo')

    act(() => {
      rawStore.reset()
    })
    expect(container.textContent).toBe('')
  })
})
