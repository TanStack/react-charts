import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Line } from '../../../src'

export default () => (
  <ChartConfig dataType="ordinal">
    {({ data }) => (
      <Chart
        data={data}
        getSeries={data =>
          data.map(
            (d, i) =>
              i % 2 === 0
                ? {
                    ...d,
                    secondaryScaleID: 'First Metric',
                  }
                : {
                    ...d,
                    datums: d.datums.map(f => ({
                      ...f,
                      y: f.y * 5,
                    })),
                    secondaryScaleID: 'Second Metric',
                  }
          )
        }
      >
        <Axis primary type="ordinal" />
        <Axis type="linear" id="First Metric" min={0} position="left" />
        <Axis type="linear" id="Second Metric" min={0} position="right" />
        <Series type={Line} />
        <Tooltip />
      </Chart>
    )}
  </ChartConfig>
)
