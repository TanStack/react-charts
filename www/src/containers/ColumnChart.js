import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Cursor, Bar } from '../../../dist'

export default () => (
  <ChartConfig dataType="ordinal">
    {({ data }) => (
      <Chart
        data={data}
        type="bar"
        axes={[
          { primary: true, type: 'ordinal', position: 'bottom' },
          { position: 'left', type: 'linear', stacked: true },
        ]}
        primaryCursor
        secondaryCursor
        tooltip
      />
    )}
  </ChartConfig>
)
