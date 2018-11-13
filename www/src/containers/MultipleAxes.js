import React from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default () => (
  <ChartConfig dataType="time">
    {({ data }) => (
      <Chart
        data={data}
        type="line"
        getSeries={data =>
          data.map(
            (d, i) =>
              i % 2 === 0
                ? {
                    ...d,
                    secondaryAxisID: 'First Metric',
                  }
                : {
                    ...d,
                    datums: d.datums.map(f => ({
                      ...f,
                      y: f.y * 5,
                    })),
                    secondaryAxisID: 'Second Metric',
                  }
          )
        }
        axes={[
          { primary: true, type: 'time', position: 'bottom' },
          {
            type: 'linear',
            id: 'First Metric',
            min: 0,
            position: 'left',
          },
          {
            type: 'linear',
            id: 'Second Metric',
            min: 0,
            position: 'right',
          },
        ]}
        primaryCursor
        secondaryCursor
        tooltip
      />
    )}
  </ChartConfig>
)
