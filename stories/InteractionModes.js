import React, { Component } from 'react'
//
import ChartConfig from './components/ChartConfig'
import { Chart, Axis, Data, Tooltip, Cursor } from '../src'
//
// import CodeHighlight from './components/codeHighlight.js'

const colors = [
  '#0f7db4',
  '#fc6868',
  '#DECF3F',
  '#60BD68',
  '#FAA43A',
  '#c63b89',
  '#1aaabe',
  '#734fe9',
  '#1828bd',
  '#cd82ad'
]

class Line extends Component {
  render () {
    return (
      <ChartConfig>
        {({
          elementType,
          interactionMode,
          tooltipPosition,
          tooltipAlign,
          snapCursor,
          primaryAxisType,
          secondaryAxisType,
          primaryAxisPosition,
          secondaryAxisPosition,
          data
        }) => (
          <Chart
            data={data}
            getData={d => d.data}
            interaction={interactionMode}
          >
            <Axis
              primary
              type={primaryAxisType}
              position={primaryAxisPosition}
            />
            <Axis
              type={secondaryAxisType}
              position={secondaryAxisPosition}
              stacked
            />
            <Data
              type={elementType}
              getProps={(series, i) => ({
                style: {
                  color: colors[series.index],
                  opacity: series.inactive ? 0.2 : 1
                }
              })}
              getDataProps={(datum, i) => ({
                style: {
                  r: elementType !== 'bubble' ? (datum.active ? 5 : 1) : undefined,
                  color: colors[datum.seriesIndex],
                  opacity: datum.inactive ? 0.2 : 1
                }
              })}
            />
            <Cursor
              primary
              snap={Boolean(snapCursor)}
            />
            <Cursor />
            <Tooltip
              position={tooltipPosition} // center, top, bottom, left, right, cursor, closest, (datums, resolvedCursor) => ({x, y})
              align={tooltipAlign} // auto, top, left, right, bottom, center,
            />
          </Chart>
        )}
      </ChartConfig>
    )
  }
}

export default () => <Line />
