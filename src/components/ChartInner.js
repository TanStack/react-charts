import React, { useContext, useEffect, useRef } from 'react'
//
import ChartContext from '../utils/ChartContext'

import Rectangle from '../primitives/Rectangle'

import Voronoi from './Voronoi'
import Axis from './Axis'
import Tooltip from './Tooltip'
import Cursor from './Cursor'
import Brush from './Brush'

export default function ChartInner({
  handleRef,
  className,
  style = {},
  ...rest
}) {
  const [chartState] = useContext(ChartContext)
  const [
    {
      width,
      height,
      offset,
      gridX,
      gridY,
      stackData,
      primaryAxes,
      secondaryAxes,
      renderSVG
    },
    setChartState
  ] = useContext(ChartContext)

  const elRef = useRef()

  useEffect(() => {
    if (!elRef.current) {
      return
    }
    const current = elRef.current.getBoundingClientRect()
    if (current.left !== offset.left || current.top !== offset.top) {
      setChartState(state => ({
        ...state,
        offset: {
          left: current.left,
          top: current.top
        }
      }))
    }
  })

  const onMouseMove = e => {
    const { clientX, clientY } = e

    setChartState(state => {
      const x = clientX - offset.left - gridX
      const y = clientY - offset.top - gridY

      const pointer = {
        ...state.pointer,
        active: true,
        x,
        y,
        dragging: state.pointer && state.pointer.down
      }
      return {
        ...state,
        pointer
      }
    })
  }

  const onMouseLeave = () => {
    setChartState(state => ({
      ...state,
      hovered: {
        ...state.hovered,
        active: false
      }
    }))
    setChartState(state => ({
      ...state,
      pointer: {
        ...state.pointer,
        active: false
      }
    }))
  }

  const onMouseDown = () => {
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    setChartState(state => ({
      ...state,
      pointer: {
        ...state.pointer,
        sourceX: state.pointer.x,
        sourceY: state.pointer.y,
        down: true
      }
    }))
  }

  const onMouseUp = () => {
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('mousemove', onMouseMove)

    setChartState(state => ({
      ...state,
      pointer: {
        ...state.pointer,
        down: false,
        dragging: false,
        released: {
          x: state.pointer.x,
          y: state.pointer.y
        }
      }
    }))
  }

  const reversedStackData = [...stackData].reverse()

  return (
    <div
      ref={handleRef}
      {...rest}
      className={`ReactChart ${className || ''}`}
      style={{
        width,
        height,
        position: 'relative',
        ...style
      }}
    >
      <svg
        ref={el => {
          elRef.current = el
        }}
        style={{
          width,
          height,
          overflow: 'visible'
        }}
      >
        <g
          onMouseEnter={e => {
            e.persist()
            onMouseMove(e)
          }}
          onMouseMove={e => {
            e.persist()
            onMouseMove(e)
          }}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          style={{
            transform: `translate3d(${gridX || 0}px, ${gridY || 0}px, 0)`
          }}
        >
          <Rectangle
            // To ensure the pointer always has something to hit
            x1={-gridX}
            x2={width - gridX}
            y1={-gridY}
            y2={height - gridY}
            style={{
              opacity: 0
            }}
          />
          <Voronoi />
          <g className='axes'>
            {[...primaryAxes, ...secondaryAxes].map(axis => (
              <Axis key={axis.id} {...axis} />
            ))}
          </g>
          <g className='Series'>
            {reversedStackData.map(stack => {
              return (
                <stack.Component
                  key={stack.id}
                  series={stack}
                  stackData={stackData}
                />
              )
            })}
          </g>
        </g>
        {renderSVG
          ? renderSVG({
            chartState,
            setChartState
          })
          : null}
      </svg>
      <Tooltip />
      <Cursor primary />
      <Cursor />
      <Tooltip />
      <Brush />
    </div>
  )
}
