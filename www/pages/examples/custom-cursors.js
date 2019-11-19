// @source sourceCode
import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from 'react-charts'

let sourceCode

export default () => {
  const { data, randomizeData } = useChartConfig({
    series: 10
  })
  const series = React.useMemo(() => ({ type: 'area' }), [])
  const axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'time' },
      { position: 'left', type: 'linear', stacked: true }
    ],
    []
  )
  const primaryCursor = React.useMemo(
    () => ({
      render: props => (
        <span style={{ fontSize: '1rem' }}>
          <span role="img" aria-label="icon">
            🕑
          </span>{' '}
          {(props.formattedValue || '').toString()}
        </span>
      )
    }),
    []
  )
  const secondaryCursor = React.useMemo(
    () => ({
      render: props => (
        <span style={{ fontSize: '1rem' }}>
          <span role="img" aria-label="icon">
            👍
          </span>{' '}
          {(props.formattedValue || '').toString()}
        </span>
      )
    }),
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
          series={series}
          axes={axes}
          primaryCursor={primaryCursor}
          secondaryCursor={secondaryCursor}
        />
      </Box>
      <br />
      <SyntaxHighlighter code={sourceCode} />
    </>
  )
}
// @source sourceCode
