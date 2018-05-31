import React from 'react'
import { Router, onLoading } from 'react-static'
import styled, { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import nprogress from 'nprogress'
import { loadLanguages } from 'reprism'

//
import Routes from 'react-static-routes'

import 'nprogress/nprogress.css'
import 'react-resizable/css/styles.css'
import 'react-smackdown/themes/smackdown-light.css'

import jsx from 'reprism/languages/jsx'
import bash from 'reprism/languages/bash'

loadLanguages(jsx, bash)

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-size: 16px;
    margin: 0;
    padding: 0;
    line-height: 1.5;
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

const AppStyles = styled.div`
  min-height: 100vh;
`

class App extends React.Component {
  componentDidMount () {
    onLoading(loading => {
      if (loading) {
        nprogress.start()
      } else {
        nprogress.done()
      }
    })
  }
  render () {
    return (
      <Router>
        <AppStyles>
          <Routes />
        </AppStyles>
      </Router>
    )
  }
}

export default hot(module)(App)
