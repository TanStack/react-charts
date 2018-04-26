import React, { Component } from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Line, Brush, Tooltip, Cursor } from '../../../src'

export default class extends Component {
  constructor () {
    super()
    this.state = {
      min: null,
      max: null,
    }
  }
  render () {
    const { min, max } = this.state

    return (
      <Sidebar>
        <div>
          <button
            onClick={() =>
              this.setState({
                min: null,
                max: null,
              })
            }
          >
            Reset Zoom
          </button>

          <br />
          <br />
          <ChartConfig dataType="time">
            {({ data }) => (
              <Chart data={data}>
                <Axis primary type="time" position="bottom" hardMin={min} hardMax={max} />
                <Axis type="linear" position="left" />
                <Series type={Line} />
                <Cursor primary />
                <Tooltip />
                <Brush
                  onSelect={brushData => {
                    this.setState({
                      min: Math.min(brushData.start, brushData.end),
                      max: Math.max(brushData.start, brushData.end),
                    })
                  }}
                />
                <Tooltip />
              </Chart>
            )}
          </ChartConfig>
        </div>
      </Sidebar>
    )
  }
}
