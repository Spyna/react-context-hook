import React, { useEffect } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { withStore } from './withStore'
import {
  useStore,
  useStoreState,
  useSetAndDelete,
  useStoreValue,
  useGetAndset,
  useGetAndDelete,
  useSetStoreValue
} from './useStore'

describe('Use Store test', () => {
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
    WithStore = null
  })
  let container = null
  let WithStore = null

  it('should use the useStore hook ', () => {
    function App() {
      const [value] = useStore('username')
      return <div>{value}</div>
    }
    WithStore = withStore(App)

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe('')
  })

  it('should create the value when the createIfMissing option is used ', () => {
    function App() {
      const [value] = useStore('username', 'test', true)
      return <div>{value}</div>
    }
    WithStore = withStore(App)

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe('test')
  })

  it('should set a value in the store', () => {
    function App() {
      const [value, setValue] = useStore('username')
      return (
        <div>
          <div id="content">{value}</div>
          <button id="the-button" onClick={() => setValue('test-value')}>
            chenge store
          </button>
        </div>
      )
    }
    WithStore = withStore(App)

    act(() => {
      render(<WithStore />, container)
    })
    expect(document.querySelector('#content').textContent).toBe('')

    const button = document.querySelector('#the-button')
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(document.querySelector('#content').textContent).toBe('test-value')
  })

  it('should remove a value in the store', () => {
    function App() {
      const [value, setValue, deleteValue] = useStore('username')
      useEffect(() => {
        setValue('test-value')
      }, [])
      return (
        <div>
          <div id="content">{value}</div>
          <button id="the-button" onClick={() => deleteValue()}>
            chenge store
          </button>
        </div>
      )
    }
    WithStore = withStore(App)

    act(() => {
      render(<WithStore />, container)
    })
    expect(document.querySelector('#content').textContent).toBe('test-value')

    const button = document.querySelector('#the-button')
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(document.querySelector('#content').textContent).toBe('')
  })

  it('should use the useSetAndDelete hook', () => {
    function App() {
      const [setValue, deleteValue] = useSetAndDelete('username')
      const value = useStoreValue('username')
      useEffect(() => {
        setValue('test-value')
      }, [])
      return (
        <div>
          <div id="content">{value}</div>
          <button id="the-button" onClick={() => deleteValue()}>
            chenge store
          </button>
        </div>
      )
    }
    WithStore = withStore(App)

    act(() => {
      render(<WithStore />, container)
    })
    expect(document.querySelector('#content').textContent).toBe('test-value')

    const button = document.querySelector('#the-button')
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(document.querySelector('#content').textContent).toBe('')
  })

  it('should use the useGetAndDelete hook', () => {
    function App() {
      const [value, deleteValue] = useGetAndDelete('username')
      const setValue = useSetStoreValue('username')
      useEffect(() => {
        setValue('test-value')
      }, [])
      return (
        <div>
          <div id="content">{value}</div>
          <button id="the-button" onClick={() => deleteValue()}>
            chenge store
          </button>
        </div>
      )
    }
    WithStore = withStore(App)

    act(() => {
      render(<WithStore />, container)
    })
    expect(document.querySelector('#content').textContent).toBe('test-value')

    const button = document.querySelector('#the-button')
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(document.querySelector('#content').textContent).toBe('')
  })

  it('should use the useGetAndset hook', () => {
    function App() {
      const [value, setValue] = useGetAndset('username')
      useEffect(() => {
        setValue('test-value')
      }, [])
      return (
        <div>
          <div id="content">{value}</div>
        </div>
      )
    }
    WithStore = withStore(App)

    act(() => {
      render(<WithStore />, container)
    })
    expect(document.querySelector('#content').textContent).toBe('test-value')
  })

  it('should get the store state', () => {
    function App() {
      const globalState = useStoreState()
      return <div>{JSON.stringify(globalState)}</div>
    }
    const state = { test: true, key: 'a value' }
    WithStore = withStore(App, state)

    act(() => {
      render(<WithStore />, container)
    })
    expect(container.textContent).toBe(JSON.stringify(state))
  })
})
