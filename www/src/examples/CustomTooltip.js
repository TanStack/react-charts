import React, { Component } from 'react'
import Tree from 'react-json-tree'
//
import ChartConfig from 'components/ChartConfig'
import Sidebar from 'components/Sidebar'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Cursor, Area, Bar } from '../../../src'

let sourceCode

class Story extends Component {
  state = {
    tooltipInfo: {},
  }
  render () {
    const { tooltipInfo } = this.state
    console.log(tooltipInfo)
    return (
      <Sidebar>
        <Tree hideRoot data={tooltipInfo} />
        <ChartConfig>
          {({ data }) => (
            // @source sourceCode
            <Chart data={data}>
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" stacked />
              <Series type={Area} />
              <Cursor primary />
              <Cursor />
              <Tooltip
                onChange={tooltipInfo =>
                  this.setState({
                    tooltipInfo,
                  })
                }
              >
                {({ datum, primaryAxis, getStyle }) =>
                  datum ? (
                    <div
                      style={{
                        color: 'white',
                        pointerEvents: 'none',
                      }}
                    >
                      <h3
                        style={{
                          display: 'block',
                          textAlign: 'center',
                        }}
                      >
                        {primaryAxis.format(datum.primary)}
                      </h3>
                      <div
                        style={{
                          width: '200px',
                          height: '100px',
                          background: 'white',
                        }}
                      >
                        <Chart
                          data={datum.group}
                          getSeries={data => [
                            {
                              datums: data.map(d => ({
                                x: d.seriesLabel,
                                y: d.secondary,
                                color: getStyle(d).fill,
                              })),
                            },
                          ]}
                        >
                          <Axis type="ordinal" primary />
                          <Axis type="linear" stacked />
                          <Series
                            type={Bar}
                            getDatumStyles={datum => ({
                              color: datum.original.color,
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
                  ) : null
                }
              </Tooltip>
            </Chart>
            // @source sourceCode
          )}
        </ChartConfig>
        <Code source={sourceCode} />
      </Sidebar>
    )
  }
}

export default () => <Story />
