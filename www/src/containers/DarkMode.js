import React from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default () => (
  <ChartConfig
    style={{
      background: 'rgba(0, 27, 45, 0.9)',
      padding: '.5rem',
      borderRadius: '5px',
    }}
  >
    {({ data }) => (
      <Chart
        data={data}
        dark
        axes={[
          { primary: true, position: 'bottom', type: 'time' },
          { position: 'left', type: 'linear' },
        ]}
        primaryCursor
        secondaryCursor
        tooltip
      />
    )}
  </ChartConfig>
)
