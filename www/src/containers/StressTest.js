// @source sourceCode
import React from 'react'
//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import { Chart } from '../../../dist'
import lagRadar from '../lag-radar'

let sourceCode

export default function StressTest() {
  const [
    {
      chartCount,
      seriesCount,
      datumCount,
      primaryCursorValue,
      secondaryCursorValue,
      activeSeriesIndex
    },
    setState
  ] = React.useState({
    primaryCursorValue: null,
    secondaryCursorValue: null,
    activeSeriesIndex: -1,
    chartCount: 10,
    seriesCount: 10,
    datumCount: 20
  })

  React.useEffect(
    () =>
      lagRadar({
        frames: 60, // number of frames to draw, more = worse performance
        speed: 0.0017, // how fast the sweep moves (rads per ms)
        size: 300, // outer frame px
        inset: 3, // circle inset px
        parent: document.body // DOM node to attach to
      }),
    []
  )

  const { data, randomizeData } = useChartConfig({
    series: seriesCount,
    datums: datumCount
  })

  const onFocus = React.useCallback(datum => {
    setState(old => ({
      ...old,
      primaryCursorValue: datum ? datum.primary : null,
      secondaryCursorValue: datum ? datum.secondary : null,
      activeSeriesIndex: datum ? datum.series.id : -1
    }))
  }, [])

  const axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'time' },
      { position: 'left', type: 'linear' }
    ],
    []
  )

  const series = React.useMemo(
    () => ({
      showPoints: false
    }),
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

  const getSeriesStyle = React.useCallback(
    series => ({
      opacity:
        activeSeriesIndex > -1 ? (series.id === activeSeriesIndex ? 1 : 0.1) : 1
    }),
    [activeSeriesIndex]
  )

  return (
    <div>
      <h3>
        {chartCount} Charts * 10 Series * 20 Datums (
        {chartCount * seriesCount * datumCount} data elements) w/ Synced Cursors
        & Series Highlighting
      </h3>
      <label>
        Chart Count:{' '}
        <input
          type="number"
          min="1"
          value={chartCount}
          onChange={e =>
            e.persist() ||
            setState(old => ({ ...old, chartCount: parseInt(e.target.value) }))
          }
        />
      </label>
      <br />
      <label>
        Series Count:{' '}
        <input
          type="number"
          min="1"
          value={seriesCount}
          onChange={e =>
            e.persist() ||
            setState(old => ({ ...old, seriesCount: parseInt(e.target.value) }))
          }
        />
      </label>
      <br />
      <label>
        DatumCount Count:{' '}
        <input
          type="number"
          min="1"
          value={datumCount}
          onChange={e =>
            e.persist() ||
            setState(old => ({
              ...old,
              datumCount: parseInt(e.target.value)
            }))
          }
        />
      </label>
      <br />
      <br />
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      {[...new Array(chartCount)].map((d, i) => (
        <Box key={i} height={100} canRandomize={false}>
          <Chart
            data={data}
            tooltip
            {...{
              axes,
              series,
              primaryCursor,
              secondaryCursor,
              getSeriesStyle,
              onFocus
            }}
          />
        </Box>
      ))}
      <br />
      <pre>
        <code>{sourceCode}</code>
      </pre>
    </div>
  )
}
// @source sourceCode
