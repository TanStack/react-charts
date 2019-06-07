import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import { Chart } from '../../../dist'

export default () => {
  const { data, randomizeData } = useChartConfig({
    series: 10
  })
  const series = React.useMemo(
    () => ({
      type: 'area'
    }),
    []
  )
  const axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'time' },
      { position: 'left', type: 'linear', stacked: true }
    ],
    []
  )
  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <Box>
        <Chart data={data} series={series} axes={axes} tooltip />
      </Box>
    </>
  )
}
