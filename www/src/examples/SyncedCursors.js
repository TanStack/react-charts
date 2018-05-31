import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'
import Sidebar from 'components/Sidebar'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Cursor, Area } from '../../../src'

let sourceCode

// @source sourceCode
class Story extends Component {
  state = {
    cursorValue: null,
  }
  render () {
    const { cursorValue } = this.state
    return (
      <Sidebar>
        <Code source={JSON.stringify({ cursorValue }, null, 2)} />
        <ChartConfig width={600}>
          {({ data }) => (
            <Chart data={data}>
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" stacked />
              <Series type={Area} />
              <Cursor
                primary
                value={cursorValue}
                id="1"
                onChange={state => {
                  this.setState({
                    cursorValue: state.value,
                  })
                }}
              />
              <Cursor />
              <Tooltip />
            </Chart>
          )}
        </ChartConfig>
        <br />
        <ChartConfig width={200}>
          {({ data }) => (
            <Chart data={data}>
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" stacked />
              <Series type={Area} />
              <Cursor
                primary
                value={cursorValue}
                id="2"
                onChange={state => {
                  this.setState({
                    cursorValue: state.value,
                  })
                }}
              />
              <Cursor />
              <Tooltip />
            </Chart>
          )}
        </ChartConfig>
        <ChartConfig width={400}>
          {({ data }) => (
            <Chart data={data}>
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" stacked />
              <Series type={Area} />
              <Cursor
                primary
                value={cursorValue}
                id="2"
                onChange={state => {
                  this.setState({
                    cursorValue: state.value,
                  })
                }}
              />
              <Cursor />
              <Tooltip />
            </Chart>
          )}
        </ChartConfig>
        <Code source={sourceCode} />
      </Sidebar>
    )
  }
}
// @source sourceCode

export default () => <Story />
