const syntax = JSON.parse(process.env.SMACKDOWN_SYNTAX)

let theme
const languages = []

if (syntax.theme) {
  if (syntax.highlighter === 'prism') {
    // eslint-disable-next-line
    theme = require(`react-syntax-highlighter/dist/styles/prism/${syntax.theme}`).default
  } else {
    // eslint-disable-next-line
    theme = require(`react-syntax-highlighter/dist/styles/hljs/${syntax.theme}`).default
  }
}

if (syntax.languages) {
  syntax.languages.forEach(name =>
    languages.push({
      name,
      // eslint-disable-next-line
      syntax: require(`react-syntax-highlighter/dist/languages/${syntax.highlighter}/${name}`)
        .default,
    })
  )
}

export default {
  ...syntax,
  languages,
  theme,
  lineNumberStyle: { opacity: 0.5 },
}
