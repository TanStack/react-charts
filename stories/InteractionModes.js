import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
import { Chart, Axis, Data, Tooltip, Cursor } from '../src'
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
              interaction='closestSeries' // primary, series, closestSeries, closestPoint, element
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
                    color: 'rgba(0, 0, 0, .7)',
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
              <Cursor
                primary
                snap
              />
              <Cursor />
              <Tooltip
                position='center' // center, top, bottom, left, right, cursor, closest, (datums, resolvedCursor) => ({x, y})
                align='auto' // auto, top, left, right, bottom, center,
              />
            </Chart>
          </ResizableBox>
        ))}
      </div>
    )
  }
}

export default () => <Line />

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
    data: _.map(_.range(length), d => ({
      // x: d * multiplier,
      x: startDate.setMinutes(startDate.getMinutes() + 30),
      y: Math.round(Math.random() * (max) + Math.round(Math.random() * 50)),
      r: Math.round(Math.random() * 5)
    }))
  }
}
