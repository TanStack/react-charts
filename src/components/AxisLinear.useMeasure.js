import React from 'react'
import useChartState from '../hooks/useChartState'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
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
  position,
  tickSizeInner,
  tickSizeOuter,
  labelRotation,
  tickPadding,
  vertical,
  gridWidth,
  gridHeight,
  show,
}) {
  const [axisDimension, setChartState] = useChartState(
    state => state.axisDimensions?.[position]?.[id]
  )

  const measureDimensions = React.useCallback(() => {
    if (show) {
      // Remeasure when show changes
    }

    if (!elRef.current) {
      if (axisDimension) {
        console.log('remove axis')
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

    const domainDims = getElBox(elRef.current.querySelector('.domain'))

    const measureLabelDims = Array(
      ...elRef.current.querySelectorAll('.tickLabel-measurer')
    ).map(el => getElBox(el))

    const realLabelDims = Array(
      ...elRef.current.querySelectorAll('.tickLabel')
    ).map(el => getElBox(el))

    // Determine the largest labels on the axis
    const widestMeasureLabel = measureLabelDims.reduce((label, d) => {
      label = label || d
      if (d.width > 0 && d.width > label.width) {
        label = d
      }
      return label
    }, null)

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

    // Rotate ticks for non-time horizontal axes
    if (!vertical) {
      const newRotation =
        (widestMeasureLabel?.width || 0) + tickPadding > smallestTickGap
          ? labelRotation
          : 0

      if (newRotation !== rotation) {
        console.log('rotation')
        setRotation(position === 'top' ? -newRotation : newRotation)
      }
    }

    const newDimensions = {
      width: 0,
      height: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }

    // Axis overflow measurements
    if (!vertical) {
      if (realLabelDims.length) {
        const leftMostLabelDim = realLabelDims.reduce((d, labelDim) =>
          labelDim.left < d.left ? labelDim : d
        )
        const rightMostLabelDim = realLabelDims.reduce((d, labelDim) =>
          labelDim.right > d.right ? labelDim : d
        )

        newDimensions.left = Math.round(
          Math.max(0, domainDims.left - leftMostLabelDim?.left)
        )

        newDimensions.right = Math.round(
          Math.max(0, rightMostLabelDim?.right - domainDims.right)
        )
      }

      newDimensions.height = Math.round(
        Math.max(tickSizeInner, tickSizeOuter) +
          tickPadding +
          (tallestRealLabel?.height ?? 0)
      )
    } else {
      if (realLabelDims.length) {
        const topMostLabelDim = realLabelDims.reduce((d, labelDim) =>
          labelDim.top < d.top ? labelDim : d
        )

        const bottomMostLabelDim = realLabelDims.reduce((d, labelDim) =>
          labelDim.bottom > d.bottom ? labelDim : d
        )

        newDimensions.top = Math.round(
          Math.max(0, domainDims.top - topMostLabelDim?.top)
        )

        newDimensions.bottom = Math.round(
          Math.max(0, bottomMostLabelDim?.bottom - domainDims.bottom)
        )
      }

      newDimensions.width = Math.round(
        Math.max(tickSizeInner, tickSizeOuter) +
          tickPadding +
          (widestRealLabel?.width ?? 0)
      )
    }

    // Only update the axisDimensions if something has changed
    if (
      !axisDimension ||
      Object.keys(newDimensions).some(key => {
        return newDimensions[key] !== axisDimension[key]
          ? console.log(id, key, newDimensions[key], axisDimension[key]) || true
          : false
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
    gridHeight,
    gridWidth,
    id,
    labelRotation,
    position,
    rotation,
    setChartState,
    setRotation,
    show,
    tickPadding,
    tickSizeInner,
    tickSizeOuter,
    vertical,
  ])

  // Measure after if needed
  React.useEffect(() => {
    measureDimensions()
  }, [measureDimensions])
}
