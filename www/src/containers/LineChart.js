import React from 'react'

//

import ChartConfig from 'components/ChartConfig'
import { Chart } from '../../../dist'

export default () => (
  <div>
    <ChartConfig series={10}>
      {({ data }) => (
        <Chart
          type="line"
          data={data}
          axes={[
            { primary: true, type: 'time', position: 'bottom' },
            { type: 'linear', position: 'left' },
          ]}
          primaryCursor
          secondaryCursor
          tooltip
        />
      )}
    </ChartConfig>
  </div>
)
