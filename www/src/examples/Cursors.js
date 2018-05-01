import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'
import Sidebar from 'components/Sidebar'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Cursor, Area } from 'react-charts'

let sourceCode

class Story extends Component {
  render () {
    return (
      <Sidebar>
        <ChartConfig>
          {({ data }) => (
            // @source sourceCode
            <Chart data={data}>
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" stacked cursor={{}} />
              <Series type={Area} />
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
  }
}

export default () => <Story />
