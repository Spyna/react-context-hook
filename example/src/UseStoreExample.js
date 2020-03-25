import React from 'react'
import { useStore } from 'react-context-hook'

export default function () {
  const [price, setPrice, deletePrice] = useStore('price')
  return (
    <section>
      <h3>
        Set/Remove the key<code>price</code> with the value of{' '}
        <code>99.9 $</code>
      </h3>
      <pre>
        <code>{price}</code>
      </pre>
      <button onClick={() => setPrice('99.9 $')}>set price in store</button>
      <button onClick={() => deletePrice()}>remove prce from store</button>
    </section>
  )
}
