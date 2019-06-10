// @source sourceCode
import React from 'react'

//

import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import { Chart } from '../../../dist'

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
      render: ({ datum, primaryAxis, getStyle }) =>
        datum ? (
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
                data={datum.group}
                dark
                series={{ type: 'bar' }}
                getSeries={data => [
                  {
                    datums: data.map(d => ({
                      x: d.seriesLabel,
                      y: d.secondary,
                      color: getStyle(d).fill
                    }))
                  }
                ]}
                axes={[
                  {
                    type: 'ordinal',
                    primary: true,
                    position: 'bottom'
                  },
                  {
                    type: 'linear',
                    stacked: true,
                    position: 'left'
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
      <pre>
        <code>{sourceCode}</code>
      </pre>
    </>
  )
}
// @source sourceCode
