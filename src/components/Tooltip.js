import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
//
import { Animate } from './ReactMove'
import Utils from '../utils/Utils'
import Selectors from '../utils/Selectors'
//

const defaultRenderer = props => {
  const {
    series, datums, primaryAxis, secondaryAxis,
  } = props

  const formatSecondary = val =>
    Math.floor(val) < val
      ? secondaryAxis.format(Math.round(val * 100) / 100)
      : secondaryAxis.format(val)

  if (series) {
    return (
      <div>
        <strong>{series.label}</strong>
        <br />
      </div>
    )
  }

  if (!datums || !datums.length) {
    return null
  }

  const sortedDatums = [...datums]
    .sort((a, b) => {
      if (a.secondary < b.secondary) {
        return -1
      } else if (a.secondary > b.secondary) {
        return 1
      }
      return 0
    })
    .reverse()

  return (
    <div>
      <div
        style={{
          marginBottom: '3px',
          textAlign: 'center',
        }}
      >
        <strong>{primaryAxis.format(datums[0].primary)}</strong>
      </div>
      <table
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        <tbody>
          {sortedDatums.map((d, i) => (
            <tr key={i}>
              <td
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '5px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: d.statusStyles.hovered.fill,
                    borderRadius: '50px',
                  }}
                />
              </td>
              <td>{d.seriesLabel}: </td>
              <td
                style={{
                  textAlign: 'right',
                }}
              >
                {formatSecondary(d.secondary)}
              </td>
            </tr>
          ))}
          {secondaryAxis.stacked ? (
            <tr>
              <td
                style={{
                  paddingTop: '5px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderRadius: '50px',
                  }}
                />
              </td>
              <td
                style={{
                  paddingTop: '5px',
                }}
              >
                Total:{' '}
              </td>
              <td
                style={{
                  paddingTop: '5px',
                }}
              >
                {formatSecondary([...datums].reverse()[0].totalValue)}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}

class Tooltip extends PureComponent {
  static defaultProps = {
    origin: 'closest',
    align: 'top',
    children: defaultRenderer,
    padding: 1,
  }
  static isHTML = true
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
      padding,
      children,
      render,
      Component: Comp,
      ...rest
    } = this.props

    let { arrowPosition } = this.props

    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    const datums =
      hovered.datums && hovered.datums.length
        ? hovered.datums
        : hovered.series ? hovered.series.data : []

    // TODO: tooltip origin: hovered or chart or custom.
    // Allows the user to origin the tooltip relative to different parts of the chart
    // TODO: tooltip hardcoded offset and/or dynamic offset based on target element

    this.focus = this.focus || {
      x: gridX,
      y: gridY,
      padding: 0,
      datum: null,
    }

    if (datums && datums.length) {
      if (typeof origin === 'function') {
        if (cursor) {
          this.focus = origin(datums, cursor)
        }
      } else if (origin === 'closest') {
        if (cursor) {
          const datum = Utils.getClosestPoint(cursor, datums)
          this.focus = datum.focus
          this.focus.datum = datum
        }
      } else if (origin === 'cursor') {
        if (cursor) {
          this.focus = cursor
        }
      } else {
        const origins = Utils.isArray(origin) ? [...origin] : [origin]
        this.focus = Utils.getFocusForOrigins({
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

    const { x, y, padding: focusPadding = 0 } = this.focus

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
      padding: padding + focusPadding,
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
        render={({
 x, y, alignX, alignY, triangleStyles, padding, visibility,
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
                left: `${left + gridX}px`,
                top: `${top + gridY}px`,
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
                    padding: `${7 + padding}px`,
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      padding: '5px',
                      background: 'rgba(38, 38, 38, 0.8)',
                      color: 'white',
                      borderRadius: '3px',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        ...triangleStyles,
                      }}
                    />
                    {renderedChildren}
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

export default Connect(() => {
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
  })
})(Tooltip)
