import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import { Chart } from '../../../dist'

export default () => {
  const { data, randomizeData } = useChartConfig({
    series: 10
  })

  const getSeries = React.useCallback(
    data =>
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
    []
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
        <Chart
          data={data}
          getSeries={getSeries}
          series={series}
          axes={axes}
          tooltip
        />
      </Box>
    </>
  )
}
