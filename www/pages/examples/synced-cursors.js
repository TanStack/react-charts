// @source sourceCode
import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from 'react-charts'

let sourceCode

export default function SyncedCursors() {
  const [
    { primaryCursorValue, secondaryCursorValue },
    setState
  ] = React.useState({
    primaryCursorValue: null,
    secondaryCursorValue: null
  })

  const axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'time' },
      { position: 'left', type: 'linear' }
    ],
    []
  )

  const primaryCursor = React.useMemo(
    () => ({
      value: primaryCursorValue
    }),
    [primaryCursorValue]
  )

  const secondaryCursor = React.useMemo(
    () => ({
      value: secondaryCursorValue
    }),
    [secondaryCursorValue]
  )

  const onFocus = React.useCallback(datum => {
    setState({
      primaryCursorValue: datum ? datum.primary : null,
      secondaryCursorValue: datum ? datum.secondary : null
    })
  }, [])

  return (
    <>
      <pre>
        {JSON.stringify({ primaryCursorValue, secondaryCursorValue }, null, 2)}
      </pre>
      <Box width={500} height={250}>
        <ChartWithData
          axes={axes}
          onFocus={onFocus}
          primaryCursor={primaryCursor}
          secondaryCursor={secondaryCursor}
          tooltip
        />
      </Box>
      <br />
      <Box width={600} height={200}>
        <ChartWithData
          axes={axes}
          onFocus={onFocus}
          primaryCursor={primaryCursor}
          secondaryCursor={secondaryCursor}
          tooltip
        />
      </Box>
      <br />
      <Box width={700} height={150}>
        <ChartWithData
          axes={axes}
          onFocus={onFocus}
          primaryCursor={primaryCursor}
          secondaryCursor={secondaryCursor}
          tooltip
        />
      </Box>
      <br />
      <SyntaxHighlighter code={sourceCode} />
    </>
  )
}

function ChartWithData(props) {
  const { data } = useChartConfig({
    series: 10
  })

  return <Chart data={data} {...props} />
}
// @source sourceCode
