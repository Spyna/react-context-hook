import { useContext, useReducer, useMemo, useRef, useEffect } from 'react'
import StoreContext from './StoreContext'
import Subscription from './redux/util/Subscription'
import { setStoreValueAction, deleteStoreValueAction } from './redux/actions'

function equalityFn(a, b) {
  return a === b
}

function useSelector(stateSelectorFn) {
  const [, forceRender] = useReducer((s) => s + 1, 0)
  const { store } = useContext(StoreContext)
  const latestStateSelectorFn = useRef()
  const latestSelectedState = useRef()
  function checkForUpdates() {
    try {
      const newSelectedState = latestStateSelectorFn.current(
        store.getState().main
      )

      if (equalityFn(newSelectedState, latestSelectedState.current)) {
        return
      }

      latestSelectedState.current = newSelectedState
    } catch (err) {
      // ignore all errors
    }

    forceRender({})
  }
  const subscription = useMemo(() => new Subscription(store, checkForUpdates), [
    store,
    checkForUpdates
  ])

  let resultValue

  if (stateSelectorFn !== latestStateSelectorFn.current) {
    resultValue = stateSelectorFn(store.getState().main)
  } else {
    resultValue = latestSelectedState.current
  }

  useEffect(() => {
    latestStateSelectorFn.current = stateSelectorFn
    latestSelectedState.current = resultValue
  })

  useEffect(() => {
    subscription.subscribe()
    checkForUpdates()

    return () => subscription.unsubscribe()
  }, [store, subscription])

  return resultValue
}

/**
 * `useStore` is a React Hook that access a value stored in the application global store. It returns the value, a function to update it (like React.useState) and a function to delete it.
 *
 * @template {any} T
 * @param {string} key - The lookup key to find the saved value in the store
 * @param {T} [defaultValue] - The value if the value in the store is missing
 *
 * @returns {[T, (value: T) => void, () => void]}
 * @return {array} an array with length 3:<br>
 * position 0 - the value of the data in the store.<br>
 * position 1 - a function *setValue* to modify the data in the store.<br>
 * position 2 - a function *deleteValue* to delete the value from the store.<br>
 *
 * @example
 * import {useStore} from 'react-context-hook'
 * const [username, setUsername, deleteUsername] = useStore('username')
 * <div>hello {username}</div>
 * <button onClick={()=> setUsername('my_username')}>set username</button>
 *
 */
function useStore(key, defaultValue) {
  return [
    useStoreValue(key, defaultValue),
    useSetStoreValue(key),
    useDeleteStoreValue(key)
  ]
}

/**
 * Returns a function to set or update a variable in the store. You want to use this hook when you just need to modify the store, not read or delete a value from it.
 * @template {any} T
 * @param {string} key - the name of the variable to set in the store
 * @returns {(value: T) => void}
 * @return {Function} - a function to set a variable in the store with the given name<br>
 *
 * @example
 * import {useSetStoreValue} from 'react-context-hook'
 * const setUsername = useSetStoreValue('username')
 * <button onClick={()=> setUsername('my_username')}>set username</button>
 */
function useSetStoreValue(key) {
  const { store } = useContext(StoreContext)
  return function (value) {
    store.dispatch(setStoreValueAction(key, value))
  }
}

/**
 * Returns a function to delete a variable in the store. You want to use this hook when you just need to delete a value in the store, not read or set a value from it.
 * @template {any} T
 * @param {string} key - the name of the variable to set in the store
 * @returns {(value: T) => void}
 * @return {Function} - a function to delete a variable in the store with the given name.
 *
 * @example
 * import {useDeleteStoreValue} from 'react-context-hook'
 * const deleteUsername = useDeleteStoreValue('username')
 * <button onClick={()=> deleteUsername()}>set username</button>
 */
function useDeleteStoreValue(key) {
  const { store } = useContext(StoreContext)
  return function () {
    store.dispatch(deleteStoreValueAction(key))
  }
}

