// @source sourceCode
import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import { Chart } from '../../../dist'

let sourceCode

export default () => {
  let { data, randomizeData } = useChartConfig({
    series: 10
  })

  data = React.useMemo(
    () =>
      data.map((d, i) =>
        i % 2 === 0
          ? {
              ...d,
              secondaryAxisID: 'First Metric'
            }
          : {
              ...d,
              datums: d.datums.map(f => ({
                ...f,
                y: f.y * 5
              })),
              secondaryAxisID: 'Second Metric'
            }
      ),
    [data]
  )

  const series = React.useMemo(
    () => ({
      showPoints: false
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      {
        type: 'linear',
        id: 'First Metric',
        min: 0,
        position: 'left'
      },
      {
        type: 'linear',
        id: 'Second Metric',
        min: 0,
        position: 'right'
      }
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
      <br />
      <pre>
        <code>{sourceCode}</code>
      </pre>
    </>
  )
}
// @source sourceCode
