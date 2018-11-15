import React from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default () => (
  <ChartConfig dataType="ordinal">
    {({ data }) => (
      <Chart
        data={data}
        series={{ type: 'bar' }}
        axes={[
          { primary: true, type: 'ordinal', position: 'left' },
          { position: 'bottom', type: 'linear', stacked: true },
        ]}
        primaryCursor
        secondaryCursor
        tooltip
      />
    )}
  </ChartConfig>
)
