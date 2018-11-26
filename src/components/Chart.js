import React from 'react'
import PropTypes from 'prop-types'
import withHooks, {
  useEffect,
  useState,
  useMemo,
  useWhen
} from '../utils/hooks'
//
import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'

import useHyperResponsive from '../utils/useHyperResponsive'
import ChartInner from './ChartInner'

import calculateMaterializeData from './pipeline/calculateMaterializeData'
import calculateSeriesOptions, {
  seriesPropType
} from './pipeline/calculateSeriesOptions'
import calculateSeriesTypes from './pipeline/calculateSeriesTypes'
import calculateDimensions from './pipeline/calculateDimensions'
import calculateAxes, { axisShape } from './pipeline/calculateAxes'
import calculateStackData from './pipeline/calculateStackData'
import calculateTooltip, { tooltipShape } from './pipeline/calculateTooltip'
import calculateCursors, { cursorShape } from './pipeline/calculateCursors'

import {
  groupModeSingle,
  groupModeSeries,
  groupModePrimary,
  groupModeSecondary
} from '../utils/Constants'

function Chart(
  {
    data,
    groupMode,
    showVoronoi,
    dark,
    series,
    axes,
    primaryCursor,
    secondaryCursor,
    tooltip,
    brush,
    renderSVG,
    getSeries,
    getDatums,
    getLabel,
    getSeriesID,
    getPrimary,
    getSecondary,
    getR,
    getPrimaryAxisID,
    getSecondaryAxisID,
    getSeriesStyle,
    getDatumStyle,
    onClick,
    onFocus,
    onHover,
    getSeriesOrder,
    ...rest
  },
  ref
) {
  let [
    { focused, axisDimensions, offset: offsetState, padding, pointer },
    setChartState
  ] = useState({
    focused: null,
    axisDimensions: {},
    padding: {},
    offset: {},
    pointer: {}
  })

  const [{ width, height }, handleRef] = useHyperResponsive()

  let materializedData = calculateMaterializeData({
    getSeries,
    data,
    getSeriesID,
    getLabel,
    getPrimaryAxisID,
    getSecondaryAxisID,
    getDatums,
    getPrimary,
    getSecondary,
    getR
  })

  const seriesOptions = calculateSeriesOptions({
    materializedData,
    series
  })

  materializedData = calculateSeriesTypes({
    materializedData,
    seriesOptions
  })

  const { offset, gridX, gridY, gridWidth, gridHeight } = calculateDimensions({
    width,
    height,
    axisDimensions,
    padding,
    offset: offsetState
  })

  const {
    primaryAxes,
    secondaryAxes,
    xKey,
    yKey,
    xAxes,
    yAxes
  } = calculateAxes({
    axes,
    materializedData,
    gridHeight,
    gridWidth
  })

  const stackData = calculateStackData({
    materializedData,
    primaryAxes,
    secondaryAxes,
    yAxes,
    yKey,
    xAxes,
    xKey,
    groupMode
  })

  pointer = useMemo(
    () => {
      return {
        ...pointer,
        axisValues: [...primaryAxes, ...secondaryAxes].map(axis => ({
          axis,
          value: axis.scale.invert
            ? axis.scale.invert(pointer[axis.vertical ? 'y' : 'x'])
            : null
        }))
      }
    },
    [pointer]
  )

  focused = useMemo(
    () => {
      // Get the closest focus datum out of the datum group
      return focused ? Utils.getClosestPoint(pointer, focused.group) : null
    },
    [focused, pointer]
  )

  // keep the previous focused value around for animations
  const lastFocused = useWhen(focused, focused)

  // Calculate Tooltip
  tooltip = calculateTooltip({
    focused,
    tooltip,
    pointer,
    gridWidth,
    gridHeight
  })

  // Cursors
  ;[primaryCursor, secondaryCursor] = calculateCursors({
    primaryCursor,
    secondaryCursor,
    primaryAxes,
    secondaryAxes,
    focused,
    pointer,
    gridWidth,
    gridHeight,
    stackData
  })

  const originalOnClick = onClick
  onClick = e => {
    if (!originalOnClick) {
      return
    }
    e && e.persist && e.persist()
    originalOnClick(focused, e)
  }

  useEffect(
    () => {
      if (onFocus) {
        onFocus(focused)
      }
    },
    [focused]
  )

  useEffect(
    () => {
      if (onHover) {
        onHover(pointer)
      }
    },
    [pointer]
  )

  useEffect(
    () => {
      if (brush && pointer.released) {
        if (Math.abs(pointer.sourceX - pointer.x) < 20) {
          return
        }
        brush.onSelect({
          pointer: pointer.released,
          start: primaryAxes[0].scale.invert(pointer.sourceX),
          end: primaryAxes[0].scale.invert(pointer.x)
        })
      }
    },
    [pointer.released]
  )

  // Decorate the chartState with computed values (or ones we just
  // want to pass down through context)
  const chartState = {
    focused,
    lastFocused,
    pointer,
    tooltip,
    axisDimensions,
    offset,
    padding,
    width,
    height,
    brush,
    groupMode,
    showVoronoi,
    materializedData,
    stackData,
    primaryAxes,
    secondaryAxes,
    primaryCursor,
    secondaryCursor,
    gridX,
    gridY,
    gridWidth,
    gridHeight,
    dark,
    renderSVG,
    xKey,
    yKey,
    xAxes,
    yAxes,
    onClick,
    getSeriesStyle,
    getDatumStyle,
    seriesOptions,
    getSeriesOrder
  }

  const chartStateContextValue = [chartState, setChartState]

  return (
    <ChartContext.Provider value={chartStateContextValue}>
      <ChartInner handleRef={handleRef} {...rest} />
    </ChartContext.Provider>
  )
}

