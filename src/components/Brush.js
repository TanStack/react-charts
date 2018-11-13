import React, { useContext } from 'react'
//
import ChartContext from '../utils/ChartContext'

export default function Brush() {
  const [{ pointer, brush, gridX, gridY, gridHeight, dark }] = useContext(
    ChartContext
  )

  if (!brush) {
    return null
  }

  return (
    <div
      className='Brush'
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate3d(${gridX}px, ${gridY}px, 0)`,
        opacity: pointer.dragging
          ? Math.abs(pointer.sourceX - pointer.x) < 20
            ? 0.5
            : 1
          : 0
      }}
    >
      <div
        style={{
          position: 'absolute',
          transform: `translate3d(${Math.min(
            pointer.x,
            pointer.sourceX
          )}px, 0px, 0)`,
          width: `${Math.abs(pointer.x - pointer.sourceX)}px`,
          height: `${gridHeight}px`,
          background: dark ? 'rgba(255,255,255,.3)' : 'rgba(0, 26, 39, 0.3)',
          ...brush.style
        }}
      />
    </div>
  )
}

Brush.defaultProps = {
  onSelect: () => {}
}
