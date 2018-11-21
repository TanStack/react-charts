import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

class Story extends Component {
  render () {
    return (
      <ChartConfig show={['elementType', 'tooltipAnchor']} useR>
        {({ elementType, tooltipAnchor, data }) => (
          <Chart
            data={data}
            series={{
              type: elementType,
            }}
            axes={[
              { primary: true, position: 'bottom', type: 'time' },
              { position: 'left', type: 'linear' },
            ]}
            primaryCursor
            secondaryCursor
            tooltip={{
              anchor: tooltipAnchor,
            }}
          />
        )}
      </ChartConfig>
    )
  }
}

export default () => <Story />
