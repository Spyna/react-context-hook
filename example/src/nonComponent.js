import { store } from 'react-context-hook'

export default function () {
  store.set('count', 25).then(() => {
    console.log(`I modified the store, and I'm not a React component`)
  })
  store.set('pippo', 25)
}
