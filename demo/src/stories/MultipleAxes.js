import React from 'react'

//

import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Line, Bar } from '../../../src'

export default () => (
  <ChartConfig dataType="ordinal">
    {({ data }) => (
      <Chart
        data={data}
        getSeries={data =>
          data.map((d, i) => ({
            ...d,
            scaleID: i % 2,
          }))
        }
      >
        <Axis primary type="ordinal" />
        <Axis type="linear" id="0" min={0} position="left" />
        <Axis type="linear" id="1" min={0} position="right" />
        <Series type={(s, i) => (i % 2 ? Bar : Line)} />
        <Tooltip />
      </Chart>
    )}
  </ChartConfig>
)
