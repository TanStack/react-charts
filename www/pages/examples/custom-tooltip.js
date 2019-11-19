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
    series: 10,
    dataType: 'ordinal'
  })

  const series = React.useMemo(() => ({ type: 'bar' }), [])

  const axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'ordinal' },
      { position: 'left', type: 'linear', stacked: true }
    ],
    []
  )

  const tooltip = React.useMemo(
    () => ({
      render: ({ datum, primaryAxis, getStyle }) => {
        return <CustomTooltip {...{ getStyle, primaryAxis, datum }} />
      }
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
          primaryCursor
          tooltip={tooltip}
        />
      </Box>
      <br />
      <SyntaxHighlighter code={sourceCode} />
    </>
  )
}

function CustomTooltip({ getStyle, primaryAxis, datum }) {
  const data = React.useMemo(
    () =>
      datum
        ? [
            {
              data: datum.group.map(d => ({
                primary: d.series.label,
                secondary: d.secondary,
                color: getStyle(d).fill
              }))
            }
          ]
        : [],
    [datum, getStyle]
  )
  return datum ? (
    <div
      style={{
        color: 'white',
        pointerEvents: 'none'
      }}
    >
      <h3
        style={{
          display: 'block',
          textAlign: 'center'
        }}
      >
        {primaryAxis.format(datum.primary)}
      </h3>
      <div
        style={{
          width: '300px',
          height: '200px',
          display: 'flex'
        }}
      >
        <Chart
          data={data}
          dark
          series={{ type: 'bar' }}
          axes={[
            {
              primary: true,
              position: 'bottom',
              type: 'ordinal'
            },
            {
              position: 'left',
              type: 'linear'
            }
          ]}
          getDatumStyle={datum => ({
            color: datum.originalDatum.color
          })}
          primaryCursor={{
            value: datum.seriesLabel
          }}
        />
      </div>
    </div>
  ) : null
}
// @source sourceCode
