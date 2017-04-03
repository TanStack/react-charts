import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
//

const options = {
  elementType: [
    'line',
    'area',
    'bar',
    'bubble'
  ],
  primaryAxisType: [
    'linear',
    'time',
    'log',
    'ordinal'
  ],
  secondaryAxisType: [
    'linear',
    'time',
    'log',
    'ordinal'
  ],
  primaryAxisPosition: [
    'top',
    'left',
    'right',
    'bottom'
  ],
  secondaryAxisPosition: [
    'top',
    'left',
    'right',
    'bottom'
  ],
  secondaryAxisStack: [
    true,
    false
  ],
  interactionMode: [
    'axis',
    'series',
    'closestSeries',
    'closestPoint',
    'element'
  ],
  tooltipPosition: [
    'top',
    'bottom',
    'left',
    'right',
    'center',
    'cursor',
    'closest'
  ],
  tooltipAlign: [
    'top',
    'bottom',
    'left',
    'right',
    'auto'
  ],
  snapCursor: [
    true,
    false
  ]
}

const optionKeys = [
  'elementType',
  'primaryAxisType',
  'primaryAxisPosition',
  'secondaryAxisType',
  'secondaryAxisPosition',
  'secondaryAxisStack',
  'interactionMode',
  'tooltipPosition',
  'tooltipAlign',
  'snapCursor'
]

export default class ChartConfig extends Component {
  static defaultProps = {
    elementType: 'line',
    primaryAxisType: 'time',
    secondaryAxisType: 'linear',
    primaryAxisPosition: 'bottom',
    secondaryAxisPosition: 'left',
    primaryAxisStack: false,
    secondaryAxisStack: true,
    interactionMode: 'axis',
    tooltipPosition: 'top',
    tooltipAlign: 'auto',
    snapCursor: true
  }
  constructor (props) {
    super()
    this.state = {
      ...props,
      data: makeData()
    }
  }
  render () {
    const {
      children
    } = this.props
    return (
      <div>

        {optionKeys.map(option => (
          <div key={option}>
            <label>
              {option}: &nbsp;
              <select
                value={this.state[option]}
                onChange={({target: {value}}) => this.setState(() => ({
                  [option]: typeof options[option][0] === 'boolean' ? value === 'true' : value
                }))}
              >
                {options[option].map(d => (
                  <option value={d} key={d.toString()}>{d.toString()}</option>
                ))}
              </select>
            </label>
            <br />
          </div>
        ))}

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
            {children(this.state)}
          </ResizableBox>
        ))}
      </div>
    )
  }
}

function makeData () {
  return _.map(_.range(Math.max(Math.round((Math.random() * 5)), 1)), makeSeries)
}

function makeSeries (i) {
  const startDate = new Date()
  startDate.setMilliseconds(0)
  startDate.setSeconds(0)
  // const length = Math.round(Math.random() * 30)
  const length = 30
  const max = 100
  return {
    label: 'Series ' + (i + 1),
    data: _.map(_.range(length), d => ({
      x: startDate.setMinutes(startDate.getMinutes() + 30),
      y: Math.round(Math.random() * (max) + Math.round(Math.random() * 50)),
      r: Math.round(Math.random() * 10)
    }))
  }
}
