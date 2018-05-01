import React, { PureComponent } from 'react'
import { Link } from 'react-static'
import Smackdown from 'react-smackdown'

//

import Syntax from 'utils/Syntax'

class Markdown extends PureComponent {
  render () {
    const { source } = this.props
    if (!source) {
      return null
    }
    const mdSource = `\`\`\`javascript
${source || ''}
\`\`\``
    console.log(mdSource)
    return <Smackdown source={mdSource} syntax={Syntax} />
  }
}

export default Markdown
