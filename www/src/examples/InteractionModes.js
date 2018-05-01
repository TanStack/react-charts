import React, { Component } from 'react'
//
import Sidebar from 'components/Sidebar'
import ChartConfig from 'components/ChartConfig'
import Code from 'components/Code'

import { Chart, Axis, Series, Tooltip } from 'react-charts'

let sourceCode

class Story extends Component {
  render () {
    return (
      <Sidebar>
        <ChartConfig show={['elementType', 'interaction', 'tooltipPosition']}>
          {({
 elementType, interaction, tooltipPosition, data,
}) => (
            // @source sourceCode
  <Chart data={data} interaction={interaction}>
    <Axis primary type="time" position="bottom" />
    <Axis type="linear" position="left" stacked />
    <Series type={elementType} />
    <Tooltip focus={tooltipPosition} />
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
