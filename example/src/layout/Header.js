import React from 'react'

export default ({title, subtitle}) => (
  <header className="App-header">
    <nav>
      <ul>
        <li>
          <a href="docs">Documentation</a>
        </li>

        <li>
          <a href="https://github.com/Spyna/react-context-hook">
            GitHub source code
          </a>
        </li>
      </ul>
    </nav>
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  </header>
)
