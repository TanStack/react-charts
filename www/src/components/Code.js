import React, { PureComponent } from 'react'
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
    return <Smackdown source={mdSource} syntax={Syntax} />
  }
}

export default Markdown
