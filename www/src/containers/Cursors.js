import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

class Story extends Component {
  render () {
    return (
      <ChartConfig>
        {({ data }) => (
          <Chart
            data={data}
            axes={[
              { primary: true, position: 'bottom', type: 'time' },
              { position: 'left', type: 'linear' },
            ]}
            primaryCursor
            secondaryCursor
            tooltip
          />
        )}
      </ChartConfig>
    )
  }
}

export default () => <Story />
