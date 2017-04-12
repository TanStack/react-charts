import React, { Component } from 'react'
//
import ChartConfig from './components/ChartConfig'
import { Chart, Axis, Series, Tooltip } from '../src'
//
// import CodeHighlight from './components/codeHighlight.js'

class Line extends Component {
  render () {
    return (
      <ChartConfig
        show={[
          'elementType',
          'interaction'
        ]}
      >
        {({
          elementType,
          interaction,
          data
        }) => (
          <Chart
            data={data}
            getData={d => d.data}
            interaction={interaction}
          >
            <Axis
              primary
              type='time'
              position='bottom'
            />
            <Axis
              type='linear'
              position='left'
              stacked
            />
            <Series
              type={elementType}
            />
            <Tooltip
              position='top'
            />
          </Chart>
        )}
      </ChartConfig>
    )
  }
}

export default () => <Line />
