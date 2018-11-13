import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

class Story extends Component {
  render () {
    return (
      <ChartConfig show={['elementType', 'interaction', 'tooltipPosition']} useR>
        {({
 elementType, interaction, tooltipPosition, data,
}) => (
  <Chart
    data={data}
    interaction={interaction}
    type={elementType}
    axes={[
              { primary: true, position: 'bottom', type: 'time' },
              { position: 'left', type: 'linear', stacked: true },
            ]}
    primaryCursor
    secondaryCursor
    tooltip={{
              focus: tooltipPosition,
            }}
          />
        )}
      </ChartConfig>
    )
  }
}

export default () => <Story />
