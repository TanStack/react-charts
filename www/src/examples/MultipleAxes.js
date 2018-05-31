import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Cursor, Line } from '../../../src'

let sourceCode

export default () => (
  <Sidebar>
    <ChartConfig dataType="time">
      {({ data }) => (
        // @source sourceCode
        <Chart
          data={data}
          getSeries={data =>
            data.map(
              (d, i) =>
                i % 3 === 0
                  ? {
                      ...d,
                      secondaryAxisID: 'First Metric',
                    }
                  : i % 2 === 0
                    ? {
                        ...d,
                        datums: d.datums.map(f => ({
                          ...f,
                          y: f.y * 5,
                        })),
                        secondaryAxisID: 'Second Metric',
                      }
                    : {
                        ...d,
                        datums: d.datums.map(f => ({
                          ...f,
                          y: f.y * 10,
                        })),
                        secondaryAxisID: 'Third Metric',
                      }
            )
          }
        >
          <Axis primary type="time" />
          <Axis type="linear" id="First Metric" min={0} position="left" />
          <Axis type="linear" id="Second Metric" min={0} position="right" />
          <Axis type="linear" id="Third Metric" min={0} position="right" show={false} />
          <Series type={Line} />
          <Cursor primary />
          <Cursor />
          <Tooltip />
        </Chart>
        // @source sourceCode
      )}
    </ChartConfig>
    <Code source={sourceCode} />
  </Sidebar>
)
