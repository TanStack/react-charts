import React, { Component } from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default class extends Component {
  constructor () {
    super()
    this.state = {
      min: null,
      max: null,
    }
  }
  render () {
    const { min, max } = this.state

    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              min: null,
              max: null,
            })
          }
        >
          Reset Zoom
        </button>

        <br />
        <br />
        <ChartConfig dataType="time">
          {({ data }) => (
            <Chart
              data={data}
              axes={[
                {
                  primary: true,
                  type: 'time',
                  position: 'bottom',
                  hardMin: min,
                  hardMax: max,
                },
                {
                  type: 'linear',
                  position: 'left',
                },
              ]}
              primaryCursor
              tooltip
              brush={{
                onSelect: brushData => {
                  this.setState({
                    min: Math.min(brushData.start, brushData.end),
                    max: Math.max(brushData.start, brushData.end),
                  })
                },
              }}
            />
          )}
        </ChartConfig>
      </div>
    )
  }
}
