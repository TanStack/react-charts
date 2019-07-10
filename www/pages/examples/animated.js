// @source sourceCode
import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from '../../../dist'

let sourceCode

export default () => {
  const { data, elementType, randomizeData, Options } = useChartConfig({
    series: 10,
    useR: true,
    show: ['elementType']
  })

  const series = React.useMemo(
    () => ({
      type: elementType,
      showPoints: false
    }),
    [elementType]
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: true }
    ],
    []
  )

  const getSeriesStyle = React.useCallback(
    () => ({
      transition: 'all .5s ease'
    }),
    []
  )

  const getDatumStyle = React.useCallback(
    () => ({
      transition: 'all .5s ease'
    }),
    []
  )

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      {Options}
      <br />
      <Box>
        <Chart
          data={data}
          series={series}
          axes={axes}
          getSeriesStyle={getSeriesStyle}
          getDatumStyle={getDatumStyle}
          tooltip
        />
      </Box>
      <br />
      <SyntaxHighlighter code={sourceCode} />
    </>
  )
}
// @source sourceCode
