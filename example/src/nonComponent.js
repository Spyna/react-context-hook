import { rawStore } from 'react-context-hook'

export default function() {
  rawStore.set('count', 25).then(() => {
    console.log(`I modified the store, and I'm not a React component`)
  })
  rawStore.set('pippo', 25)
}
