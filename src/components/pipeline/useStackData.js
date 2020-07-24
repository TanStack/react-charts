import React from 'react'
//
import Utils from '../../utils/Utils'

import {
  groupingSingle,
  groupingSeries,
  groupingPrimary,
  groupingSecondary,
} from '../../utils/Constants'

export default ({
  materializedData,
  primaryAxes,
  secondaryAxes,
  yAxes,
  yKey,
  xAxes,
  xKey,
  grouping,
  defaultColors,
}) => {
  // Make stackData
  return React.useMemo(() => {
    // We need materializedData and both axes to continue
    if (!primaryAxes.length || !secondaryAxes.length) {
      throw new Error('A primary and secondary axis is required!')
    }

    // If the axes are ready, let's decorate the materializedData for visual plotting
    // "totals" are kept per secondaryAxis and used for bases if secondaryAxis stacking is enabled
    const scaleTotals = secondaryAxes.map(() => ({}))
    materializedData.forEach(series => {
      const axisIndex = Utils.getAxisIndexByAxisId(
        secondaryAxes,
        series.secondaryAxisId
      )
      series.datums.forEach(datum => {
        scaleTotals[axisIndex][datum.primary] = {
          negative: 0,
          positive: 0,
        }
      })
    })

    // Determine the correct primary and secondary values for each axis
    // Also calculate bases and totals if either axis is stacked
    let stackData = materializedData.map(series => {
      const primaryAxisIndex = Utils.getAxisIndexByAxisId(
        primaryAxes,
        series.primaryAxisId
      )
      const primaryAxis = primaryAxes[primaryAxisIndex]
      const secondaryAxisIndex = Utils.getAxisIndexByAxisId(
        secondaryAxes,
        series.secondaryAxisId
      )
      const secondaryAxis = secondaryAxes[secondaryAxisIndex]
      return {
        ...series,
        primaryAxis,
        secondaryAxis,
        datums: series.datums.map(d => {
          const datum = {
            ...d,
            primaryAxis,
            secondaryAxis,
            xValue: d[xKey],
            yValue: d[yKey],
            baseValue: 0,
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
        }),
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

      const primaryAxisIndex = Utils.getAxisIndexByAxisId(
        primaryAxes,
        series.primaryAxisId
      )
      const secondaryAxisIndex = Utils.getAxisIndexByAxisId(
        secondaryAxes,
        series.secondaryAxisId
      )

      const primaryAxis = primaryAxes[primaryAxisIndex]
      const secondaryAxis = secondaryAxes[secondaryAxisIndex]

      const xAxisIndex = Utils.getAxisIndexByAxisId(
        xAxes,
        series[`${xKey}AxisId`]
      )
      const yAxisIndex = Utils.getAxisIndexByAxisId(
        yAxes,
        series[`${yKey}AxisId`]
      )

      const xAxis = xAxes[xAxisIndex]
      const yAxis = yAxes[yAxisIndex]

      series.datums = series.datums.map(d => {
        // Data for cartesian charts
        const result = series.Component.plotDatum(d, {
          primaryAxis,
          secondaryAxis,
          xAxis,
          yAxis,
        })

        return result || d
      })
    })

    // Do any data grouping ahead of time using
    if ([groupingSingle, groupingSeries].includes(grouping)) {
      for (let seriesIndex = 0; seriesIndex < stackData.length; seriesIndex++) {
        const series = stackData[seriesIndex]
        for (
          let datumIndex = 0;
          datumIndex < series.datums.length;
          datumIndex++
        ) {
          const datum = series.datums[datumIndex]
          datum.group =
            grouping === groupingSeries ? datum.series.datums : [datum]
        }
      }
    } else if ([groupingPrimary, groupingSecondary].includes(grouping)) {
      const datumsByGrouping = {}

      for (let seriesIndex = 0; seriesIndex < stackData.length; seriesIndex++) {
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
            grouping === groupingPrimary ? datum.primary : datum.secondary
          )

          datumsByGrouping[axisKey] = datumsByGrouping[axisKey] || []
          datumsByGrouping[axisKey].push(datum)
        }
      }

      for (let seriesIndex = 0; seriesIndex < stackData.length; seriesIndex++) {
        const series = stackData[seriesIndex]
        for (
          let datumIndex = 0;
          datumIndex < series.datums.length;
          datumIndex++
        ) {
          const datum = series.datums[datumIndex]
          const axisKey = String(
            grouping === groupingPrimary ? datum.primary : datum.secondary
          )

          datum.group = datumsByGrouping[axisKey]
        }
      }
    }

    // Not we need to precalculate all of the possible status styles by
    // calling the seemingly 'live' getSeriesStyle, and getDatumStyle callbacks ;)
    stackData = stackData.map((series, i) => {
      if (!series.Component.buildStyles) {
        throw new Error(
          `Could not find a SeriesType.buildStyles() static method for the series Component above (index: ${i})`
        )
      }
      const result = series.Component.buildStyles(series, {
        defaultColors,
      })

      return result || series
    })

    return stackData
  }, [
    primaryAxes,
    secondaryAxes,
    materializedData,
    grouping,
    xKey,
    yKey,
    xAxes,
    yAxes,
    defaultColors,
  ])
}
