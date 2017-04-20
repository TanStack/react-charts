import React, { PureComponent } from 'react'
import { Connect } from 'codux'
import { quadtree as QuadTree } from 'd3-quadtree'
//
import Selectors from '../utils/Selectors'
import Utils from '../utils/Utils'

import { Transition } from 'react-move'
import Line from './Line'
import Area from './Area'
import Bar from './Bar'
import Bubble from './Bubble'

const stackTypes = {
  line: Line,
  area: Area,
  bar: Bar,
  bubble: Bubble
}

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

class Series extends PureComponent {
  static defaultProps = {
    type: 'line',
    getStyles: d => ({}),
    getDataStyles: d => ({})
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
      this.stackData = nextProps.stackData.reverse() // For proper svg stacking
      return true
    }
    return false
  }
  updateStackData (props) {
    const {
      getStyles,
      getDataStyles,
      //
      materializedData,
      primaryAxis,
      secondaryAxis
    } = props

    // If the axes are not ready, just provide the materializedData
    if (!materializedData || !primaryAxis || !secondaryAxis) {
      return
    }

    // If the axes are ready, let's decorate the materializedData for visual plotting
    const secondaryStacked = secondaryAxis.stacked
    // "totals" are kept and used for bases if secondaryAxis stacking is enabled
    const totals = secondaryStacked && materializedData.map(s => {
      return s.data.map(d => 0)
    })
    .reduce((prev, current) => prev.length > current.length ? prev : current, [])
    .map(d => ({
      negative: 0,
      positive: 0
    }))

    // Make sure we're mapping x and y to the correct axes
    const xKey = primaryAxis.vertical ? 'secondary' : 'primary'
    const yKey = primaryAxis.vertical ? 'primary' : 'secondary'
    const xScale = primaryAxis.vertical ? secondaryAxis.scale : primaryAxis.scale
    const yScale = primaryAxis.vertical ? primaryAxis.scale : secondaryAxis.scale

    let stackData = materializedData.map((series, seriesIndex) => {
      return {
        ...series,
        data: series.data.map((d, index) => {
          const datum = {
            ...d,
            x: d[xKey],
            y: d[yKey],
            base: 0
          }
          if (secondaryStacked) {
            let start = totals[index]
            // Stack the x or y values (according to axis positioning)
            if (primaryAxis.vertical) {
              // Should we use positive or negative base?
              let key = datum.x >= 0 ? 'positive' : 'negative'
              // Assign the base
              datum.base = start[key]
              // Add the value to the base
              datum.x = datum.base + datum.x
              // Update the totals
              totals[index][key] = datum.x
            } else {
              // Should we use positive or negative base?
              let key = datum.y >= 0 ? 'positive' : 'negative'
              // Assign the base
              datum.base = start[key]
              // Add the value to the base
              datum.y = datum.base + datum.y
              // Update the totals
              totals[index][key] = datum.y
            }
          }
          return datum
        })
      }
    })

    // Now, scale the datapoints to their axis coordinates
    stackData.forEach((series) => {
      series.data.forEach((d, index) => {
        d.x = xScale(d.x)
        d.y = yScale(d.y)
        d.base = primaryAxis.vertical ? xScale(d.base) : yScale(d.base)
      })
    })

    stackData.forEach(series => {
      const defaults = {
        // Pass some sane defaults
        color: defaultColors[series.index % (defaultColors.length - 1)]
      }

      const getSeriesWithStatus = (hoverStatus, selectedStatus) => ({
        ...series,
        hovered: hoverStatus,
        selected: selectedStatus
      })

      const statusStyles = {
        'default': getStyles(getSeriesWithStatus(false, false)),
        'notHoveredSelected': getStyles(getSeriesWithStatus(false, true)),
        'hoveredNotSelected': getStyles(getSeriesWithStatus(true, false)),
        'hoveredSelected': getStyles(getSeriesWithStatus(true, true))
      }

      Object.keys(statusStyles).forEach(key => {
        statusStyles[key] = Utils.materializeStyles(statusStyles[key], defaults)
      })

      series.style = statusStyles.default
      series.statusStyles = statusStyles

      // We also need to decorate each datum in the same fashion
      series.data.forEach(datum => {
        const getDatumWithStatus = (hoverStatus, selectedStatus) => ({
          ...datum,
          hovered: hoverStatus,
          selected: selectedStatus
        })

        const datumStatusStyles = {
          'default': getDataStyles(getDatumWithStatus(false, false)),
          'notHoveredSelected': getDataStyles(getDatumWithStatus(false, true)),
          'hoveredNotSelected': getDataStyles(getDatumWithStatus(true, false)),
          'hoveredSelected': getDataStyles(getDatumWithStatus(true, true))
        }

        Object.keys(datumStatusStyles).forEach(key => {
          datumStatusStyles[key] = Utils.materializeStyles(datumStatusStyles[key], defaults)
        })

        datum.style = datumStatusStyles.default
        datum.datumStatusStyles = datumStatusStyles
      })
    })

    const allPoints = []

    stackData.forEach(s => {
      s.data.forEach(d => {
        allPoints.push(d)
      })
    })

    const quadTree = QuadTree()
      .x(d => d.x)
      .y(d => d.y)
      .addAll(allPoints)

    this.props.dispatch(state => ({
      ...state,
      stackData,
      quadTree
    }), {
      type: 'stackData'
    })
  }
  render () {
    const {
      type
    } = this.props

    const {
      stackData
    } = this

    if (!stackData) {
      return null
    }

    // Allow dynamic types
    const typeGetter = Utils.normalizeGetter(type)

    return (
      <Transition
        data={stackData} // The stack is reversed for proper z-index painting
        getKey={(d, i) => d.id}
        update={d => ({
          visibility: 1
        })}
        enter={(d, i) => ({
          visibility: 0
        })}
        leave={d => ({
          visibility: 0
        })}
        ignore={['visibility']}
        duration={500}
      >
        {(inters) => {
          return (
            <g
              className='Series'
            >
              {inters.map((inter, i) => {
                const resolvedType = typeGetter(inter.data, inter.data.id)
                const StackCmp = stackTypes[resolvedType]

                return (
                  <StackCmp
                    key={inter.key}
                    series={inter.data}
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

export default Connect(() => {
  const selectors = {
    primaryAxis: Selectors.primaryAxis(),
    secondaryAxis: Selectors.secondaryAxis()
  }
  return (state, props) => {
    return {
      materializedData: state.materializedData,
      stackData: state.stackData,
      stackData: state.stackData,
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      hovered: state.hovered,
      selected: state.selected
    }
  }
}, {
  filter: (oldState, newState, meta) => meta.type !== 'cursor'
})(Series)
