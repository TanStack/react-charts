import React from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default () => (
  <ChartConfig dataType="time">
    {({ data }) => (
      <Chart
        data={data}
        series={{ type: 'area' }}
        axes={[
          { primary: true, position: 'bottom', type: 'time' },
          { position: 'left', type: 'linear', stacked: true },
        ]}
        primaryCursor
        secondaryCursor
        tooltip
      />
    )}
  </ChartConfig>
)
