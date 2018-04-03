
import React, { Component } from 'react'
//
import ChartConfig from './components/ChartConfig'
import { Chart, Axis, Series, Tooltip } from '../../../src'

class Story extends Component {
  render () {
    return (
      <div>
        <ChartConfig show={['elementType', 'interaction', 'tooltipPosition']}>
          {({
 elementType, interaction, tooltipPosition, data,
}) => (
  <Chart data={data} getData={d => d.data} interaction={interaction}>
    <Axis primary type="time" position="bottom" />
    <Axis type="linear" position="left" stacked />
    <Series type={elementType} />
    <Tooltip origin={tooltipPosition} />
  </Chart>
          )}
        </ChartConfig>
      </div>
    )
  }
}

export default () => <Story />
