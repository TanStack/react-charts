import React, { Component } from 'react'
//
import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Defs } from '../../../src'

let sourceCode

class Story extends Component {
  state = {
    activeSeries: null,
  }
  render () {
    const { activeSeries } = this.state
    return (
      <Sidebar>
        <div>
          <Code
            source={JSON.stringify(
              {
                activeSeries,
              },
              null,
              2
            )}
          />
          <ChartConfig
            interaction="axis"
            elementType="line"
            show={['elementType', 'interaction']}
            series={4}
            height={200}
          >
            {({ elementType, interaction, data }) => (
              // @source sourceCode
              <Chart data={data} interaction={interaction}>
                <Defs>
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
                </Defs>
                <Axis primary type="time" position="bottom" />
                <Axis type="linear" position="left" stacked />
                <Series
                  type={elementType}
                  updateKey={activeSeries}
                  getStyles={series => ({
                    color: `url(#${series.index % 4})`,
                    opacity: activeSeries !== null ? (series.id === activeSeries ? 1 : 0.2) : 1,
                  })}
                  getDatumStyles={d => ({
                    r: d.hovered ? 5 : d.otherHovered ? 3 : 0,
                  })}
                  render={series => <elementType series={series} />}
                />
                <Tooltip
                  onChange={info =>
                    this.setState({
                      activeSeries: info.opacity ? info.focusDatum.series.id : null,
                    })
                  }
                />
              </Chart>
              // @source sourceCode
            )}
          </ChartConfig>
          <ChartConfig
            interaction="axis"
            elementType="area"
            show={['elementType', 'interaction']}
            series={4}
            height={200}
          >
            {({ elementType, interaction, data }) => (
              <Chart data={data} interaction={interaction}>
                <Defs>
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
                </Defs>
                <Axis primary type="time" position="bottom" />
                <Axis type="linear" position="left" stacked />
                <Series
                  type={elementType}
                  updateKey={activeSeries}
                  getStyles={series => ({
                    color: `url(#${series.index % 4})`,
                    opacity: activeSeries !== null ? (series.id === activeSeries ? 1 : 0.2) : 1,
                  })}
                  getDatumStyles={d => ({
                    r: d.hovered ? 5 : d.otherHovered ? 3 : 0,
                  })}
                />
                <Tooltip
                  onChange={info =>
                    this.setState({
                      activeSeries: info.opacity ? info.focusDatum.series.id : null,
                    })
                  }
                />
              </Chart>
            )}
          </ChartConfig>
          <ChartConfig
            interaction="axis"
            elementType="bar"
            show={['elementType', 'interaction']}
            series={4}
            height={200}
          >
            {({ elementType, interaction, data }) => (
              <Chart data={data} interaction={interaction}>
                <Defs>
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
                </Defs>
                <Axis primary type="time" position="bottom" />
                <Axis type="linear" position="left" stacked />
                <Series
                  type={elementType}
                  updateKey={activeSeries}
                  getStyles={series => ({
                    color: `url(#${series.index % 4})`,
                    opacity: activeSeries !== null ? (series.id === activeSeries ? 1 : 0.2) : 1,
                  })}
                  getDatumStyles={d => ({
                    r: d.hovered ? 5 : d.otherHovered ? 3 : 0,
                  })}
                />
                <Tooltip
                  onChange={info =>
                    this.setState({
                      activeSeries: info.opacity ? info.focusDatum.series.id : null,
                    })
                  }
                />
              </Chart>
            )}
          </ChartConfig>
          <Code source={sourceCode} />
        </div>
      </Sidebar>
    )
  }
}

export default () => <Story />
