import React from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default () => (
  <ChartConfig dataType="ordinal" width={300} height={300}>
    {({ data }) => <Chart data={data} type="pie" tooltip />}
  </ChartConfig>
)
