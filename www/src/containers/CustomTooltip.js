import React, { Component } from 'react'
import Tree from 'react-json-tree'
//
import ChartConfig from 'components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Cursor, Area, Bar } from '../../../dist'

class Story extends Component {
  state = {
    tooltipInfo: {},
  }
  render () {
    const { tooltipInfo } = this.state
    return (
      <React.Fragment>
        <ChartConfig>
          {({ data }) => (
            <Chart
              data={data}
              type="area"
              axes={[
                { primary: true, position: 'bottom', type: 'time' },
                { position: 'left', type: 'linear', stacked: true },
              ]}
              primaryCursor
              secondaryCursor
              tooltip={{
                onChange: tooltipInfo =>
                  this.setState({
                    tooltipInfo,
                  }),
                render: ({ datum, primaryAxis, getStyle }) =>
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
                          width: '400px',
                          height: '150px',
                          background: 'white',
                          display: 'flex',
                        }}
                      >
                        <div
                          style={{
                            flex: '0 0 50%',
                          }}
                        >
                          <Chart
                            data={datum.group}
                            type="bar"
                            getSeries={data => [
                              {
                                datums: data.map(d => ({
                                  x: d.seriesLabel,
                                  y: d.secondary,
                                  color: getStyle(d).fill,
                                })),
                              },
                            ]}
                            axes={[
                              { type: 'ordinal', primary: true, position: 'bottom' },
                              { type: 'linear', stacked: true, position: 'left' },
                            ]}
                            getDatumStyles={datum => ({
                              color: datum.original.color,
                            })}
                          />
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
                    </div>
                  ) : null,
              }}
            />
          )}
        </ChartConfig>
        <Tree hideRoot data={tooltipInfo} />
      </React.Fragment>
    )
  }
}

export default () => <Story />