/**
 *This React hook returns an array to read and modify a value in the store:
 * `const [value, setValue] = useGetAndSet('a_lookup_key_in_the_store')`. The name of the variable in the arry is arbitrary and you can choose any string you like.
 * @template {any} T
 * @param {string} key - The lookup key to find the saved value in the store
 * @param {T} [defaultValue] - The default value if missing
 * @returns {[T, (value: T) => void]}
 * @return {array} an array with length 2:<br>
 * position 0 - the value of the data in the store.<br>
 * position 1 - a function *setValue* to modify the data in the store.<br>
 *
 * @example
 * import {useGetAndSet} from 'react-context-hook'
 * const [username, setUsername] = useGetAndSet('username')
 * <div>hello {username}</div>
 * <button onClick={()=> setUsername('my_username')}>set username</button>
 *
 *  const [value, setValue] = useGetAndSet('a_lookup_key_in_the_store')
 *
 */
function useGetAndSet(key, defaultValue) {
  return [useStoreValue(key, defaultValue), useSetStoreValue(key)]
}

/**
 *This React hook returns an array to read and delete a value in the store:
 * `const [value, deleteValue] = useGetAndDelete('a_lookup_key_in_the_store')`. The name of the variable in the arry is arbitrary and you can choose any string you like.
 * @template {any} T
 * @param {string} key - The lookup key to find the saved value in the store
 *
 * @returns {[T, (value: T) => void]}
 * @return {array} an array with length 2:<br>
 * position 0 - the value of the data in the store.<br>
 * position 1 - a function *deleteValue* to delete the data in the store.<br>
 *
 * @example
 * import {useGetAndDelete} from 'react-context-hook'
 * const [username, deleteUsername] = useGetAndDelete('username')
 * <div>hello {username}</div>
 * <button onClick={()=> deleteUsername('my_username')}>set username</button>
 *
 */
function useGetAndDelete(key) {
  return [useStoreValue(key), useDeleteStoreValue(key)]
}

/**
 *This React hook returns an array to set and delete a value in the store:
 * `const [setValue, deleteValue] = useGetAndDelete('a_lookup_key_in_the_store')`. The name of the variable in the arry is arbitrary and you can choose any string you like.
 * @template {any} T
 * @param {string} key - The lookup key to find the saved value in the store
 *
 * @returns {[(value: T) => void, () => void]}
 * @return {array} an array with length 2:<br>
 * position 0 - a function *setValue* to modify the data in the store.<br>
 * position 1 - a function *deleteValue* to delete the data in the store.<br>
 *
 * @example
 * import {useGetAndDelete} from 'react-context-hook'
 * const [username, deleteUsername] = useGetAndDelete('username')
 * <div>hello {username}</div>
 * <button onClick={()=> deleteUsername('my_username')}>set username</button>
 *
 */
function useSetAndDelete(key) {
  return [useSetStoreValue(key), useDeleteStoreValue(key)]
}

/**
 *
 * @template {any} T
 * @param {string} key - the name of the variable / value to be retrieved in the global store.
 * @param {T} [defaultValue] - an optional default value, if the value in the global store is not present.
 *
 * @returns {T | typeof defaultValue} the value on the global store, or the default value if passed, or `undefined`
 */
function useStoreValue(key, defaultValue) {
  function stateSelector(state) {
    return state[key]
  }
  const storeValue = useSelector(stateSelector)
  return storeValue !== undefined ? storeValue : defaultValue
}

/**
 * Returns the whole store value, with all the variables stored in it. Changes to this object will not change the store
 *
 * @returns {Record}
 * @return {object} - An object representing the whole store value in read only mode.
 *
 * @example
 * import {useStoreState} from 'react-context-hook'
 * const store = useStoreState()
 * console.log('the store is', JSON.stringify(store))
 */
function useStoreState() {
  function stateSelector(state) {
    return state
  }
  return useSelector(stateSelector)
}

export {
  useStore,
  useStoreState,
  useStoreValue,
  useSetStoreValue,
  useDeleteStoreValue,
  useGetAndSet,
  useGetAndDelete,
  useSetAndDelete
}
