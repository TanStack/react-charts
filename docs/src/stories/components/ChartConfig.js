import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
//
import { Line, Area, Bar, Bubble } from '../../../../lib'

const types = {
  line: Line,
  area: Area,
  bar: Bar,
  bubble: Bubble
}

const options = {
  elementType: Object.keys(types),
  primaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  secondaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  primaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisStack: [true, false],
  interaction: ['axis', 'series', 'closestSeries', 'closestPoint', 'element'],
  tooltipPosition: [
    'top',
    'bottom',
    'left',
    'right',
    'center',
    'cursor',
    'closest'
  ],
  tooltipAlign: ['top', 'bottom', 'left', 'right', 'center'],
  snapCursor: [true, false]
}

const optionKeys = [
  'elementType',
  'primaryAxisType',
  'primaryAxisPosition',
  'secondaryAxisType',
  'secondaryAxisPosition',
  'secondaryAxisStack',
  'interaction',
  'tooltipPosition',
  'tooltipAlign',
  'snapCursor'
]

export default class ChartConfig extends Component {
  static defaultProps = {
    show: optionKeys,
    elementType: 'line',
    primaryAxisType: 'time',
    secondaryAxisType: 'linear',
    primaryAxisPosition: 'bottom',
    secondaryAxisPosition: 'left',
    primaryAxisStack: false,
    secondaryAxisStack: true,
    interaction: 'axis',
    tooltipPosition: 'closest',
    tooltipAlign: 'top',
    snapCursor: true
  }
  constructor(props) {
    super()
    this.state = {
      ...props,
      data: makeData()
    }
  }
  render() {
    const { children, show } = this.props
    return (
      <div>

        {optionKeys.map(
          option =>
            show.indexOf(option) > -1
              ? <div key={option}>
                  <label>
                    {option}: &nbsp;
                    <select
                      value={this.state[option]}
                      onChange={({ target: { value } }) =>
                        this.setState(() => ({
                          [option]: typeof options[option][0] === 'boolean'
                            ? value === 'true'
                            : value
                        }))}
                    >
                      {options[option].map(d => (
                        <option value={d} key={d.toString()}>
                          {d.toString()}
                        </option>
                      ))}
                    </select>
                  </label>
                  <br />
                </div>
              : <div key={option} />
        )}

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
            {children({
              ...this.state,
              elementType: types[this.state.elementType]
            })}
          </ResizableBox>
        ))}
      </div>
    )
  }
}

function makeData() {
  return _.map(_.range(Math.max(Math.round(Math.random() * 5), 1)), makeSeries)
}

function makeSeries(i) {
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
      y: -max + Math.round(Math.random() * max * 2),
      r: Math.round(Math.random() * 10)
    }))
  }
}
