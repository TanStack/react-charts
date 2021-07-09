import React, { MutableRefObject } from 'react'

import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import { Axis, GridDimensions, Position } from '../types'
import useChartContext from '../utils/chartContext'

const getElBox = (el: Element) => {
  var rect = el.getBoundingClientRect()
  return {
    top: Math.round(rect.top),
    right: Math.round(rect.right),
    bottom: Math.round(rect.bottom),
    left: Math.round(rect.left),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    x: Math.round(rect.x),
    y: Math.round(rect.y),
  }
}

export default function useMeasure<TDatum>({
  axis,
  elRef,
  gridDimensions,
  setShowRotated,
}: {
  axis: Axis<TDatum>
  elRef: MutableRefObject<SVGGElement | null>
  gridDimensions: GridDimensions
  showRotated: boolean
  setShowRotated: (value: boolean) => void
}) {
  const { useAxisDimensionsAtom } = useChartContext<TDatum>()

  const [axisDimensions, setAxisDimensions] = useAxisDimensionsAtom()

  const axisDimension = React.useMemo(() => {
    return axisDimensions[axis.position as Position]?.[axis.id!]
  }, [axisDimensions, axis.position, axis.id])

  // const isLooping = useIsLooping()

  const measureRotation = React.useCallback(() => {
    if (!elRef.current) {
      return
    }

    let gridSize = !axis.isVertical
      ? gridDimensions.gridWidth
      : gridDimensions.gridHeight

    const staticLabelDims = Array.from(
      elRef.current.querySelectorAll('.Axis-Group.outer .tickLabel')
    ).map(el => getElBox(el))

    // Determine the largest labels on the axis
    let widestLabel: typeof staticLabelDims[number] | undefined

    staticLabelDims.forEach(label => {
      let resolvedLabel = widestLabel ?? { width: 0 }
      if (label.width > 0 && label.width > resolvedLabel.width) {
        widestLabel = label
      }
    })

    let smallestTickGap = gridSize

    if (staticLabelDims.length > 1) {
      staticLabelDims.forEach((current, i) => {
        const prev = staticLabelDims[i - 1]

        if (prev) {
          smallestTickGap = Math.min(
            smallestTickGap,
            axis.isVertical ? current.top - prev.top : current.left - prev.left
          )
        }
      })
    }

    const shouldRotate =
      (widestLabel?.width || 0) + axis.minTickPaddingForRotation >
      smallestTickGap

    // if (!isLooping) {
    // Rotate ticks for non-time horizontal axes
    if (!axis.isVertical) {
      setShowRotated(shouldRotate)
    }
    // }
  }, [
    elRef,
    axis.isVertical,
    axis.minTickPaddingForRotation,
    gridDimensions.gridWidth,
    gridDimensions.gridHeight,
    setShowRotated,
  ])

  const measureDimensions = React.useCallback(() => {
    if (!elRef.current) {
      if (axisDimension) {
        // If the entire axis is hidden, then we need to remove the axis dimensions
        setAxisDimensions(old => {
          const newAxes = { ...(old[axis.position] ?? {}) }

          delete newAxes[axis.id!]

          return {
            ...old,
            [axis.position]: newAxes,
          }
        })
      }
      return
    }

    const newDimensions = {
      width: 0,
      height: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }

    const domainEl = elRef.current.querySelector(`.Axis-Group.inner .domain`)

    if (!domainEl) {
      return
    }

    const domainDims = getElBox(domainEl)

    const measureDims = Array.from(
      elRef.current.querySelectorAll('.Axis-Group.inner .tickLabel')
    ).map(el => getElBox(el))

    // Determine the largest labels on the axis
    let widestRealLabel = measureDims[0]
    let tallestRealLabel = measureDims[0]

    measureDims.forEach(d => {
      if (d.width > 0 && d.width > widestRealLabel.width) {
        widestRealLabel = d
      }

      if (d.height > 0 && d.height > tallestRealLabel.height) {
        tallestRealLabel = d
      }
    })

    // Axis overflow measurements
    if (!axis.isVertical) {
      if (measureDims.length) {
        const leftMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.left < d.left ? labelDim : d
        )
        const rightMostLabelDim = measureDims.reduce((d, labelDim) =>
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
        // Math.max(axis.tickSizeInner, axis.tickSizeOuter) +
        8 + axis.minTickPaddingForRotation + (tallestRealLabel?.height ?? 0)
      )
    } else {
      if (measureDims.length) {
        const topMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.top < d.top ? labelDim : d
        )

        const bottomMostLabelDim = measureDims.reduce((d, labelDim) =>
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
        // Math.max(axis.tickSizeInner, axis.tickSizeOuter) +
        8 + axis.minTickPaddingForRotation + (widestRealLabel?.width ?? 0)
      )
    }

    // Only update the axisDimensions if something has changed
    if (
      // !isLooping &&
      !axisDimensions ||
      !axisDimension ||
      Object.keys(newDimensions).some(key => {
        // @ts-ignore
        return newDimensions[key] !== axisDimension[key]
      })
    ) {
      setAxisDimensions(old => ({
        ...old,
        [axis.position]: {
          ...(old[axis.position] ?? {}),
          [axis.id!]: newDimensions,
        },
      }))
    }
  }, [
    axis.id,
    axis.isVertical,
    axis.position,
    axis.minTickPaddingForRotation,
    axisDimension,
    axisDimensions,
    elRef,
    setAxisDimensions,
  ])

  // Measure after if needed
  useIsomorphicLayoutEffect(() => {
    measureRotation()
  }, [measureRotation])

  useIsomorphicLayoutEffect(() => {
    measureDimensions()
  }, [measureRotation])
}
