import React from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default () => (
  <ChartConfig useR dataType="linear">
    {({ data }) => (
      <Chart
        data={data}
        type="bubble"
        axes={[
          { primary: true, position: 'bottom', type: 'linear' },
          { position: 'left', type: 'linear' },
        ]}
        primaryCursor
        secondaryCursor
        tooltip
      />
    )}
  </ChartConfig>
)
