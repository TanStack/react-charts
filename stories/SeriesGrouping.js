import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
import { Chart, Axis, Series, Tooltip, Cursor, DecorateGroups } from '../src'
//
// import CodeHighlight from './components/codeHighlight.js'

class Story extends Component {
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
              data={DecorateGroups(data, [{
                groupBy: 'segment',
                getMeta: (series, i) => ({
                  color: i === 0 ? 'red' : 'blue'
                })
              }, {
                groupBy: 'device',
                getMeta: (series, i) => ({
                  // color: 'blue'
                })
              }])}
              getData={series => series.data}
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
              <Series
                type='area'
              />
              <Cursor
                primary
              />
              <Cursor />
              <Tooltip />
            </Chart>
          </ResizableBox>
        ))}

        <br />
        <br />
      </div>
    )
  }
}

export default () => <Story />

function makeData () {
  return _.map(_.range(6), makeSeries)
}

function makeSeries (i) {
  const startDate = new Date()
  const length = 30
  const max = 100

  const r = Math.random()

  return {
    label: 'Series ' + (i + 1),
    segment: r > 0.5 ? 0 : 1,
    device: r > 0.66 ? 'desktop' : r > 0.33 ? 'tablet' : 'mobile',
    data: _.map(_.range(length), i => {
      let date = new Date()
      date.setMinutes(startDate.getMinutes() + (30 * i))
      date.setSeconds(0)
      date = date.setMilliseconds(0)
      const r = Math.random()
      return {
        x: date,
        y: Math.round(r * (max) + Math.round(r * 50)),
        r: Math.round(r * 5)
      }
    })
  }
}