Chart.propTypes = {
  data: PropTypes.any.isRequired,
  groupMode: PropTypes.oneOf([
    groupModeSingle,
    groupModeSeries,
    groupModePrimary,
    groupModeSecondary
  ]).isRequired,
  showVoronoi: PropTypes.bool,
  dark: PropTypes.bool,
  series: seriesPropType,
  axes: PropTypes.arrayOf(axisShape),
  primaryCursor: cursorShape,
  secondaryCursor: cursorShape,
  tooltip: tooltipShape,
  renderSVG: PropTypes.func,
  getSeries: PropTypes.func.isRequired,
  getDatums: PropTypes.func.isRequired,
  getLabel: PropTypes.func.isRequired,
  getSeriesID: PropTypes.func.isRequired,
  getPrimary: PropTypes.func.isRequired,
  getSecondary: PropTypes.func.isRequired,
  getR: PropTypes.func.isRequired,
  getPrimaryAxisID: PropTypes.func.isRequired,
  getSecondaryAxisID: PropTypes.func.isRequired,
  getSeriesOrder: PropTypes.func.isRequired,
  getSeriesStyle: PropTypes.func,
  getDatumStyle: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onHover: PropTypes.func
}

Chart.defaultProps = {
  getSeries: d => d,
  getDatums: d => (Array.isArray(d) ? d : d.datums || d.data),
  getLabel: (d, i) => d.label || `Series ${i + 1}`,
  getSeriesID: (d, i) => i,
  getPrimary: d => (Array.isArray(d) ? d[0] : d.primary || d.x),
  getSecondary: d => (Array.isArray(d) ? d[1] : d.secondary || d.y),
  getR: d => (Array.isArray(d) ? d[2] : d.radius || d.r),
  getPrimaryAxisID: s => s.primaryAxisID,
  getSecondaryAxisID: s => s.secondaryAxisID,
  getSeriesStyle: () => ({}),
  getDatumStyle: () => ({}),
  getSeriesOrder: d => d,
  onHover: () => {},
  groupMode: groupModePrimary,
  showVoronoi: false
}

export default withHooks(Chart)
