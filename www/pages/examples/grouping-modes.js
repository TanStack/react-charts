// @source sourceCode
import React from 'react'
import Tree from 'react-json-tree'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from '../../../dist'

let sourceCode

export default () => {
  const [{ clicked, focused, hovered }, setState] = React.useState({
    clicked: null,
    focused: null,
    hovered: null
  })

  const {
    data,
    grouping,
    elementType,
    randomizeData,
    Options
  } = useChartConfig({
    series: 10,
    show: ['elementType', 'grouping']
  })

  const axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'time' },
      { position: 'left', type: 'linear' }
    ],
    []
  )

  return (
    <>
      {Options}
      <br />
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <Box>
        <Chart
          data={data}
          grouping={grouping}
          type={elementType}
          axes={axes}
          primaryCursor
          secondaryCursor
          tooltip
          onClick={datum => setState(old => ({ ...old, clicked: datum }))}
          onFocus={datum => setState(old => ({ ...old, focused: datum }))}
          onHover={pointer => setState(old => ({ ...old, hovered: pointer }))}
        />
      </Box>
      <br />
      <div>Hovered:</div>
      <Tree hideRoot data={hovered} />
      <div>Focused:</div>
      <Tree hideRoot data={focused} />
      <div>Clicked:</div>
      <Tree hideRoot data={clicked} />
      <br />
      <SyntaxHighlighter code={sourceCode} />
    </>
  )
}
// @source sourceCode
