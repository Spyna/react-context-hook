import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import App from './App'

let container = null
let expectedState
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  expectedState = JSON.stringify(
    { count: 10, logIn: false, counter: 0, nullValue: null },
    null,
    ' '
  )
})

afterEach(async () => {
  await unmountComponentAtNode(container)
  container.remove()
  container = null
  expectedState = null
})

it('renders the main page with the links', () => {
  act(() => {
    render(<App />, container)
  })
  const links = Array.from(container.querySelectorAll('a'))
  expect(links[0].href).toBe('http://localhost/docs')
  expect(links[1].href).toBe('https://github.com/Spyna/react-context-hook')
})

it('loads and display the initial state', () => {
  act(() => {
    render(<App />, container)
  })

  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )
})

it('decrements 5 times the counter', async () => {
  act(() => {
    render(<App />, container)
  })

  const button = document.querySelector('#decrement')
  await act(async () => {
    for (let i = 0; i < 5; i++) {
      await button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    }
  })
  const expectedState = JSON.stringify(
    { count: 5, logIn: false, counter: 0, nullValue: null },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )
})

it('increments 5 times the counter', async () => {
  act(() => {
    render(<App />, container)
  })

  let expectedState = JSON.stringify(
    { count: 5, logIn: false, counter: 0, nullValue: null },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )

  const button = document.querySelector('#increment')
  await act(async () => {
    for (let i = 0; i < 5; i++) {
      await button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    }
  })
  expectedState = JSON.stringify(
    { count: 10, logIn: false, counter: 0, nullValue: null },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )
})

it('removes the value "count" form the state', async () => {
  act(() => {
    render(<App />, container)
  })

  let expectedState = JSON.stringify(
    { count: 10, logIn: false, counter: 0, nullValue: null },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )

  const button = document.querySelector('#delete-count')
  await act(async () => {
    await button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expectedState = JSON.stringify(
    { logIn: false, counter: 0, nullValue: null },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )
})

it('sets the key "username" form the state', async () => {
  act(() => {
    render(<App />, container)
  })

  let expectedState = JSON.stringify(
    { logIn: false, counter: 0, nullValue: null },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )

  const button = document.querySelector('#set-username')
  await act(async () => {
    await button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expectedState = JSON.stringify(
    { logIn: false, counter: 0, nullValue: null, username: 'spyna' },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )
})

it('sets and delete the key "a-sample-key" form the state', async () => {
  act(() => {
    render(<App />, container)
  })

  let expectedState = JSON.stringify(
    { logIn: false, counter: 0, nullValue: null, username: 'spyna' },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )

  let button = document.querySelector('#set-a-value')
  await act(async () => {
    await button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expectedState = JSON.stringify(
    {
      logIn: false,
      counter: 0,
      nullValue: null,
      username: 'spyna',
      'a-sample-key': 'the value'
    },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )
  button = document.querySelector('#delete-a-value')
  await act(async () => {
    await button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expectedState = JSON.stringify(
    { logIn: false, counter: 0, nullValue: null, username: 'spyna' },
    null,
    ' '
  )
  expect(container.querySelector('#global-state').textContent).toBe(
    expectedState
  )
})
