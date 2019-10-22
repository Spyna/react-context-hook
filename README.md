# react-context-hook

> A React.js global state manager with Hooks and Context API

[![NPM](https://img.shields.io/npm/v/react-context-hook.svg)](https://www.npmjs.com/package/react-context-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-context-hook
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from 'react-context-hook'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [Spyna](https://github.com/Spyna)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
