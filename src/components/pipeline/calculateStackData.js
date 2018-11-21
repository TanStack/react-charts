import { useMemo } from 'use-react-hooks'
//
import Utils from '../../utils/Utils'

import {
  groupModeSingle,
  groupModeSeries,
  groupModePrimary,
  groupModeSecondary
} from '../../utils/Constants'

const defaultColors = [
  '#4ab5eb',
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

export default ({
  materializedData,
  primaryAxes,
  secondaryAxes,
  yAxes,
  yKey,
  xAxes,
  xKey,
  groupMode
}) => {
  // Make stackData
  return useMemo(
    () => {
      // We need materializedData and both axes to continue
      if (!primaryAxes.length || !secondaryAxes.length) {
        throw new Error('A primary and secondary axis is required!')
      }

      // If the axes are ready, let's decorate the materializedData for visual plotting
      // "totals" are kept per secondaryAxis and used for bases if secondaryAxis stacking is enabled
      const scaleTotals = secondaryAxes.map(() => ({}))
      materializedData.forEach(series => {
        const axisIndex = Utils.getAxisIndexByAxisID(
          secondaryAxes,
          series.secondaryAxisID
        )
        series.datums.forEach(datum => {
          scaleTotals[axisIndex][datum.primary] = {
            negative: 0,
            positive: 0
          }
        })
      })

      // Determine the correct primary and secondary values for each axis
      // Also calculate bases and totals if either axis is stacked
      let stackData = materializedData.map(series => {
        const primaryAxisIndex = Utils.getAxisIndexByAxisID(
          primaryAxes,
          series.primaryAxisID
        )
        const primaryAxis = primaryAxes[primaryAxisIndex]
        const secondaryAxisIndex = Utils.getAxisIndexByAxisID(
          secondaryAxes,
          series.secondaryAxisID
        )
        const secondaryAxis = secondaryAxes[secondaryAxisIndex]
        return {
          ...series,
          datums: series.datums.map(d => {
            const datum = {
              ...d,
              xValue: d[xKey],
              yValue: d[yKey],
              baseValue: 0
            }
            if (secondaryAxis.stacked) {
              const start = scaleTotals[secondaryAxisIndex][d.primary]
              // Stack the x or y values (according to axis positioning)
              if (primaryAxis.vertical) {
                // Is this a valid point?
                const validPoint = Utils.isValidPoint(datum.xValue)
                // Should we use positive or negative base?
                const totalKey = datum.xValue >= 0 ? 'positive' : 'negative'
                // Assign the base
                datum.baseValue = start[totalKey]
                // Add the value for a total
                datum.totalValue =
                  datum.baseValue + (validPoint ? datum.xValue : 0)
                // Update the totals
                scaleTotals[secondaryAxisIndex][d.primary][totalKey] =
                  datum.totalValue
                // Make the total the new value
                datum.xValue = validPoint ? datum.totalValue : null
              } else {
                // Is this a valid point?
                const validPoint = Utils.isValidPoint(datum.yValue)
                // Should we use positive or negative base?
                const totalKey = datum.yValue >= 0 ? 'positive' : 'negative'
                // Assign the base
                datum.baseValue = start[totalKey]
                // Add the value to the base
                datum.totalValue =
                  datum.baseValue + (validPoint ? datum.yValue : 0)
                // Update the totals
                scaleTotals[secondaryAxisIndex][d.primary][totalKey] =
                  datum.totalValue
                // Make the total the new value
                datum.yValue = validPoint ? datum.totalValue : null
              }
            }
            return datum
          })
        }
      })

      stackData.forEach(series => {
        series.datums.forEach(datum => {
          datum.series = series
        })
      })

      // Use the plotDatum method on each series
      stackData.forEach((series, i) => {
        if (!series.Component.plotDatum) {
          throw new Error(
            `Could not find a [SeriesType].plotDatum() static method for the series Component above (index: ${i})`
          )
        }

        const primaryAxisIndex = Utils.getAxisIndexByAxisID(
          primaryAxes,
          series.primaryAxisID
        )
        const secondaryAxisIndex = Utils.getAxisIndexByAxisID(
          secondaryAxes,
          series.secondaryAxisID
        )

        const primaryAxis = primaryAxes[primaryAxisIndex]
        const secondaryAxis = secondaryAxes[secondaryAxisIndex]

        const xAxisIndex = Utils.getAxisIndexByAxisID(
          xAxes,
          series[`${xKey}AxisID`]
        )
        const yAxisIndex = Utils.getAxisIndexByAxisID(
          yAxes,
          series[`${yKey}AxisID`]
        )

        const xAxis = xAxes[xAxisIndex]
        const yAxis = yAxes[yAxisIndex]

        series.datums = series.datums.map(d => {
          // Data for cartesian charts
          const result = series.Component.plotDatum(d, {
            primaryAxis,
            secondaryAxis,
            xAxis,
            yAxis
          })

          return result || d
        })
      })

      // Do any data grouping ahead of time using
      if ([groupModeSingle, groupModeSeries].includes(groupMode)) {
        for (
          let seriesIndex = 0;
          seriesIndex < stackData.length;
          seriesIndex++
        ) {
          const series = stackData[seriesIndex]
          for (
            let datumIndex = 0;
            datumIndex < series.datums.length;
            datumIndex++
          ) {
            const datum = series.datums[datumIndex]
            datum.group =
              groupMode === groupModeSeries ? datum.series.datums : [datum]
          }
        }
      } else if ([groupModePrimary, groupModeSecondary].includes(groupMode)) {
        const datumsByGrouping = {}

        for (
          let seriesIndex = 0;
          seriesIndex < stackData.length;
          seriesIndex++
        ) {
          const series = stackData[seriesIndex]

          for (
            let datumIndex = 0;
            datumIndex < series.datums.length;
            datumIndex++
          ) {
            const datum = series.datums[datumIndex]
            if (!datum.defined) {
              continue
            }
            const axisKey = String(
              groupMode === groupModePrimary ? datum.primary : datum.secondary
            )

            datumsByGrouping[axisKey] = datumsByGrouping[axisKey] || []
            datumsByGrouping[axisKey].push(datum)
          }
        }

        for (
          let seriesIndex = 0;
          seriesIndex < stackData.length;
          seriesIndex++
        ) {
          const series = stackData[seriesIndex]
          for (
            let datumIndex = 0;
            datumIndex < series.datums.length;
            datumIndex++
          ) {
            const datum = series.datums[datumIndex]
            const axisKey = String(
              groupMode === groupModePrimary ? datum.primary : datum.secondary
            )

            datum.group = datumsByGrouping[axisKey]
          }
        }
      }

      // Not we need to precalculate all of the possible status styles by
      // calling the seemingly 'live' getStyles, and getDatumStyles callbacks ;)
      stackData = stackData.map((series, i) => {
        if (!series.Component.buildStyles) {
          throw new Error(
            `Could not find a SeriesType.buildStyles() static method for the series Component above (index: ${i})`
          )
        }
        const result = series.Component.buildStyles(series, {
          defaultColors
        })

        return result || series
      })

      return stackData
    },
    [primaryAxes, secondaryAxes, groupMode]
  )
}
