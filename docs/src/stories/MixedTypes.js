/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
//
import { Chart, Axis, Series, Tooltip, Bar, Line } from '../../../lib'

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

        Ordinal Scale:
        <br />
        <br />
        {_.range(1).map((d, i) => (
          <ResizableBox key={i} width={700} height={400}>
            <Chart
              data={data}
              getData={d => d.data}
              getLabel={d => d.label}
              getPrimary={d => d.x}
              getSecondary="nested.y"
            >
              <Axis
                primary
                type="ordinal"
                position="bottom"
                paddingOuter={1}
                showGrid
              />
              <Axis type="linear" position="left" />
              <Series type={(s, i) => (i % 2 ? Bar : Line)} />
              <Tooltip />
            </Chart>
          </ResizableBox>
        ))}
        <br />
        <br />

        Linear Scale
        <br />
        <br />
        {_.range(1).map((d, i) => (
          <ResizableBox key={i} width={700} height={400}>
            <Chart
              data={data}
              getData={d => d.data}
              getLabel={d => d.label}
              getPrimary={d => d.x}
              getSecondary="nested.y"
            >
              <Axis primary type="linear" position="bottom" paddingOuter={1} />
              <Axis type="linear" position="left" />
              <Series type={(s, i) => (i % 2 ? Bar : Line)} />
              <Tooltip />
            </Chart>
          </ResizableBox>
        ))}
      </div>
    )
  }
}

function makeData() {
  return _.map(_.range(Math.max(Math.round(Math.random() * 4), 2)), makeSeries)
}

function makeSeries(d, i) {
  const length = 15
  const max = 100
  const multiplier = 1
  return {
    label: 'Series ' + (i + 1),
    data: _.map(_.range(length), d => ({
      x: d * multiplier,
      nested: {
        y: Math.round(-max + Math.random() * max * 2),
        r: Math.round(Math.random() * 10)
      }
    }))
  }
}

// #############
// Story Config
// #############

const CodeHighlight = require('./components/codeHighlight').default
const source = require('!raw!./ColumnChart')

export default () => (
  <div>
    <Story />
    <br />
    <br />
    Source:
    <CodeHighlight>{() => source}</CodeHighlight>
  </div>
)
