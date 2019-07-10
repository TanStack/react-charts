import React from 'react'
import { PrismLight } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/tomorrow'

PrismLight.registerLanguage('javascript', jsx)

export default function SyntaxHighlighter({ code }) {
  return (
    <PrismLight language="javascript" style={theme}>
      {code}
    </PrismLight>
  )
}
