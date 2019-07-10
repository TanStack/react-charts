import { Light } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import theme from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark'

Light.registerLanguage('javascript', js)

export default function SyntaxHighlighter({ code }) {
  return (
    <Light language="javascript" style={theme}>
      {code}
    </Light>
  )
}
