import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Line } from 'react-charts'

let sourceCode

export default () => (
  <Sidebar>
    <ChartConfig dataType="ordinal">
      {({ data }) => (
        // @source sourceCode
        <Chart
          data={data}
          getSeries={data =>
            data.map(
              (d, i) =>
                i % 2 === 0
                  ? {
                      ...d,
                      secondaryAxisID: 'First Metric',
                    }
                  : {
                      ...d,
                      datums: d.datums.map(f => ({
                        ...f,
                        y: f.y * 5,
                      })),
                      secondaryAxisID: 'Second Metric',
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
        // @source sourceCode
      )}
    </ChartConfig>
    <Code source={sourceCode} />
  </Sidebar>
)
