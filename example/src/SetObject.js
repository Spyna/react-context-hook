import React from 'react'
import {
  useStoreValue,
  useSetStoreValue,
  useDeleteStoreValue
} from 'react-context-hook'

const storeKey = 'login.logged_user'

export default function () {
  const defaultValue = {
    name: 'My name',
    surname: ' surname',
    access_token: {
      type: 'Bearer',
      token: 'd293LCB5b3UgYXJlIHZlcnkgY3VyaW91cyEgZ29vZCBmb3IgeW91',
      expires_in: 3600
    }
  }
  const object = useStoreValue(storeKey, defaultValue)
  const setObject = useSetStoreValue(storeKey)
  const deleteObject = useDeleteStoreValue(storeKey)
  return (
    <section>
      <h3>
        Set/Remove this object in the store with the key <code>{storeKey}</code>
      </h3>
      <pre>
        <code>{JSON.stringify(object, null, ' ')}</code>
      </pre>
      <button onClick={() => setObject(object)}>set Object in store</button>
      <button onClick={() => deleteObject()}>remove Object from store</button>
    </section>
  )
}
