import React from 'react'
// import { hot, setConfig } from 'react-hot-loader'
import { Root } from 'react-static'
import styled, { injectGlobal } from 'react-emotion'
import { Router } from '@reach/router'
//
import 'react-resizable/css/styles.css'

import Home from 'containers/Home'
import Examples from 'containers/Examples'

// if (process.env.NODE_ENV === 'development') {
//   setConfig({
//     pureSFC: true,
//   })
// }

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-size: 16px;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    overflow-x: hidden;
  }
  * {
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
  #root {
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: #108db8;
  }

  img {
    max-width: 100%;
  }

  .react-resizable {
    max-width: 100%;
  }

  .react-resizable-handle {
    bottom: -10px;
    right: -10px;
  }

  pre, code {
    font-family: 'Roboto Mono', monospace;
    user-select: text;
  }

  pre {
    font-size: 13px;
    border-radius: 5px;
  }
}
`

const AppStyles = styled('div')`
  min-height: 100vh;
`

export function App () {
  return (
    <Root>
      <AppStyles>
        <Router>
          <Home path="/" />
          <Examples path="/examples/*" />
        </Router>
      </AppStyles>
    </Root>
  )
}

export default App
