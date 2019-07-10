import React from 'react'
import App, { Container } from 'next/app'
import styled, { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
//
import 'react-resizable/css/styles.css'
import '../src/styles.css'

import Sidebar from 'components/Sidebar'

if (typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect
}

const GlobalStyles = createGlobalStyle`
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
    background: rgba(0,0,0,.03);
    border: 2px solid rgba(0,0,0,.1);
    padding: 1rem;
  }
}
`

const AppStyles = styled('div')`
  min-height: 100vh;
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>React Charts Examples</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <GlobalStyles />
        <AppStyles>
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        </AppStyles>
      </Container>
    )
  }
}
