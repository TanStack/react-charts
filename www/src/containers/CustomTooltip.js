import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

class Story extends Component {
  render () {
    return (
      <React.Fragment>
        <ChartConfig>
          {({ data }) => (
            <Chart
              data={data}
              series={{ type: 'area' }}
              axes={[
                { primary: true, position: 'bottom', type: 'time' },
                { position: 'left', type: 'linear', stacked: true },
              ]}
              primaryCursor
              tooltip={{
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
                            series={{ type: 'bar' }}
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
                            getDatumStyle={datum => ({
                              color: datum.originalDatum.color,
                            })}
                            primaryCursor={{
                              value: datum.seriesLabel,
                            }}
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
      </React.Fragment>
    )
  }
}

export default () => <Story />
