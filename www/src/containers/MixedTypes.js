import React from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default () => (
  <ChartConfig dataType="ordinal">
    {({ data }) => (
      <Chart
        data={data}
        type={(s, i) => (i % 2 ? 'bar' : 'line')}
        axes={[
          { primary: true, position: 'bottom', type: 'ordinal' },
          { position: 'left', type: 'linear', min: 0 },
        ]}
        primaryCursor
        secondaryCursor
        tooltip
      />
    )}
  </ChartConfig>
)
