import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

const defs = (
  <defs>
    <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
      <stop offset="0%" stopColor="#17EAD9" />
      <stop offset="100%" stopColor="#6078EA" />
    </linearGradient>
    <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
      <stop offset="0%" stopColor="#FCE38A" />
      <stop offset="100%" stopColor="#F38181" />
    </linearGradient>
    <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
      <stop offset="0%" stopColor="#42E695" />
      <stop offset="100%" stopColor="#3BB2B8" />
    </linearGradient>
    <linearGradient id="3" x1="0" x2="0" y1="1" y2="0">
      <stop offset="0%" stopColor="#F4Ea0A" />
      <stop offset="100%" stopColor="#df4081" />
    </linearGradient>
  </defs>
)

class Story extends Component {
  state = {
    activeSeriesIndex: -1,
  }
  render () {
    const { activeSeriesIndex } = this.state
    return (
      <div>
        {JSON.stringify({ activeSeriesIndex }, null, 2)}
        {['line', 'area', 'bar'].map(type => (
          <ChartConfig
            key={type}
            interaction="axis"
            elementType={type}
            show={['elementType', 'interaction']}
            series={4}
            height={200}
          >
            {({ elementType, interaction, data }) => (
              <Chart
                data={data}
                interaction={interaction}
                series={{
                  type: elementType,
                }}
                axes={[
                  {
                    primary: true,
                    type: 'time',
                    position: 'bottom',
                  },
                  {
                    type: 'linear',
                    position: 'left',
                    stacked: true,
                  },
                ]}
                getStyles={series => ({
                  color: `url(#${series.index % 4})`,
                  opacity:
                    activeSeriesIndex > -1 ? (series.index === activeSeriesIndex ? 1 : 0.2) : 1,
                })}
                getDatumStyles={datum => ({
                  r: datum.focused
                    ? 5
                    : datum.series.index === activeSeriesIndex
                      ? 3
                      : datum.otherHovered
                        ? 2
                        : 0,
                })}
                onFocus={focused =>
                  this.setState({
                    activeSeriesIndex: focused ? focused.series.id : -1,
                  })
                }
                renderSVG={() => defs}
              />
            )}
          </ChartConfig>
        ))}
      </div>
    )
  }
}

export default () => <Story />
