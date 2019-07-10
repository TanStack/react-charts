// @source sourceCode
import React from 'react'

//

import Box from 'components/Box'
import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from '../../../dist'

let sourceCode

export default () => (
  <>
    <Box dataType="ordinal" width={300} height={300}>
      {({ data }) => <Chart data={data} type="pie" tooltip />}
    </Box>
    <br />
    <SyntaxHighlighter code={sourceCode} />
  </>
)
// @source sourceCode
