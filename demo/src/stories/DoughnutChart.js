/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
import { Chart, Axis, Series, Tooltip, Pie } from '../../../src'

class Story extends Component {
  constructor () {
    super()
    this.state = {
      data: makeData(),
    }
  }
  render () {
    const { data } = this.state
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              data: makeData(),
            })
          }
        >
          Randomize Data
        </button>

        <br />
        <br />

        {_.range(1).map((d, i) => (
          <ResizableBox key={i} width={500} height={300}>
            <Chart data={data}>
              <Axis type="pie" />
              <Series type={Pie} showPoints={false} />
              <Tooltip />
            </Chart>
          </ResizableBox>
        ))}
      </div>
    )
  }
}

export default () => <Story />

function makeData () {
  return _.map(_.range(Math.max(Math.round(Math.random() * 8), 1)), () => makeSeries())
}
function makeSeries () {
  const startDate = new Date()
  // const length = Math.round(Math.random() * 30)
  const length = 8
  const max = 100
  // const max = Math.random() > 0.5 ? 100000 : 10
  // const multiplier = 10
  // const multiplier = Math.round((Math.random() * 10) + Math.round(Math.random() * 50))
  return _.map(_.range(length), d => ({
    // x: d * multiplier,
    x: new Date().setMinutes(startDate.getMinutes() + 30 * d),
    y: Math.round(Math.random() * max + Math.round(Math.random() * 50)),
    r: Math.round(Math.random() * 5),
  }))
}
