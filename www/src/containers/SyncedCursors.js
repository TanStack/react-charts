import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

class Story extends Component {
  state = {
    primaryCursorValue: null,
    secondaryCursorValue: null,
  }
  render () {
    const { primaryCursorValue, secondaryCursorValue } = this.state
    const onFocus = datum => {
      this.setState({
        primaryCursorValue: datum ? datum.primary : null,
        secondaryCursorValue: datum ? datum.secondary : null,
      })
    }
    return (
      <React.Fragment>
        <pre>{JSON.stringify({ primaryCursorValue, secondaryCursorValue }, null, 2)}</pre>
        <ChartConfig width={500} height={250}>
          {({ data }) => (
            <Chart
              data={data}
              type="line"
              axes={[
                { primary: true, position: 'bottom', type: 'time' },
                { position: 'left', type: 'linear' },
              ]}
              onFocus={onFocus}
              primaryCursor={{
                value: primaryCursorValue,
              }}
              secondaryCursor={{
                value: secondaryCursorValue,
              }}
            />
          )}
        </ChartConfig>
        <br />
        <ChartConfig width={600} height={200}>
          {({ data }) => (
            <Chart
              data={data}
              type="line"
              axes={[
                { primary: true, position: 'bottom', type: 'time' },
                { position: 'left', type: 'linear' },
              ]}
              onFocus={onFocus}
              primaryCursor={{
                value: primaryCursorValue,
              }}
              secondaryCursor={{
                value: secondaryCursorValue,
              }}
            />
          )}
        </ChartConfig>
        <br />
        <ChartConfig width={700} height={150}>
          {({ data }) => (
            <Chart
              data={data}
              type="line"
              axes={[
                { primary: true, position: 'bottom', type: 'time' },
                { position: 'left', type: 'linear' },
              ]}
              onFocus={onFocus}
              primaryCursor={{
                value: primaryCursorValue,
              }}
              secondaryCursor={{
                value: secondaryCursorValue,
              }}
            />
          )}
        </ChartConfig>
      </React.Fragment>
    )
  }
}

export default () => <Story />
