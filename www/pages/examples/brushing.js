// @source sourceCode
import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from '../../../dist'

let sourceCode

export default () => {
  const [{ min, max }, setState] = React.useState({
    min: null,
    max: null
  })

  const { data, randomizeData } = useChartConfig({
    series: 10
  })

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: 'time',
        position: 'bottom',
        hardMin: min,
        hardMax: max
      },
      {
        type: 'linear',
        position: 'left'
      }
    ],
    [max, min]
  )

  const brush = React.useMemo(
    () => ({
      onSelect: brushData => {
        setState({
          min: Math.min(brushData.start, brushData.end),
          max: Math.max(brushData.start, brushData.end)
        })
      }
    }),
    []
  )

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <button
        onClick={() =>
          setState({
            min: null,
            max: null
          })
        }
      >
        Reset Zoom
      </button>
      <br />
      <br />
      <Box>
        <Chart data={data} axes={axes} primaryCursor tooltip brush={brush} />
      </Box>
      <br />
      <SyntaxHighlighter code={sourceCode} />
    </>
  )
}
// @source sourceCode
