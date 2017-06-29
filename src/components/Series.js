import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { quadtree as QuadTree } from 'd3-quadtree'
//
import Selectors from '../utils/Selectors'
import Utils from '../utils/Utils'

import { Transition } from 'react-move'

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

const getType = (type, data, i) => {
  // Allow dynamic types
  const typeGetter = typeof type === 'function' &&
    type.prototype.isReactComponent
    ? () => type
    : type
  return typeGetter(data, i)
}

class Series extends PureComponent {
  static defaultProps = {
    getStyles: d => ({}),
    getDataStyles: d => ({}),
  }
  componentDidMount () {
    this.updateStackData(this.props)
  }
  componentWillReceiveProps (newProps) {
    const oldProps = this.props

    // If any of the following change,
    // we need to update the stack
    if (
      newProps.materializedData !== oldProps.materializedData ||
      newProps.axes !== oldProps.axes ||
      newProps.type !== oldProps.type ||
      newProps.seriesKey !== oldProps.seriesKey ||
      newProps.primaryAxis !== oldProps.primaryAxis ||
      newProps.secondaryAxis !== oldProps.secondaryAxis
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
  updateStackData (props) {
    const {
      type,
      getStyles,
      getDataStyles,
      //
      materializedData,
      primaryAxis,
      secondaryAxis,
    } = props

    // We need materializedData to proceed
    if (!materializedData) {
      return
    }

    // If the axes are not ready, just provide the materializedData
    if (!primaryAxis || !secondaryAxis) {
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

    let stackData = materializedData.map((series, seriesIndex) => {
      const SeriesComponent = getType(type, series, seriesIndex) || {}
      return {
        ...series,
        type: SeriesComponent.SeriesType,
        data: series.data.map((d, index) => {
          const datum = {
            ...d,
            x: d[xKey],
            y: d[yKey],
            base: 0,
          }
          if (secondaryStacked) {
            let start = totals[d.primary]
            // Stack the x or y values (according to axis positioning)
            if (primaryAxis.vertical) {
              // Should we use positive or negative base?
              let key = datum.x >= 0 ? 'positive' : 'negative'
              // Assign the base
              datum.base = start[key]
              // Add the value to the base
              datum.x = datum.base + datum.x
              // Update the totals
              totals[d.primary][key] = datum.x
            } else {
              // Should we use positive or negative base?
              let key = datum.y >= 0 ? 'positive' : 'negative'
              // Assign the base
              datum.base = start[key]
              // Add the value to the base
              datum.y = datum.base + datum.y
              // Update the totals
              totals[d.primary][key] = datum.y
            }
          }
          return datum
        }),
      }
    })

    // Now, scale the datapoints to their axis coordinates
    // (mutation is okay here, since we have already made a materialized copy)
    stackData.forEach(series => {
      series.data.forEach((d, index) => {
        // Data for cartesian charts
        if (
          series.type === 'Line' ||
          series.type === 'Area' ||
          series.type === 'Bar'
        ) {
          d.x = xScale(d.x)
          d.y = yScale(d.y)
          d.base = primaryAxis.vertical ? xScale(d.base) : yScale(d.base)
          // Adjust non-bar elements for ordinal scales
          if (series.type !== 'Bar') {
            if (xAxis.type === 'ordinal') {
              d.x += xAxis.tickOffset
            }
            if (yAxis.type === 'ordinal') {
              d.y += yAxis.tickOffset
            }
          }

          // Set the default focus point
          d.focus = {
            x: d.x,
            y: d.y,
          }

          // Adjust the focus point for specific elements
          if (series.type === 'Bar') {
            if (!xAxis.vertical) {
              d.focus.x = d.x + xAxis.tickOffset
            }
            if (!yAxis.vertical) {
              d.focus.y = d.y + yAxis.tickOffset
            }
          }
        } else if (series.type === 'Pie') {
          // data for Radial charts
          d.focus = primaryAxis.scale(d)
          d.x = d.focus.x
          d.y = d.focus.y
        }
      })
    })

    // Not we need to precalculate all of the possible status styles by
    // calling the seemingly 'live' getStyles, and getDataStyles callbacks ;)
    stackData.forEach(series => {
      const defaults = series.type !== 'Pie'
        ? {
            // Pass some sane defaults
          color: defaultColors[series.index % (defaultColors.length - 1)],
        }
        : {}

      series.statusStyles = Utils.getStatusStyles(series, getStyles, defaults)

      // We also need to decorate each datum in the same fashion
      series.data.forEach(datum => {
        if (series.type === 'Pie') {
          defaults.color =
            defaultColors[datum.index % (defaultColors.length - 1)]
        }
        datum.statusStyles = Utils.getStatusStyles(datum, getDataStyles, {
          ...defaults,
          ...series.statusStyles.default,
        })
      })
    })

    const allPoints = []

    stackData.forEach(s => {
      s.data.forEach(d => {
        allPoints.push(d)
      })
    })

    const quadTree = QuadTree().x(d => d.x).y(d => d.y).addAll(allPoints)

    this.props.dispatch(
      state => ({
        ...state,
        stackData,
        quadTree,
      }),
      {
        type: 'stackData',
      }
    )
  }
  render () {
    const { type, getStyles, getDataStyles, ...rest } = this.props
    const { stackData } = this

    if (!stackData) {
      return null
    }

    return (
      <Transition
        data={stackData} // The stack is reversed for proper z-index painting
        getKey={(d, i) => d.id}
        update={d => ({
          visibility: 1,
        })}
        enter={(d, i) => ({
          visibility: 0,
        })}
        leave={d => ({
          visibility: 0,
        })}
        ignore={['visibility']}
        duration={500}
      >
        {inters => {
          return (
            <g className='Series'>
              {inters.map((inter, i) => {
                const StackCmp = getType(type, inter.data, inter.data.id)
                return (
                  <StackCmp
                    {...rest}
                    key={inter.key}
                    series={inter.data}
                    stackData={stackData}
                    visibility={inter.state.visibility}
                  />
                )
              })}
            </g>
          )
        }}
      </Transition>
    )
  }
}

export default Connect(
  () => {
    const selectors = {
      primaryAxis: Selectors.primaryAxis(),
      secondaryAxis: Selectors.secondaryAxis(),
    }
    return (state, props) => {
      return {
        materializedData: state.materializedData,
        stackData: state.stackData,
        primaryAxis: selectors.primaryAxis(state),
        secondaryAxis: selectors.secondaryAxis(state),
        hovered: state.hovered,
        selected: state.selected,
      }
    }
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
  }
)(Series)
