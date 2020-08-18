import React from 'react'
import useChartState from '../hooks/useChartState'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import usePrevious from '../hooks/usePrevious'
import { round } from '../utils/Utils'

const radiansToDegrees = r => r * (180 / Math.PI)
const degreesToRadians = d => d * (Math.PI / 180)

const getElBox = el => {
  var rect = el.getBoundingClientRect()
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
  }
}

export default function useMeasure({
  elRef,
  rotation,
  setRotation,
  id,
  type,
  position,
  tickSizeInner,
  tickSizeOuter,
  transform,
  barSize,
  labelRotation,
  tickPadding,
  tickCount,
  minTickCount,
  maxTickCount,
  vertical,
  gridWidth,
  gridHeight,
  ticks,
  scale,
}) {
  const disallowListRef = React.useRef([])
  const axisDimensionsHistoryRef = React.useRef([])

  const [axisDimensions, setChartState] = useChartState(
    state => state.axisDimensions
  )

  const measureDimensions = React.useCallback(() => {
    if (!elRef.current) {
      if (axisDimensions[position]?.[id]) {
        // If the entire axis is hidden, then we need to remove the axis dimensions
        setChartState(state => {
          const newAxes = state.axisDimensions[position] || {}
          delete newAxes[id]
          return {
            ...state,
            axisDimensions: {
              ...state.axisDimensions,
              [position]: newAxes,
            },
          }
        })
      }
      return
    }

    let gridSize = !vertical ? gridWidth : gridHeight
    let calculatedTickCount = tickCount
    let width = 0
    let height = 0
    let top = 0
    let bottom = 0
    let left = 0
    let right = 0

    // Measure the distances between ticks
    let smallestTickGap = gridSize // This is just a ridiculously large tick spacing that would never happen (hopefully)

    Array(...elRef.current.querySelectorAll('.tick'))
      .map(el => getElBox(el))
      .reduce((prev, current) => {
        if (prev) {
          smallestTickGap = Math.min(
            smallestTickGap,
            vertical ? current.top - prev.top : current.left - prev.left
          )
        }

        return current
      }, false)

    const domainDims = getElBox(elRef.current.querySelector('.domain'))

    const measureLabelDims = Array(
      ...elRef.current.querySelectorAll('.tickLabel-measurer')
    ).map(el => getElBox(el))

    const realLabelDims = Array(
      ...elRef.current.querySelectorAll('.tickLabel')
    ).map(el => getElBox(el))

    // Determine the largest labels on the axis
    const [widestMeasureLabel, tallestMeasureLabel] = measureLabelDims.reduce(
      (labels, d) => {
        let [largestW = d, largestH = d] = labels
        if (d.width > 0 && d.width > largestW.width) {
          largestW = d
        }
        if (d.height > 0 && d.height > largestH.height) {
          largestH = d
        }
        return [largestW, largestH]
      },
      []
    )

    // Determine the largest labels on the axis
    const [widestRealLabel, tallestRealLabel] = realLabelDims.reduce(
      (labels, d) => {
        let [largestW = d, largestH = d] = labels
        if (d.width > 0 && d.width > largestW.width) {
          largestW = d
        }
        if (d.height > 0 && d.height > largestH.height) {
          largestH = d
        }
        return [largestW, largestH]
      },
      []
    )

    // Auto-fit ticks in "auto" tick mode
    if (tickCount === 'auto' && type !== 'ordinal') {
      const largestMeasureLabelSize = !vertical
        ? widestMeasureLabel?.width || 0
        : tallestMeasureLabel?.height || 0

      // if it's on, determine how many ticks we could display if they were all flat
      // How many ticks can we fit in the available axis space?
      const estimatedTickCount = Math.floor(
        (gridSize + largestMeasureLabelSize + tickPadding) /
          (largestMeasureLabelSize + tickPadding)
      )

      calculatedTickCount = Math.max(
        Math.min(estimatedTickCount, maxTickCount),
        minTickCount
      )
    }

    if (!vertical) {
      const newRotation =
        (widestMeasureLabel?.width || 0) + tickPadding > smallestTickGap
          ? labelRotation
          : 0

      if (newRotation !== rotation) {
        setRotation(position === 'top' ? -newRotation : newRotation)
      }
    }

    // Axis overflow measurements
    if (!vertical) {
      const leftMostLabelDim = realLabelDims.reduce((d, labelDim) =>
        labelDim.left < d.left ? labelDim : d
      )
      const rightMostLabelDim = realLabelDims.reduce((d, labelDim) =>
        labelDim.right > d.right ? labelDim : d
      )

      left = round(
        Math.max(0, domainDims.left - leftMostLabelDim?.left),
        10,
        Math.ceil
      )

      right = round(
        Math.max(0, rightMostLabelDim?.right - domainDims.right),
        10,
        Math.ceil
      )

      height = round(
        Math.max(tickSizeInner, tickSizeOuter) +
          tickPadding +
          (tallestRealLabel?.height || 0),
        10,
        Math.ceil
      )
    } else {
      const topMostLabelDim = realLabelDims.reduce((d, labelDim) =>
        labelDim.top < d.top ? labelDim : d
      )

      const bottomMostLabelDim = realLabelDims.reduce((d, labelDim) =>
        labelDim.bottom > d.bottom ? labelDim : d
      )

      top = round(
        Math.max(0, domainDims.top - topMostLabelDim?.top),
        10,
        Math.ceil
      )

      bottom = round(
        Math.max(0, bottomMostLabelDim?.bottom - domainDims.bottom),
        10,
        Math.ceil
      )

      width = round(
        Math.max(tickSizeInner, tickSizeOuter) +
          tickPadding +
          (widestRealLabel?.width || 0),
        10,
        Math.ceil
      )
    }

    const newDimensions = {
      width,
      height,
      top,
      bottom,
      left,
      right,
      tickCount: calculatedTickCount,
    }

    // Only update the axisDimensions if something has changed
    if (
      !axisDimensions?.[position]?.[id] ||
      Object.keys(newDimensions).some(key => {
        return newDimensions[key] !== axisDimensions[position][id][key]
      })
    ) {
      setChartState(state => ({
        ...state,
        axisDimensions: {
          ...state.axisDimensions,
          [position]: {
            ...(state.axisDimensions[position] || {}),
            [id]: newDimensions,
          },
        },
      }))
    }
  }, [
    axisDimensions,
    elRef,
    gridHeight,
    gridWidth,
    id,
    labelRotation,
    maxTickCount,
    minTickCount,
    position,
    rotation,
    setChartState,
    setRotation,
    tickCount,
    tickPadding,
    tickSizeInner,
    tickSizeOuter,
    type,
    vertical,
  ])

  // Measure after if needed
  useIsomorphicLayoutEffect(() => {
    measureDimensions()
  }, [measureDimensions])
}
