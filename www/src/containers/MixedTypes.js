import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import { Chart } from '../../../dist'

export default () => {
  const { data, randomizeData } = useChartConfig({
    series: 10,
    dataType: 'ordinal',
    useR: true
  })

  const series = React.useCallback(
    (s, i) => ({
      type:
        i % 4 === 0
          ? 'bubble'
          : i % 3 === 0
          ? 'line'
          : i % 2 === 0
          ? 'area'
          : 'bar'
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'ordinal' },
      { position: 'left', type: 'linear', min: 0, stacked: true }
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
