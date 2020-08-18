import React from 'react'
import { translate } from '../utils/Utils'
//
import useChartContext from '../hooks/useChartContext'
import useChartState from '../hooks/useChartState'

export default function Brush() {
  const { brush, gridX, gridY, gridHeight, dark } = useChartContext()
  const [pointer] = useChartState(d => d.pointer)

  if (!brush) {
    return null
  }

  return (
    <div
      className="Brush"
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: 0,
        top: 0,
        transform: translate(gridX, gridY),
        opacity: pointer.dragging
          ? Math.abs(pointer.sourceX - pointer.x) < 20
            ? 0.5
            : 1
          : 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          transform: translate(Math.min(pointer.x, pointer.sourceX), 0),
          width: `${Math.abs(pointer.x - pointer.sourceX)}px`,
          height: `${gridHeight}px`,
          background: dark ? 'rgba(255,255,255,.3)' : 'rgba(0, 26, 39, 0.3)',
          ...brush.style,
        }}
      />
    </div>
  )
}
