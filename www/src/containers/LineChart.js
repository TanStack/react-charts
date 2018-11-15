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
          data={[
            {
              label: 'Series 1',
              data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]],
            },
            {
              label: 'Series 2',
              data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]],
            },
          ]}
          axes={[
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' },
          ]}
        />
      )}
    </ChartConfig>
  </div>
)
