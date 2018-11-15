import React from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default () => (
  <ChartConfig resizable={false}>
    {({ data }) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '12px',
          border: '2px solid black',
          height: '400px',
        }}
      >
        <div
          style={{
            flex: '0 0 auto',
            padding: '10px',
            border: '1px solid red',
          }}
        >
          Header
        </div>
        <div
          style={{
            flex: 2,
            border: '5px solid blue',
            maxHeight: '400px',
            margin: '10px',
          }}
        >
          <Chart
            data={data}
            axes={[
              { primary: true, position: 'bottom', type: 'time' },
              { position: 'left', type: 'linear' },
            ]}
            primaryCursor
            secondaryCursor
            tooltip
          />
        </div>
      </div>
    )}
  </ChartConfig>
)
