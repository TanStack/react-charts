import React, { Component } from 'react'
import { ResizableBox } from 'react-resizable'
//
//
import { Line, Area, Bar, Bubble } from '../../../src'

const types = {
  line: Line,
  area: Area,
  bar: Bar,
  bubble: Bubble,
}

const options = {
  elementType: Object.keys(types),
  primaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  secondaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  primaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisStack: [true, false],
  primaryAxisShow: [true, false],
  secondaryAxisShow: [true, false],
  interaction: [
    'closestPoint',
    'closestSeries',
    'primaryAxis',
    'secondaryAxis',
    'element',
    'series',
  ],
  tooltipPosition: [
    'top',
    'bottom',
    'left',
    'right',
    'center',
    'gridTop',
    'gridBottom',
    'gridLeft',
    'gridRight',
    'gridCenter',
    'chartTop',
    'chartBottom',
    'chartLeft',
    'chartRight',
    'chartCenter',
    'cursor',
    'closest',
  ],
  tooltipAlign: ['top', 'bottom', 'left', 'right', 'center'],
  snapCursor: [true, false],
}

const optionKeys = Object.keys(options)

export default class ChartConfig extends Component {
  static defaultProps = {
    count: 1,
    resizable: true,
    width: 500,
    height: 300,
    canRandomize: true,
    dataType: 'time',
    show: [],
    elementType: 'line',
    primaryAxisType: 'time',
    secondaryAxisType: 'linear',
    primaryAxisPosition: 'bottom',
    secondaryAxisPosition: 'left',
    primaryAxisStack: false,
    secondaryAxisStack: true,
    primaryAxisShow: true,
    secondaryAxisShow: true,
    hoverMode: 'primary',
    tooltipPosition: 'closest',
    tooltipAlign: 'top',
    snapCursor: true,
  }
  constructor (props) {
    super(props)
    this.state = {
      ...props,
      data: this.makeData(),
    }
  }
  makeData = () => {
    const { dataType, series } = this.props
    return makeData(dataType, series)
  }
  render () {
    const {
      render, children, show, count, resizable, width, height, canRandomize,
    } = this.props
    return (
      <div>
        {optionKeys.filter(option => show.indexOf(option) > -1).map(option => (
          <div key={option}>
            {option}: &nbsp;
            <select
              value={this.state[option]}
              onChange={({ target: { value } }) =>
                this.setState(() => ({
                  [option]: typeof options[option][0] === 'boolean' ? value === 'true' : value,
                }))
              }
            >
              {options[option].map(d => (
                <option value={d} key={d.toString()}>
                  {d.toString()}
                </option>
              ))}
            </select>
            <br />
          </div>
        ))}

        {canRandomize && (
          <div>
            <button
              onClick={() =>
                this.setState({
                  data: this.makeData(),
                })
              }
            >
              Randomize Data
            </button>

            <br />
            <br />
          </div>
        )}

        {[...new Array(count)].map(
          (d, i) =>
            resizable && true ? (
              <ResizableBox key={i} width={width} height={height}>
                {(render || children)({
                  ...this.state,
                  elementType: types[this.state.elementType],
                })}
              </ResizableBox>
            ) : (
              <div key={i}>
                {(render || children)({
                  ...this.state,
                  elementType: types[this.state.elementType],
                })}
              </div>
            )
        )}
      </div>
    )
  }
}

function makeData (dataType, series) {
  return [...new Array(series || Math.max(Math.round(Math.random() * 5), 1))].map((d, i) =>
    makeSeries(i, dataType)
  )
}

function makeSeries (i, dataType) {
  const start = 0
  const startDate = new Date()
  startDate.setMinutes(0)
  startDate.setSeconds(0)
  startDate.setMilliseconds(0)
  // const length = 5 + Math.round(Math.random() * 15)
  const length = 10
  const min = 0
  const max = 100
  const rMin = 2
  const rMax = 20
  const nullChance = 0
  return {
    label: `Series ${i + 1}`,
    datums: [...new Array(length)].map((_, i) => {
      let x = start + i
      if (dataType === 'time') {
        x = new Date(startDate.getTime() + 60 * 1000 * 30 * i)
      }
      const distribution = 1.1
      const y = Math.random() < nullChance ? null : min + Math.round(Math.random() * (max - min))
      const r =
        rMax -
        Math.floor(
          Math.log(Math.random() * (distribution ** rMax - rMin) + rMin) / Math.log(distribution)
        )
      return {
        x,
        y,
        r,
      }
    }),
  }
}
