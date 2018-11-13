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
            type="area"
            axes={[
              { primary: true, position: 'bottom', type: 'time' },
              { position: 'left', type: 'linear', stacked: true },
            ]}
            primaryCursor={{
              render: props => (
                <span>
                  <span role="img" aria-label="icon">
                    🕑
                  </span>
                  {(props.formattedValue || '').toString()}
                </span>
              ),
            }}
            secondaryCursor={{
              render: props => (
                <span>
                  <span role="img" aria-label="icon">
                    👍
                  </span>
                  {(props.formattedValue || '').toString()}
                </span>
              ),
            }}
            tooltip
          />
        )}
      </ChartConfig>
    )
  }
}

export default () => <Story />
