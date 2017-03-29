import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
import { Chart, Axis, Data, Tooltip } from '../src'
//
// import CodeHighlight from './components/codeHighlight.js'

class Line extends Component {
  constructor () {
    super()
    this.state = {
      data: makeData()
    }
  }
  render () {
    const {
      data
    } = this.state
    return (
      <div>
        <button
          onClick={() => this.setState({
            data: makeData()
          })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        {_.range(1).map((d, i) => (
          <ResizableBox
            key={i}
            width={500}
            height={300}
          >
            <Chart
              data={data}
              getData={d => d.data}
              // tooltip={{}}
            >
              <Axis
                primary
                type='time'
                position='bottom'
              />
              <Axis
                type='linear'
                position='left'
                stacked
              />
              <Data
                type='area'
                getProps={(series, i) => ({
                  style: {
                    color: series.inactive ? 'grey' : series.row.color,
                    opacity: series.inactive ? 0.2 : 1
                  }
                })}
                getDataProps={(datum, i) => ({
                  style: {
                    r: datum.active ? 5 : 0,
                    color: datum.active ? 'black' : undefined
                  }
                })}
              />
            </Chart>
          </ResizableBox>
        ))}

        <br />
        <br />
      </div>
    )
  }
}

export default () => <Line />

const colors = [
  '#0f7db4',
  '#fc6868',
  '#DECF3F',
  '#60BD68',
  '#FAA43A',
  '#c63b89',
  '#1aaabe',
  '#734fe9',
  '#1828bd',
  '#cd82ad'
]

function makeData () {
  return _.map(_.range(Math.max(Math.round((Math.random() * 4)), 1)), makeSeries)
}

function makeSeries (i) {
  const startDate = new Date()
  // const length = Math.round(Math.random() * 30)
  const length = 30
  const max = 100
  // const max = Math.random() > 0.5 ? 100000 : 10
  // const multiplier = 10
  // const multiplier = Math.round((Math.random() * 10) + Math.round(Math.random() * 50))
  return {
    label: 'Series ' + (i + 1),
    color: colors[i],
    data: _.map(_.range(length), d => ({
      // x: d * multiplier,
      x: new Date().setMinutes(startDate.getMinutes() + (30 * d)),
      y: Math.round(Math.random() * (max) + Math.round(Math.random() * 50)),
      r: Math.round(Math.random() * 5)
    }))
  }
}
