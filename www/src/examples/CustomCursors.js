import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'
import Sidebar from 'components/Sidebar'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Cursor, Area } from '../../../src'

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
              <Axis type="linear" position="left" stacked />
              <Series type={Area} />
              <Cursor primary snap>
                {props => (
                  <span>
                    <span role="img" aria-label="icon">
                      🕑
                    </span>
                    {props.label}
                  </span>
                )}
              </Cursor>
              <Cursor snap>
                {props => (
                  <span>
                    <span role="img" aria-label="icon">
                      👍
                    </span>
                    {props.label}
                  </span>
                )}
              </Cursor>
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
