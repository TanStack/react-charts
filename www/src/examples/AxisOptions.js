import React from 'react'

//

import Sidebar from 'components/Sidebar'
import ChartConfig from './components/ChartConfig'

import { Chart, Axis, Series, Tooltip, Line, Cursor } from '../../../src'

export default () => (
  <Sidebar>
    <ChartConfig show={['primaryAxisShow', 'secondaryAxisShow']}>
      {({ data, primaryAxisShow, secondaryAxisShow }) => (
        <Chart data={data} getPrimary={d => new Date(d.x)}>
          <Axis primary type="time" position="bottom" show={primaryAxisShow} />
          <Axis type="linear" position="left" show={secondaryAxisShow} />
          <Series type={Line} />
          <Cursor primary />
          <Cursor />
          <Tooltip />
        </Chart>
      )}
    </ChartConfig>
  </Sidebar>
)
