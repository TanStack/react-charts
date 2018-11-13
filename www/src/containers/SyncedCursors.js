import React, { Component } from 'react'
//
import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

class Story extends Component {
  state = {
    cursorValue: null,
  }
  render () {
    const { cursorValue } = this.state
    return (
      <React.Fragment>
        {JSON.stringify({ cursorValue }, null, 2)}
        <ChartConfig width={600} height={200}>
          {({ data }) => (
            <Chart
              data={data}
              type="line"
              axes={[
                { primary: true, position: 'bottom', type: 'time' },
                { position: 'left', type: 'linear' },
              ]}
              primaryCursor={{
                value: cursorValue,
                onChange: cursor => {
                  this.setState({
                    cursorValue: cursor.show ? cursor.computedValue : null,
                  })
                },
              }}
            />
          )}
        </ChartConfig>
        <br />
        <ChartConfig width={200} height={100}>
          {({ data }) => (
            <Chart
              data={data}
              type="line"
              axes={[
                { primary: true, position: 'bottom', type: 'time' },
                { position: 'left', type: 'linear' },
              ]}
              primaryCursor={{
                value: cursorValue,
                onChange: cursor => {
                  this.setState({
                    cursorValue: cursor.show ? cursor.computedValue : null,
                  })
                },
              }}
            />
          )}
        </ChartConfig>
        <ChartConfig width={400} height={40}>
          {({ data }) => (
            <Chart
              data={data}
              type="line"
              axes={[
                { primary: true, position: 'bottom', type: 'time' },
                { position: 'left', type: 'linear' },
              ]}
              primaryCursor={{
                value: cursorValue,
                onChange: cursor => {
                  this.setState({
                    cursorValue: cursor.show ? cursor.computedValue : null,
                  })
                },
              }}
            />
          )}
        </ChartConfig>
      </React.Fragment>
    )
  }
}

export default () => <Story />
