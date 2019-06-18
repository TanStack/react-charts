// @source sourceCode
import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import { Chart } from '../../../dist'

let sourceCode

export default () => {
  const { data, randomizeData } = useChartConfig({
    series: 8,
    datums: 3,
    dataType: 'ordinal'
  })

  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { position: 'left', type: 'linear', stacked: false }
    ],
    []
  )

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <Box>
        <Chart data={data} series={series} axes={axes} tooltip showVoronoi />
      </Box>
      <br />
      <pre>
        <code>{sourceCode}</code>
      </pre>
    </>
  )
}
// @source sourceCode
