/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
//
import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip } from '../../../src'

class Story extends Component {
  render () {
    return (
      <div>
        <ChartConfig interaction="axis" show={['elementType', 'interaction']}>
          {({ elementType, interaction, data }) => (
            <Chart data={data} getData={s => s.data} interaction={interaction}>
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" stacked />
              <Series
                type={elementType}
                getStyles={series => ({
                  color: series.otherHovered && 'grey',
                  opacity: series.otherHovered ? 0.2 : 1,
                  line: {
                    strokeDasharray: '5, 5',
                  },
                })}
                getDataStyles={d => ({
                  r: d.hovered ? 5 : d.selected ? 4 : d.otherHovered ? 2 : 3,
                  strokeWidth: 2,
                  strokeDasharray: '5, 5',
                  opacity: d.hovered
                    ? 1
                    : d.selected ? 1 : d.otherHovered ? 0.5 : d.otherSelected ? 0.75 : 1,
                })}
              />
              <Tooltip />
            </Chart>
          )}
        </ChartConfig>
      </div>
    )
  }
}

export default () => <Story />
