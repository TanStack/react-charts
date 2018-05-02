import React, { Component } from 'react'
//
import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip, Defs } from '../../../src'

let sourceCode

class Story extends Component {
  render () {
    return (
      <Sidebar>
        <div>
          <ChartConfig interaction="axis" elementType="line" show={['elementType', 'interaction']}>
            {({ elementType, interaction, data }) => (
              // @source sourceCode
              <Chart data={data} interaction={interaction}>
                <Defs>
                  <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                    <stop offset="0%" stopColor="#FCE38A" />
                    <stop offset="100%" stopColor="#F38181" />
                  </linearGradient>
                  <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
                    <stop offset="0%" stopColor="#17EAD9" />
                    <stop offset="100%" stopColor="#6078EA" />
                  </linearGradient>
                  <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
                    <stop offset="0%" stopColor="#42E695" />
                    <stop offset="100%" stopColor="#3BB2B8" />
                  </linearGradient>
                </Defs>
                <Axis primary type="time" position="bottom" />
                <Axis type="linear" position="left" stacked />
                <Series
                  type={elementType}
                  getStyles={series => ({
                    color: `url(#${series.index % 3})`,
                    opacity: series.otherHovered ? 0.5 : 1,
                  })}
                  getDatumStyles={d => ({
                    r: d.hovered ? 5 : d.otherHovered ? 3 : 0,
                  })}
                />
                <Tooltip />
              </Chart>
              // @source sourceCode
            )}
          </ChartConfig>
          <Code source={sourceCode} />
        </div>
      </Sidebar>
    )
  }
}

export default () => <Story />
