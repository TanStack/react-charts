import React from 'react'

//

import Box from 'components/Box'

import { Chart } from '../../../dist'

export default () => (
  <Box dataType="ordinal" width={300} height={300}>
    {({ data }) => <Chart data={data} type="pie" tooltip />}
  </Box>
)
