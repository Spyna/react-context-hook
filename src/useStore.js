import { useContext } from 'react'
import StoreContext from './StoreContext'

function getStore() {
  return useContext(StoreContext)
}

function useStore(key, defaultValue, createIfMissing) {
  const store = getStore()
  const actualValue = store.get(key)
  if (actualValue === undefined && createIfMissing) {
    store.set(key, defaultValue)
  }
  const setObject = useSetStoreValue(key)
  const deleteObject = useDeleteStoreValue(key)
  const object = useStoreValue(key, defaultValue)

  return [object, setObject, deleteObject]
}

function useStoreState() {
  return getStore().getState()
}

function useSetStoreValue(key) {
  const store = getStore()
  return value => store.set(key, value)
}

function useDeleteStoreValue(key) {
  const store = getStore()
  return () => store.remove(key)
}

function useGetAndset(key) {
  return [useStoreValue(key), useSetStoreValue(key)]
}

function useGetAndDelete(key) {
  return [useStoreValue(key), useDeleteStoreValue(key)]
}
function useSetAndDelete(key) {
  return [useSetStoreValue(key), useDeleteStoreValue(key)]
}

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
