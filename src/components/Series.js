import React from 'react'

//

import { ChartConnect } from '../utils/Context'
import Utils from '../utils/Utils'
import Selectors from '../utils/Selectors'

const debug = process.env.NODE_ENV === 'development'

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
  '#cd82ad',
]

const modePrimary = 'primary'
const modeSecondary = 'secondary'

const getType = (type, data, i) => {
  // Allow dynamic types
  const typeGetter =
    typeof type === 'function' && type.prototype.isReactComponent ? () => type : type
  return typeGetter(data, i)
}

class Series extends React.Component {
  static defaultProps = {
    getStyles: () => ({}),
    getDatumStyles: () => ({}),
  }
  componentDidMount () {
    this.updateMaterializedData(this.props)
    this.updateStackData(this.props)
  }
  componentDidUpdate (oldProps) {
    // If any of the following change,
    // we need to update the materializedData
    if (Utils.shallowCompare(oldProps, this.props, ['type', 'preMaterializedData'])) {
      return this.updateMaterializedData(this.props)
    }

    // If any of the following change,
    // we need to update the stack
    if (
      Utils.shallowCompare(oldProps, this.props, [
        'materializedData',
        'axes',
        'seriesKey',
        'primaryAxes',
        'secondaryAxes',
        'groupMode',
      ])
    ) {
      this.updateStackData(this.props)
    }
  }
  updateMaterializedData (props) {
    const { preMaterializedData, type, dispatch } = props

    // We need preMaterializedData to proceed
    if (!preMaterializedData) {
      return
    }

    dispatch(state => ({
      ...state,
      materializedData: preMaterializedData
        .map((series, index) => {
          const SeriesComponent = getType(type, series, index)
          if (debug && !SeriesComponent) {
            console.error(series)
            throw new Error(
              `An invalid series component was passed for the series above (index: ${index}.`
            )
          }
          return {
            ...series,
            Component: SeriesComponent,
          }
        })
        .map((series, i, all) => {
          const seriesTypeIndex = all.filter((d, j) => j < i && d.Component === series.Component)
            .length
          return {
            ...series,
            seriesTypeIndex,
            datums: series.datums.map(datum => ({
              ...datum,
              seriesTypeIndex,
            })),
          }
        }),
    }))
  }
  updateStackData (props) {
    const {
      materializedData, primaryAxes, secondaryAxes, groupMode,
    } = props

    // We need materializedData and both axes to continue
    if (!materializedData || !primaryAxes.length || !secondaryAxes.length) {
      return
    }

    // If the axes are ready, let's decorate the materializedData for visual plotting
    // const secondaryStacked = secondaryAxes.stacked

    // Make sure we're mapping x and y to the correct axes
    const xKey = primaryAxes.find(d => d.vertical) ? 'secondary' : 'primary'
    const yKey = primaryAxes.find(d => d.vertical) ? 'primary' : 'secondary'
    const xAxes = primaryAxes.find(d => d.vertical) ? secondaryAxes : primaryAxes
    const yAxes = primaryAxes.find(d => d.vertical) ? primaryAxes : secondaryAxes

    // "totals" are kept per secondaryAxis and used for bases if secondaryAxis stacking is enabled
    const scaleTotals = secondaryAxes.map(() => ({}))
    materializedData.forEach(series => {
      const axisIndex = Utils.getAxisIndexByAxisID(secondaryAxes, series.secondaryAxisID)
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
      const primaryAxisIndex = Utils.getAxisIndexByAxisID(primaryAxes, series.primaryAxisID)
      const primaryAxis = primaryAxes[primaryAxisIndex]
      const secondaryAxisIndex = Utils.getAxisIndexByAxisID(secondaryAxes, series.secondaryAxisID)
      const secondaryAxis = secondaryAxes[secondaryAxisIndex]
      return {
        ...series,
        datums: series.datums.map(d => {
          const datum = {
            ...d,
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
              datum.totalValue = datum.baseValue + (validPoint ? datum.xValue : 0)
              // Update the totals
              scaleTotals[secondaryAxisIndex][d.primary][totalKey] = datum.totalValue
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
              datum.totalValue = datum.baseValue + (validPoint ? datum.yValue : 0)
              // Update the totals
              scaleTotals[secondaryAxisIndex][d.primary][totalKey] = datum.totalValue
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
      if (debug && !series.Component.plotDatum) {
        throw new Error(
          `Could not find a [SeriesType].plotDatum() static method for the series Component above (index: ${i})`
        )
      }

      const primaryAxisIndex = Utils.getAxisIndexByAxisID(primaryAxes, series.primaryAxisID)
      const primaryAxis = primaryAxes[primaryAxisIndex]
      const secondaryAxisIndex = Utils.getAxisIndexByAxisID(secondaryAxes, series.secondaryAxisID)
      const secondaryAxis = secondaryAxes[secondaryAxisIndex]
      const xAxisIndex = Utils.getAxisIndexByAxisID(xAxes, series[`${xKey}AxisID`])
      const xAxis = xAxes[xAxisIndex]
      const yAxisIndex = Utils.getAxisIndexByAxisID(yAxes, series[`${yKey}AxisID`])
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

    // Do any data grouping ahead of time
    if ([modePrimary, modeSecondary].includes(groupMode)) {
      const datumsByGrouping = {}

      stackData.forEach(series => {
        series.datums.filter(d => d.defined).forEach(datum => {
          const axisKey = String(groupMode === modePrimary ? datum.primary : datum.secondary)

          datumsByGrouping[axisKey] = datumsByGrouping[axisKey] || []
          datumsByGrouping[axisKey].push(datum)
        })
      })

      stackData.forEach(series => {
        series.datums.forEach(datum => {
          const axisKey = String(groupMode === modePrimary ? datum.primary : datum.secondary)

          datum.group = datumsByGrouping[axisKey]
        })
      })
    }

    // Not we need to precalculate all of the possible status styles by
    // calling the seemingly 'live' getStyles, and getDatumStyles callbacks ;)
    stackData = stackData.map((series, i) => {
      if (debug && !series.Component.buildStyles) {
        throw new Error(
          `Could not find a SeriesType.buildStyles() static method for the series Component above (index: ${i})`
        )
      }
      const result = series.Component.buildStyles(series, {
        // Make sure we are using a thunk to get the most recent getStyles and getDatumStyles
        getStyles: (...args) => this.props.getStyles(...args),
        getDatumStyles: (...args) => this.props.getDatumStyles(...args),
        defaultColors,
      })

      return result || series
    })

    this.props.dispatch(state => ({
      ...state,
      stackData,
    }))
  }
  render () {
    const {
      type, getStyles, getDatumStyles, stackData, ...rest
    } = this.props

    if (!stackData) {
      return null
    }

    const reversedStackData = [...stackData].reverse() // For proper svg stacking

    return (
      <g className="Series">
        {reversedStackData.map(stack => {
          const StackCmp = getType(type, stack, stack.id)
          return <StackCmp {...rest} key={stack.id} series={stack} stackData={stackData} />
        })}
      </g>
    )
  }
}

export default ChartConnect(() => {
  const selectors = {
    primaryAxes: Selectors.primaryAxes(),
    secondaryAxes: Selectors.secondaryAxes(),
  }
  return state => ({
    primaryAxes: selectors.primaryAxes(state),
    secondaryAxes: selectors.secondaryAxes(state),
    preMaterializedData: state.preMaterializedData,
    materializedData: state.materializedData,
    stackData: state.stackData,
    tooltip: state.tooltip,
    hovered: state.hovered,
    selected: state.selected,
    groupMode: state.groupMode,
  })
})(Series)
