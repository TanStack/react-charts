import React from 'react'
import useChartState from '../hooks/useChartState'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import { axisTypeOrdinal, axisTypeTime, axisTypeUtc } from '../utils/Constants'
import { round } from '../utils/Utils'

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
  labelRotation,
  tickPadding,
  tickCount,
  minTickCount,
  maxTickCount,
  vertical,
  gridWidth,
  gridHeight,
  show,
}) {
  const [estimatedTickCount, setChartState] = useChartState(
    state => state.estimatedTickCounts[id]
  )
  const [tickLabelSkipIndices] = useChartState(
    state => state.tickLabelSkipIndices[id]
  )
  const [axisDimension] = useChartState(
    state => state.axisDimensions?.[position]?.[id]
  )

  const measureDimensions = React.useCallback(() => {
    if (show) {
      // Remeasure when show changes
    }

    if (!elRef.current) {
      if (axisDimension) {
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
    let width = 0
    let height = 0
    let top = 0
    let bottom = 0
    let left = 0
    let right = 0

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

    let smallestTickGap = gridSize

    if (measureLabelDims.length > 1) {
      measureLabelDims.reduce((prev, current) => {
        if (prev) {
          smallestTickGap = Math.min(
            smallestTickGap,
            vertical ? current.top - prev.top : current.left - prev.left
          )
        }

        return current
      }, false)
    }

    const largestMeasureLabelSize = !vertical
      ? widestMeasureLabel?.width || 0
      : tallestMeasureLabel?.height || 0

    // Auto-fit ticks in "auto" tick mode for non-ordinal scales
    if (tickCount === 'auto' && type !== 'ordinal') {
      // if it's on, determine how many ticks we could display if they were all flat
      // How many ticks can we fit in the available axis space?
      let calculatedTickCount = Math.floor(
        (gridSize + largestMeasureLabelSize + tickPadding * 2) /
          (largestMeasureLabelSize + tickPadding * 2)
      )

      calculatedTickCount = Math.max(
        Math.min(calculatedTickCount, maxTickCount),
        minTickCount
      )

      if (calculatedTickCount !== estimatedTickCount) {
        setChartState(old => ({
          ...old,
          estimatedTickCounts: {
            ...old.estimatedTickCounts,
            [id]: calculatedTickCount,
          },
        }))
      }
    }

    let newTickLabelSkipIndices = []

    // Visual Skipping of time-based axis labels if they overlap (rotation not included)
    if (!rotation && [axisTypeTime, axisTypeUtc].includes(type)) {
      realLabelDims.reduce((last, d) => {
        if (
          round(last.right, 5, Math.ceil) >
          round(d.left - tickPadding, 5, Math.ceil)
        ) {
          newTickLabelSkipIndices.push(realLabelDims.indexOf(d))
          return last
        }
        return d
      })
    }

    if (
      JSON.stringify(newTickLabelSkipIndices) !==
      JSON.stringify(tickLabelSkipIndices)
    ) {
      setChartState(old => ({
        ...old,
        tickLabelSkipIndices: {
          ...old.tickLabelSkipIndices,
          [id]: newTickLabelSkipIndices,
        },
      }))
    }

    // Rotate ticks for non-time horizontal axes
    if (!vertical && type === axisTypeOrdinal) {
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
      const leftMostLabelDim = realLabelDims.length
        ? realLabelDims.reduce((d, labelDim) =>
            labelDim.left < d.left ? labelDim : d
          )
        : null
      const rightMostLabelDim = realLabelDims.length
        ? realLabelDims.reduce((d, labelDim) =>
            labelDim.right > d.right ? labelDim : d
          )
        : null

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
    }

    // Only update the axisDimensions if something has changed
    if (
      !axisDimension ||
      Object.keys(newDimensions).some(key => {
        return newDimensions[key] !== axisDimension[key]
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
    axisDimension,
    elRef,
    estimatedTickCount,
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
    show,
    tickCount,
    tickLabelSkipIndices,
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
