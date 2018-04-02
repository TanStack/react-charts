import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { Animate } from './ReactMove'
//
import Utils from '../utils/Utils'
import Selectors from '../utils/Selectors'
//

const fontSize = 12

const defaultRenderer = props => {
  const {
    series, datums, primaryAxis, secondaryAxis,
  } = props
  return series ? (
    <div>
      <strong>{series.label}</strong>
      <br />
    </div>
  ) : datums && datums.length ? (
    <div>
      <div
        style={{
          marginBottom: '3px',
        }}
      >
        <strong>{primaryAxis.format(datums[0].primary)}</strong>
      </div>
      <table>
        <tbody>
          {(secondaryAxis.stacked ? [...datums].reverse() : datums).map((d, i) => (
            <tr key={i}>
              <td>
                <span style={{ color: d.statusStyles.hovered.fill }}>&#9679;</span> {d.seriesLabel}:
                &nbsp;
              </td>
              <td
                style={{
                  textAlign: 'right',
                }}
              >
                {Math.floor(d.secondary) < d.secondary
                  ? secondaryAxis.format(Math.round(d.secondary * 100) / 100)
                  : secondaryAxis.format(d.secondary)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null
}

class Tooltip extends PureComponent {
  static defaultProps = {
    origin: ['top', 'right'],
    align: 'top',
    children: defaultRenderer,
  }
  render () {
    const {
      hovered,
      primaryAxis,
      secondaryAxis,
      offset: { left, top },
      gridX,
      gridY,
      gridWidth,
      gridHeight,
      width,
      height,
      cursor,
      //
      origin,
      align,
      children,
      render,
      Component: Comp,
      ...rest
    } = this.props

    let { arrowPosition } = this.props

    if (!primaryAxis || !secondaryAxis || !hovered || !cursor) {
      return null
    }

    const datums =
      hovered.datums && hovered.datums.length
        ? hovered.datums
        : hovered.series ? hovered.series.data : null

    // TODO: tooltip origin: hovered or chart or custom.
    // Allows the user to origin the tooltip relative to different parts of the chart
    // TODO: tooltip hardcoded offset and/or dynamic offset based on target element

    let focus = {
      x: gridX,
      y: gridY,
    }
    if (datums) {
      if (typeof origin === 'function') {
        focus = origin(datums, cursor)
      } else if (origin === 'closest') {
        focus = Utils.getClosestPoint(cursor, datums).focus // : quadTree.find(cursor.x, cursor.y)
      } else if (origin === 'cursor') {
        focus = cursor
      } else {
        const origins = Utils.isArray(origin) ? [...origin] : [origin]
        focus = Utils.getFocusForOrigins({
          origins,
          points: datums,
          gridX,
          gridY,
          gridWidth,
          gridHeight,
          width,
          height,
        })
      }
    }

    const { x, y } = focus

    if (!arrowPosition) {
      if (align === 'left') {
        arrowPosition = 'right'
      } else if (align === 'right') {
        arrowPosition = 'left'
      } else if (align === 'top') {
        arrowPosition = 'bottom'
      } else if (align === 'bottom') {
        arrowPosition = 'top'
      }
    }

    let alignX
    let alignY

    let triangleStyles = {}

    if (align === 'top') {
      alignX = '-50%'
      alignY = '-100%'
    } else if (align === 'bottom') {
      alignX = '-50%'
      alignY = '0%'
    } else if (align === 'left') {
      alignX = '-100%'
      alignY = '-50%'
    } else if (align === 'right') {
      alignX = '0%'
      alignY = '-50%'
    } else {
      // TODO: Automatic Mode
      alignX = '-50%'
      alignY = '-50%'
    }

    if (arrowPosition === 'bottom') {
      triangleStyles = {
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '5px solid rgba(38, 38, 38, 0.8)',
      }
    } else if (arrowPosition === 'top') {
      triangleStyles = {
        top: '0%',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: '5px solid rgba(38, 38, 38, 0.8)',
      }
    } else if (arrowPosition === 'right') {
      triangleStyles = {
        top: '50%',
        left: '100%',
        transform: 'translate(0%, -50%)',
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: '5px solid rgba(38, 38, 38, 0.8)',
      }
    } else if (arrowPosition === 'left') {
      triangleStyles = {
        top: '50%',
        left: '0%',
        transform: 'translate(-100%, -50%)',
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderRight: '5px solid rgba(38, 38, 38, 0.8)',
      }
    } else {
      triangleStyles = {
        opacity: 0,
      }
    }

    const visibility = hovered.active ? 1 : 0

    const start = {
      x,
      y,
      alignX,
      alignY,
      triangleStyles,
      visibility,
    }

    const update = {}
    Object.keys(start).forEach(key => {
      update[key] = [start[key]]
    })

    return (
      <Animate
        start={start}
        update={update}
        duration={400}
        timing={{
          duration: 500,
        }}
        render={({
 x, y, alignX, alignY, triangleStyles,
}) => {
          let renderedChildren
          const renderProps = {
            ...hovered,
            primaryAxis,
            secondaryAxis,
          }
          if (Comp) {
            renderedChildren = React.createElement(Comp, null, {
              ...rest,
              ...renderProps,
            })
          } else {
            renderedChildren = (render || children)(renderProps)
          }

          return (
            <div
              className="tooltip-wrap"
              style={{
                pointerEvents: 'none',
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`,
                opacity: visibility,
              }}
            >
              <div
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0px)`,
                }}
              >
                <div
                  style={{
                    transform: `translate3d(${alignX}, ${alignY}, 0)`,
                    padding: '7px',
                  }}
                >
                  <div
                    style={{
                      fontSize: `${fontSize}px`,
                      padding: '5px',
                      background: 'rgba(38, 38, 38, 0.8)',
                      color: 'white',
                      borderRadius: '3px',
                      position: 'relative',
                    }}
                  >
                    {renderedChildren}
                    <div
                      style={{
                        position: 'absolute',
                        width: '0',
                        height: '0',
                        ...triangleStyles,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default Connect(
  () => {
    const selectors = {
      primaryAxis: Selectors.primaryAxis(),
      secondaryAxis: Selectors.secondaryAxis(),
      gridX: Selectors.gridX(),
      gridY: Selectors.gridY(),
      gridWidth: Selectors.gridWidth(),
      gridHeight: Selectors.gridHeight(),
      offset: Selectors.offset(),
    }
    return state => ({
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      gridX: selectors.gridX(state),
      gridY: selectors.gridY(state),
      gridWidth: selectors.gridWidth(state),
      gridHeight: selectors.gridHeight(state),
      width: state.width,
      height: state.height,
      hovered: state.hovered,
      cursor: state.cursor,
      offset: selectors.offset(state),
      quadTree: state.quadTree,
    })
  },
  {
    statics: {
      isHTML: true,
    },
  }
)(Tooltip)
