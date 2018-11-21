import React from 'react'
import withHooks, {
  useContext,
  useEffect,
  useRef,
  useMemo
} from '../utils/hooks'
import Utils from '../utils/Utils'
//
import ChartContext from '../utils/ChartContext'

import Rectangle from '../primitives/Rectangle'

import Voronoi from './Voronoi'
import Axis from './Axis'
import Tooltip from './Tooltip'
import Cursor from './Cursor'
import Brush from './Brush'

function ChartInner({ handleRef, className, style = {}, ...rest }) {
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
      renderSVG,
      onClick,
      seriesOptions,
      getSeriesOrder,
      focused
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

  const onMouseMove = useMemo(
    () =>
      Utils.throttle(e => {
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
      }),
    [offset, gridX, gridY]
  )

  const onMouseLeave = () => {
    setChartState(state => ({
      ...state,
      focused: null
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

  // Reverse the stack order for proper z-indexing
  const reversedStackData = [...stackData].reverse()
  const orderedStackData = getSeriesOrder(reversedStackData)

  const focusedSeriesIndex = focused
    ? orderedStackData.findIndex(series => series.id === focused.series.id)
    : -1

  // Bring focused series to the front
  const focusOrderedStackData = focused
    ? [
      orderedStackData[focusedSeriesIndex],
      ...orderedStackData.slice(0, focusedSeriesIndex),
      ...orderedStackData.slice(focusedSeriesIndex + 1)
    ]
    : orderedStackData

  const stacks = focusOrderedStackData.map(stack => {
    return (
      <stack.Component
        key={stack.id}
        {...seriesOptions[stack.seriesIndex]}
        series={stack}
        stackData={stackData}
      />
    )
  })

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
          overflow: 'hidden'
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
          onClick={onClick}
          style={{
            transform: Utils.translate(gridX, gridY)
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
          <g
            className='Series'
            style={{
              pointerEvents: 'none'
            }}
          >
            {stacks}
          </g>
        </g>
        {renderSVG
          ? renderSVG({
            chartState,
            setChartState
          })
          : null}
      </svg>
      <Cursor primary />
      <Cursor />
      <Brush />
      <Tooltip />
    </div>
  )
}

export default withHooks(ChartInner)
