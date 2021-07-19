import React, { MutableRefObject } from 'react'

import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import { Axis, AxisDimension, GridDimensions, Position } from '../types'
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
  const { axisDimensionsState } = useChartContext<TDatum>()

  const [axisDimensions, setAxisDimensions] = axisDimensionsState

  const axisDimension = React.useMemo(() => {
    return axisDimensions[axis.position as Position]?.[axis.id!]
  }, [axisDimensions, axis.position, axis.id])

  // const isLooping = useIsLooping()

  const measureRotation = React.useCallback(() => {
    if (!elRef.current) {
      return
    }

    let gridSize = !axis.isVertical
      ? gridDimensions.width
      : gridDimensions.height

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
    gridDimensions.width,
    gridDimensions.height,
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

    const newDimensions: AxisDimension = {
      width: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    }

    const currentEl = elRef.current

    const axisEl = currentEl.querySelector(`.Axis-Group.inner .domainAndTicks`)
    const domainEl = currentEl.querySelector(`.Axis-Group.inner .domain`)

    if (!axisEl || !domainEl) {
      return
    }

    const axisDims = getElBox(axisEl)
    const domainDims = getElBox(domainEl)

    if (!axisDims || !domainDims) {
      return
    }

    // Axis overflow measurements
    if (!axis.isVertical) {
      newDimensions.paddingLeft = Math.round(
        Math.max(0, domainDims.left - axisDims?.left)
      )

      newDimensions.paddingRight = Math.round(
        Math.max(0, axisDims?.right - domainDims.right)
      )

      newDimensions.height = axisDims?.height
    } else {
      newDimensions.paddingTop = Math.round(
        Math.max(0, domainDims.top - axisDims?.top)
      )

      newDimensions.paddingBottom = Math.round(
        Math.max(0, axisDims?.bottom - domainDims.bottom)
      )

      newDimensions.width = axisDims?.width
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
    axisDimension,
    axisDimensions,
    elRef,
    setAxisDimensions,
  ])

  // Measure after if needed
  useIsomorphicLayoutEffect(() => {
    // setTimeout(() => {
    window.requestAnimationFrame(() => {
      measureRotation()
      measureDimensions()
    })
  }, [measureRotation])

  // useIsomorphicLayoutEffect(() => {
  //   // setTimeout(() => {
  //   window.requestAnimationFrame(() => {
  //   })
  // }, [measureRotation])
}
