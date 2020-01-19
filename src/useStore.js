import { useContext } from 'react'
import StoreContext from './StoreContext'

function getStore() {
  return useContext(StoreContext)
}

/**
 *
 * @param {string} key - The lookup key to find the saved value in the store
 * @param {any} defaultValue - The value if the value in the store is missing
 * @param {boolean} createIfMissing - if true and the data is missing it will be created in the store
 *
 * @returns {array} an array with length 3:<br>
 * position 0 - the value of the data in the store.<br>
 * position 1 - a function *setValue* to modify the data in the store. When used, this function return a promise that resolve nothing, thus you can use `setValue('a value').then(() => {doSomething() //when the store did update})`<br>
 * position 2 - a function *deleteValue* to delete the value from the store. When used, this function return a promise that resolve nothing, thus you can use `deleteValue('a value').then(() => {doSomething() //when the store did update})`
 *
 * @example
 * import {useStore} from 'react-context-hook'
 * const [username, setUsername, deleteUsername] = useStore('username')
 * <div>hello {username}</div>
 * <button onClick={()=> setUsername('my_username')}>set username</button>
 *
 */
function useStore(key, defaultValue, createIfMissing) {
  const store = getStore()
  const actualValue = store.get(key)
  if (actualValue === undefined && createIfMissing) {
    store.set(key, defaultValue)
  }
  const setValue = useSetStoreValue(key)
  const deleteValue = useDeleteStoreValue(key)
  const value = useStoreValue(key, defaultValue)

  return [value, setValue, deleteValue]
}

/**
 * Returns the whole store value, with all the variables stored in it. Changes to this object will not change the store
 *
 * @returns {object} - An object representing the whole store value in read only mode.
 *
 * @example
 * import {useStoreState} from 'react-context-hook'
 * const store = useStoreState()
 * console.log('the store is', JSON.stringify(store))
 */
function useStoreState() {
  return getStore().getState()
}

/**
 * Returns a function to set or update a variable in the store. You want to use this hook when you just need to modify the store, not read or delete a value from it.
 * @param {string} key - the name of the variable to set in the store
 * @returns {Function} - a function to set a variable in the store with the given name When used, this function return a promise that resolve nothing, thus you can use `setValue('a value').then(() => {doSomething() //when the store did update})`
 *
 * @example
 * import {useSetStoreValue} from 'react-context-hook'
 * const setUsername = useSetStoreValue('username')
 * <button onClick={()=> setUsername('my_username')}>set username</button>
 */
function useSetStoreValue(key) {
  const store = getStore()
  return value => store.set(key, value)
}

/**
 * Returns a function to delete a variable in the store. You want to use this hook when you just need to delete a value in the store, not read or set a value from it.
 * @param {string} key - the name of the variable to set in the store
 * @returns {Function} - a function to delete a variable in the store with the given name. When used, this function return a promise that resolve nothing, thus you can use `deleteValue('a value').then(() => {doSomething() //when the store did update})`
 *
 * @example
 * import {useDeleteStoreValue} from 'react-context-hook'
 * const deleteUsername = useDeleteStoreValue('username')
 * <button onClick={()=> deleteUsername('my_username')}>set username</button>
 */
function useDeleteStoreValue(key) {
  const store = getStore()
  return () => store.remove(key)
}

/**
 *This React hook returns an array to read and modify a value in the store:
 * `const [value, setValue] = useGetAndset('a_lookup_key_in_the_store')`. The name of the variable in the arry is arbitrary and you can choose any string you like.
 * @param {string} key - The lookup key to find the saved value in the store
 * @param {any} defaultValue - The default value if missing
 * @returns {array} an array with length 2:<br>
 * position 0 - the value of the data in the store.<br>
 * position 1 - a function *setValue* to modify the data in the store. When used, this function return a promise that resolve nothing, thus you can use `setValue('a value').then(() => {doSomething() //when the store did update})`<br>
 *
 * @example
 * import {useGetAndset} from 'react-context-hook'
 * const [username, setUsername] = useGetAndset('username')
 * <div>hello {username}</div>
 * <button onClick={()=> setUsername('my_username')}>set username</button>
 *
 *  const [value, setValue] = useGetAndset('a_lookup_key_in_the_store')
 *
 */
function useGetAndset(key, defaultValue) {
  return [useStoreValue(key, defaultValue), useSetStoreValue(key)]
}

/**
 *This React hook returns an array to read and delete a value in the store:
 * `const [value, deleteValue] = useGetAndDelete('a_lookup_key_in_the_store')`. The name of the variable in the arry is arbitrary and you can choose any string you like.
 * @param {string} key - The lookup key to find the saved value in the store
 *
 * @returns {array} an array with length 2:<br>
 * position 0 - the value of the data in the store.<br>
 * position 1 - a function *deleteValue* to delete the data in the store. When used, this function return a promise that resolve nothing, thus you can use `deleteValue('a value').then(() => {doSomething() //when the store did update})`<br>
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
 * @param {string} key - The lookup key to find the saved value in the store
 *
 * @returns {array} an array with length 2:<br>
 * position 0 - a function *setValue* to modify the data in the store. When used, this function return a promise that resolve nothing, thus you can use `setValue('a value').then(() => {doSomething() //when the store did update})`<br>
 * position 1 - a function *deleteValue* to delete the data in the store. When used, this function return a promise that resolve nothing, thus you can use `deleteValue('a value').then(() => {doSomething() //when the store did update})`<br>
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
 * @param {string} key - the name of the variable / value to be retrieved in the global store.
 * @param {any} [defaultValue] - an optional default value, if the value in the global store is not present.
 *
 * @returns {any} the value on the global store, or the default value if passed, or `undefined`
 */
function useStoreValue(key, defaultValue) {
  return getStore().get(key, defaultValue)
}

export {
  useStore,
  useStoreState,
  useStoreValue,
  useSetStoreValue,
  useDeleteStoreValue,
  useGetAndset,
  useGetAndDelete,
  useSetAndDelete
}
