import React, { PureComponent } from 'react'
import { Link } from 'react-static'
import Smackdown from 'react-smackdown'

//

import Syntax from 'utils/Syntax'

const renderers = {
  a: ({ href = '', ...rest }) => {
    const to = href.startsWith('/') ? href.replace('.md', '') : href
    return <Link to={to} {...rest} />
  },
  code: ({ children }) => <code className="code-inline">{children}</code>,
}

class Markdown extends PureComponent {
  render () {
    const { source } = this.props
    return <Smackdown source={source} syntax={Syntax} renderers={renderers} />
  }
}

export default Markdown
