import React from 'react'
import { ResizableBox } from 'react-resizable'
//

const options = {
  elementType: ['line', 'area', 'bar', 'bubble'],
  primaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  secondaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  primaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisStack: [true, false],
  primaryAxisShow: [true, false],
  secondaryAxisShow: [true, false],
  groupMode: ['single', 'series', 'primary', 'secondary'],
  tooltipAnchor: [
    'closest',
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
    'pointer',
  ],
  tooltipAlign: ['top', 'bottom', 'left', 'right', 'center'],
  snapCursor: [true, false],
}

const optionKeys = Object.keys(options)

export default class ChartConfig extends React.Component {
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
    tooltipAnchor: 'closest',
    tooltipAlign: 'top',
    groupMode: 'primary',
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
    const { dataType, series, useR } = this.props
    return makeData(dataType, series, useR)
  }
  render () {
    const {
      children,
      show,
      count,
      resizable,
      width,
      height,
      canRandomize,
      style,
      className,
    } = this.props

    const randomizeData = () =>
      this.setState({
        data: this.makeData(),
      })

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
            <button onClick={randomizeData}>Randomize Data</button>

            <br />
            <br />
          </div>
        )}

        {[...new Array(count)].map(
          (d, i) =>
            resizable && true ? (
              <ResizableBox key={i} width={width} height={height}>
                <div
                  style={{
                    ...style,
                    width: '100%',
                    height: '100%',
                  }}
                  className={className}
                >
                  {children({
                    ...this.state,
                    elementType: this.state.elementType,
                    randomizeData,
                  })}
                </div>
              </ResizableBox>
            ) : (
              <div key={i}>
                {children({
                  ...this.state,
                  elementType: this.state.elementType,
                  randomizeData,
                })}
              </div>
            )
        )}
      </div>
    )
  }
}

function makeData (dataType, series, useR) {
  return [...new Array(series || Math.max(Math.round(Math.random() * 5), 1))].map((d, i) =>
    makeSeries(i, dataType, useR)
  )
}

function makeSeries (i, dataType, useR) {
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
      if (dataType === 'ordinal') {
        x = `Ordinal Group ${x}`
      }
      if (dataType === 'time') {
        x = new Date(startDate.getTime() + 60 * 1000 * 30 * i)
      }
      const distribution = 1.1
      const y = Math.random() < nullChance ? null : min + Math.round(Math.random() * (max - min))
      const r = !useR
        ? undefined
        : rMax -
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
