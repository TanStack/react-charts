import React from 'react'
import styled from 'react-emotion'
//

import ChartConfig from 'components/ChartConfig'
import { Chart } from '../../../dist'
import lagRadar from '../lag-radar'

export default class StressTest extends React.Component {
  state = {
    primaryCursorValue: null,
    secondaryCursorValue: null,
    activeSeriesIndex: -1,
  }
  componentDidMount () {
    this.destroy = lagRadar({
      frames: 50, // number of frames to draw, more = worse performance
      speed: 0.0017, // how fast the sweep moves (rads per ms)
      size: 300, // outer frame px
      inset: 3, // circle inset px
      parent: document.body, // DOM node to attach to
    })
  }
  componentWillUnmount () {
    this.destroy()
  }
  render () {
    const { primaryCursorValue, secondaryCursorValue, activeSeriesIndex } = this.state
    const onFocus = datum => {
      this.setState({
        primaryCursorValue: datum ? datum.primary : null,
        secondaryCursorValue: datum ? datum.secondary : null,
        activeSeriesIndex: datum ? datum.series.id : -1,
      })
    }
    return (
      <div>
        <h3>10 Charts * 10 Series * 20 Datums w/ Synced Cursors & Series Highlighting</h3>
        <ChartConfig series={10} datums={20}>
          {({ data }) => (
            <React.Fragment>
              {[...new Array(10)].map((d, i) => (
                <ChartConfig key={i} height={70} canRandomize={false}>
                  {() => (
                    <Chart
                      data={data}
                      axes={[
                        { primary: true, position: 'bottom', type: 'time' },
                        { position: 'left', type: 'linear' },
                      ]}
                      tooltip
                      onFocus={onFocus}
                      primaryCursor={{
                        value: primaryCursorValue,
                      }}
                      secondaryCursor={{
                        value: secondaryCursorValue,
                      }}
                      getSeriesStyle={series => ({
                        opacity:
                          activeSeriesIndex > -1 ? (series.id === activeSeriesIndex ? 1 : 0.1) : 1,
                      })}
                    />
                  )}
                </ChartConfig>
              ))}
            </React.Fragment>
          )}
        </ChartConfig>
      </div>
    )
  }
}
