import React from 'react'

//

import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

export default () => (
  <ChartConfig show={['primaryAxisShow', 'secondaryAxisShow']}>
    {({ data, primaryAxisShow, secondaryAxisShow }) => (
      <Chart
        data={data}
        axes={[
          {
            primary: true,
            position: 'bottom',
            type: 'time',
            show: primaryAxisShow,
          },
          { position: 'left', type: 'linear', show: secondaryAxisShow },
        ]}
        primaryCursor
        secondaryCursor
        tooltip
      />
    )}
  </ChartConfig>
)
