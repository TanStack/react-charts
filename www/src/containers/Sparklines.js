import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Line } from '../../../dist'

export default () => (
  <ChartConfig width={500} height={100}>
    {({ data }) => (
      <Chart
        data={data}
        axes={[
          {
            primary: true,
            position: 'bottom',
            type: 'time',
            show: false,
          },
          { position: 'left', type: 'linear', show: false },
        ]}
        primaryCursor
        secondaryCursor
        tooltip
      />
    )}
  </ChartConfig>
)
