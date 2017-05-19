/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
import source from '!raw!./ColumnChart'
import CodeHighlight from './components/codeHighlight'
//
import { Chart, Axis, Series, Tooltip, Bar } from '../../../lib'

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

        {_.range(1).map((d, i) => (
          <ResizableBox key={i} width={500} height={300}>
            <Chart
              data={data}
              getData={d => d.data}
              getLabel={d => d.label}
              getPrimary={d => d.x}
              getSecondary="nested.y"
            >
              <Axis primary type="ordinal" position="bottom" />
              <Axis type="linear" position="left" stacked />
              <Series type={Bar} />
              <Tooltip />
            </Chart>
          </ResizableBox>
        ))}

        <br />
        <br />
        <CodeHighlight>{() => source}</CodeHighlight>
      </div>
    )
  }
}

export default () => <Story />

function makeData() {
  return _.map(_.range(Math.max(Math.round(Math.random() * 4), 2)), makeSeries)
}

function makeSeries(d, i) {
  // const length = Math.round(Math.random() * 30)
  const length = 30
  const max = 100
  // const max = Math.random() > 0.5 ? 100000 : 10
  const multiplier = 1
  // const multiplier = Math.round((Math.random() * 10) + Math.round(Math.random() * 50))
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
