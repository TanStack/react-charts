
import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
import { Chart, Axis, Series, Tooltip, Area, Bar } from '../../../src'

class Story extends Component {
  constructor () {
    super()
    this.state = {
      data: makeData(),
    }
  }
  render () {
    const { data } = this.state
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              data: makeData(),
            })
          }
        >
          Randomize Data
        </button>

        <br />
        <br />

        {_.range(1).map((d, i) => (
          <ResizableBox key={i} width={900} height={300}>
            <Chart data={data} getData={d => d.data} interaction="axis">
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" stacked />
              <Series type={Area} />
              <Tooltip align="bottom" origin={['center', 'chartBottom']}>
                {props => (
                  <div
                    style={{
                      color: 'white',
                    }}
                  >
                    <h3
                      style={{
                        display: 'block',
                        textAlign: 'center',
                      }}
                    >
                      {props.primaryAxis.format(props.datums[0].primary)}
                    </h3>
                    <div
                      style={{
                        width: '200px',
                        height: '100px',
                        background: 'white',
                      }}
                    >
                      <Chart
                        data={[
                          props.datums.map(d => ({
                            x: d.seriesLabel,
                            y: d.secondary,
                            color: d.statusStyles.default.fill,
                          })),
                        ]}
                      >
                        <Axis primary type="ordinal" position="bottom" />
                        <Axis type="linear" position="left" stacked />
                        <Series
                          type={Bar}
                          getDataStyles={datum => ({
                            color: datum.datum.color,
                          })}
                        />
                      </Chart>
                    </div>
                    <img
                      src="https://media.giphy.com/media/26AHLBZUC1n53ozi8/giphy.gif"
                      alt=""
                      style={{
                        width: '200px',
                        height: 'auto',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </div>
                )}
              </Tooltip>
            </Chart>
          </ResizableBox>
        ))}
      </div>
    )
  }
}

export default () => <Story />

function makeData () {
  return _.map(_.range(3), makeSeries)
}

function makeSeries (i) {
  const startDate = new Date()
  startDate.setMilliseconds(0)
  startDate.setSeconds(0)
  // const length = Math.round(Math.random() * 30)
  const length = 30
  const max = 100
  return {
    label: `Series ${i + 1}`,
    data: _.map(_.range(length), () => ({
      x: startDate.setMinutes(startDate.getMinutes() + 30),
      y: 0 + Math.round(Math.random() * max * 2),
      r: Math.round(Math.random() * 10),
    })),
  }
}
