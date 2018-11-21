import React from 'react'

//

import ChartConfig from 'components/ChartConfig'
import { Chart } from '../../../dist'

export default () => (
  <div>
    <ChartConfig series={10}>
      {({ data }) => (
        <Chart
          data={data}
          series={{
            showPoints: false,
          }}
          axes={[
            { primary: true, type: 'time', position: 'bottom' },
            { type: 'linear', position: 'left' },
          ]}
          tooltip
        />
      )}
    </ChartConfig>
  </div>
)
