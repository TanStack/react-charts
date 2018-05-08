import React, { PureComponent } from 'react'
import { Link } from 'react-static'
import { Markdown as Smackdown } from 'react-smackdown'

//

const renderers = {
  a: ({ href = '', ...rest }) => {
    const to = href.startsWith('/') ? href.replace('.md', '') : href
    return <Link to={to} {...rest} />
  },
  // code: ({ children }) => <code className="code-inline">{children}</code>,
}

class Markdown extends PureComponent {
  render () {
    const { source } = this.props
    return <Smackdown source={source} renderers={renderers} />
  }
}

export default Markdown
