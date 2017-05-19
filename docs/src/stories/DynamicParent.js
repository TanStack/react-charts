/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
//
import source from '!raw!./DynamicParent'
import CodeHighlight from './components/codeHighlight'
//
import { Chart, Axis, Series, Tooltip, Line } from '../../../lib'

class Story extends Component {
  constructor() {
    super()
    this.state = {
      data: makeData()
    }
  }
  render() {
    const { data } = this.state
    return (
      <div>
        <p>
          Charts should take on the dimensions of their parent, and should not have a min/max width or height. Padding, margin and borders should not throw off this dynamic calculation of size either.  The example below uses all of these properties, including being a flex child with grow capabilities.
        </p>
        <button
          onClick={() =>
            this.setState({
              data: makeData()
            })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '12px',
            border: '2px solid black',
            height: '400px'
          }}
        >
          <div
            style={{
              flex: '0 0 auto',
              padding: '10px',
              border: '1px solid red'
            }}
          >
            Header
          </div>
          <div
            style={{
              flex: 2,
              border: '5px solid blue',
              maxHeight: '400px',
              margin: '10px'
            }}
          >
            <Chart data={data}>
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" />
              <Series type={Line} />
              <Tooltip />
            </Chart>
          </div>
        </div>

        <br />
        <br />
        <CodeHighlight>{() => source}</CodeHighlight>
      </div>
    )
  }
}

export default () => <Story />

function makeData() {
  return _.map(_.range(Math.max(Math.round(Math.random() * 4), 1)), d =>
    makeSeries()
  )
}
function makeSeries() {
  const startDate = new Date()
  // const length = Math.round(Math.random() * 30)
  const length = 30
  const max = 100
  // const max = Math.random() > 0.5 ? 100000 : 10
  // const multiplier = 10
  // const multiplier = Math.round((Math.random() * 10) + Math.round(Math.random() * 50))
  return _.map(_.range(length), d => ({
    // x: d * multiplier,
    x: new Date().setMinutes(startDate.getMinutes() + 30 * d),
    y: Math.round(Math.random() * max + Math.round(Math.random() * 50)),
    r: Math.round(Math.random() * 5)
  }))
}
