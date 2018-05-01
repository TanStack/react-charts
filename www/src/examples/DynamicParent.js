import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Line, Cursor } from 'react-charts'

let sourceCode

export default () => (
  <Sidebar>
    <ChartConfig resizable={false}>
      {({ data }) => (
        // @source sourceCode
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
            <Chart data={data}>
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" />
              <Series type={Line} />
              <Cursor primary />
              <Cursor />
              <Tooltip />
            </Chart>
          </div>
        </div>
        // @source sourceCode
      )}
    </ChartConfig>
    <Code source={sourceCode} />
  </Sidebar>
)
