// @source sourceCode
import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from 'react-charts'

let sourceCode

export default () => {
  const {
    data,
    primaryAxisShow,
    secondaryAxisShow,
    randomizeData,
    Options
  } = useChartConfig({
    series: 10,
    show: ['primaryAxisShow', 'secondaryAxisShow']
  })

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        position: 'bottom',
        type: 'time',
        show: primaryAxisShow
      },
      { position: 'left', type: 'linear', show: secondaryAxisShow }
    ],
    [primaryAxisShow, secondaryAxisShow]
  )

  return (
    <>
      {Options}
      <br />
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <Box>
        <Chart data={data} axes={axes} tooltip />
      </Box>
      <br />
      <SyntaxHighlighter code={sourceCode} />
    </>
  )
}
// @source sourceCode
