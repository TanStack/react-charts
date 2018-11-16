import React from 'react'

//

import ChartConfig from 'components/ChartConfig'
import { Chart } from '../../../dist'
import lagRadar from '../lag-radar'

export default class StressTest extends React.Component {
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
    return (
      <ChartConfig series={10}>
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
                    primaryCursor
                    secondaryCursor
                    tooltip
                  />
                )}
              </ChartConfig>
            ))}
          </React.Fragment>
        )}
      </ChartConfig>
    )
  }
}
