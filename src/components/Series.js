import React, { Component } from 'react'
import { Connect } from 'react-state'

//

import { NodeGroup } from './ReactMove'

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

class Series extends Component {
  static defaultProps = {
    getStyles: () => ({}),
    getDataStyles: () => ({}),
  }
  componentDidMount () {
    this.updateMaterializedData(this.props)
    this.updateStackData(this.props)
  }
  componentWillReceiveProps (newProps) {
    const oldProps = this.props

    // If any of the following change,
    // we need to update the materializedData
    if (
      newProps.type !== oldProps.type ||
      newProps.preMaterializedData !== oldProps.preMaterializedData
    ) {
      this.updateMaterializedData(newProps)
    }

    // If any of the following change,
    // we need to update the stack
    if (
      newProps.materializedData !== oldProps.materializedData ||
      newProps.axes !== oldProps.axes ||
      newProps.seriesKey !== oldProps.seriesKey ||
      newProps.primaryAxis !== oldProps.primaryAxis ||
      newProps.secondaryAxis !== oldProps.secondaryAxis ||
      newProps.groupMode !== oldProps.groupMode
    ) {
      this.updateStackData(newProps)
    }
  }
  shouldComponentUpdate (nextProps) {
    if (nextProps.stackData !== this.props.stackData) {
      this.stackData = [...nextProps.stackData].reverse() // For proper svg stacking
      return true
    }
    return false
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
            console.log(series)
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
            data: series.data.map(datum => ({
              ...datum,
              seriesTypeIndex,
            })),
          }
        }),
    }))
  }
  updateStackData (props) {
    const {
      getStyles,
      getDataStyles,
      //
      materializedData,
      primaryAxis,
      secondaryAxis,
      groupMode,
    } = props

    // We need materializedData and both axes to continue
    if (!materializedData || !primaryAxis || !secondaryAxis) {
      return
    }

    // If the axes are ready, let's decorate the materializedData for visual plotting
    const secondaryStacked = secondaryAxis.stacked

    // Make sure we're mapping x and y to the correct axes
    const xKey = primaryAxis.vertical ? 'secondary' : 'primary'
    const yKey = primaryAxis.vertical ? 'primary' : 'secondary'
    const xAxis = primaryAxis.vertical ? secondaryAxis : primaryAxis
    const yAxis = primaryAxis.vertical ? primaryAxis : secondaryAxis
    const xScale = xAxis.scale
    const yScale = yAxis.scale

    // "totals" are kept and used for bases if secondaryAxis stacking is enabled
    const totals = {}
    if (secondaryStacked) {
      materializedData.forEach(series => {
        series.data.forEach(datum => {
          totals[datum.primary] = {
            negative: 0,
            positive: 0,
          }
        })
      })
    }

    // Determine the correct primary and secondary values for each axis
    // Also calculate bases and totals if either axis is stacked
    let stackData = materializedData.map(series => ({
      ...series,
      data: series.data.map(d => {
        const datum = {
          ...d,
          xValue: d[xKey],
          yValue: d[yKey],
          baseValue: 0,
        }
        if (secondaryStacked) {
          const start = totals[d.primary]
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
            totals[d.primary][totalKey] = datum.totalValue
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
            totals[d.primary][totalKey] = datum.totalValue
            // Make the total the new value
            datum.yValue = validPoint ? datum.totalValue : null
          }
        }
        return datum
      }),
    }))

    stackData.forEach(series => {
      series.data.forEach(datum => {
        datum.series = series
      })
    })

    // Now, scale the datapoints to their axis coordinates
    // (mutation is okay here, since we have already made a materialized copy)
    stackData.forEach((series, i) => {
      if (debug && !series.Component.plotDatum) {
        console.log(series)
        throw new Error(
          `Could not find a [SeriesType].plotDatum() static method for the series Component above (index: ${i})`
        )
      }
      series.data = series.data.map(d => {
        // Data for cartesian charts
        const result = series.Component.plotDatum(d, {
          xScale,
          yScale,
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
        series.data.filter(d => d.defined).forEach(datum => {
          const axisKey = String(groupMode === modePrimary ? datum.primary : datum.secondary)

          console.log(axisKey)

          datumsByGrouping[axisKey] = datumsByGrouping[axisKey] || []
          datumsByGrouping[axisKey].push(datum)
        })
      })

      stackData.forEach(series => {
        series.data.forEach(datum => {
          const axisKey = String(groupMode === modePrimary ? datum.primary : datum.secondary)

          datum.group = datumsByGrouping[axisKey]
        })
      })
    }

    // Not we need to precalculate all of the possible status styles by
    // calling the seemingly 'live' getStyles, and getDataStyles callbacks ;)
    stackData = stackData.map(series => {
      if (debug && !series.Component.buildStyles) {
        throw new Error(
          `Could not find a SeriesType.plotDatum() static method for the series Component above (index: ${i})`
        )
      }
      const result = series.Component.buildStyles(series, {
        getStyles,
        getDataStyles,
        defaultColors,
      })

      return result || series
    })

    const allPoints = []

    stackData.forEach(s => {
      s.data.forEach(d => {
        d.cursorPoints.forEach(p => {
          allPoints.push(p)
        })
      })
    })

    this.props.dispatch(
      state => ({
        ...state,
        stackData,
      }),
      {
        type: 'stackData',
      }
    )
  }
  render () {
    const { type, getDataStyles, ...rest } = this.props
    const { stackData } = this

    if (!stackData) {
      return null
    }

    return (
      <g className="Series">
        {stackData.map(stack => {
          const StackCmp = getType(type, stack, stack.id)
          return <StackCmp {...rest} key={stack.id} series={stack} stackData={stackData} />
        })}
      </g>
    )
  }
}

export default Connect(
  () => {
    const selectors = {
      primaryAxis: Selectors.primaryAxis(),
      secondaryAxis: Selectors.secondaryAxis(),
    }
    return state => ({
      preMaterializedData: state.preMaterializedData,
      materializedData: state.materializedData,
      stackData: state.stackData,
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      hovered: state.hovered,
      selected: state.selected,
      groupMode: state.groupMode,
    })
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
  }
)(Series)
