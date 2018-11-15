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
          type="line"
          axes={[
            { primary: true, position: 'bottom', type: 'time' },
            { position: 'left', type: 'linear' },
          ]}
          primaryCursor
          secondaryCursor
          tooltip
          onSelect={info => {
            console.log(info)
          }}
        />
      )}
    </ChartConfig>
  </div>
)
