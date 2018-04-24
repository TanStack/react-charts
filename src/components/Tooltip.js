import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
//
import { Animate } from './ReactMove'
import Utils from '../utils/Utils'
import Selectors from '../utils/Selectors'
//

const backgroundColor = 'rgba(38, 38, 38, 0.9)'

class Tooltip extends PureComponent {
  static defaultProps = {
    focus: 'closest',
    align: 'auto',
    alignPriority: [
      'right',
      'top',
      'left',
      'bottom',
      'topRight',
      'topLeft',
      'bottomLeft',
      'bottomRight',
    ],
    children: defaultRenderer,
    padding: 1,
    tooltipArrowPadding: 7,
  }
  static isHtml = true
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
      focus,
      align,
      autoAlign,
      padding,
      tooltipArrowPadding,
      children,
      render,
      Component: Comp,
      ...rest
    } = this.props

    let { arrowPosition } = this.props
    const { alignPriority } = this.props

    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    const hoveredDatums = hovered.datums && hovered.datums.length ? hovered.datums : []

    // Get the closest focus datum out of the hoveredDatums
    this.focusDatum = Utils.getClosestPoint(cursor, hoveredDatums)

    // If there is a focusDatum, default the focus to its x and y
    if (this.focusDatum) {
      this.focus = this.focusDatum.focus
    }

    if (typeof focus === 'function') {
      // Support functional override for focus
      if (cursor) {
        this.focus = focus({
          hoveredDatums,
          cursor,
          focusDatum: this.focusDatum,
        })
      }
    } else if (focus === 'cursor') {
      // Support cursor-bound focus
      this.focus = cursor
    } else if (focus === 'closest') {
      // Do nothing, this is already calculated
    } else if (hoveredDatums && hoveredDatums.length) {
      // Support manual definition of focus point using relative multiFocus strategy
      const multiFocus = Utils.isArray(focus) ? [...focus] : [focus]
      this.focus = Utils.getMultiFocus({
        focus: multiFocus,
        points: hoveredDatums,
        gridX,
        gridY,
        gridWidth,
        gridHeight,
        width,
        height,
      })
    }

    if (!this.focus) {
      return null
    }

    const { x, y, padding: focusPadding = 0 } = this.focus

    let alignX
    let alignY
    let triangleStyles = {}
    let resolvedAlign = align || 'auto'

    if (align === 'auto') {
      if (this.el) {
        const gridDims = this.el.getBoundingClientRect()
        const tooltipDims = this.tooltipEl.getBoundingClientRect()
        let container = this.el
        const space = {
          left: Infinity,
          top: Infinity,
          right: Infinity,
          bottom: Infinity,
        }

        while (container !== document.body) {
          container = container.parentElement
          const { overflowX, overflowY } = window.getComputedStyle(container)
          if (
            container === document.body ||
            [overflowX, overflowY].find(d => ['auto', 'hidden'].includes(d))
          ) {
            const containerDims = container.getBoundingClientRect()
            const left = gridDims.left - containerDims.left + this.focus.x
            const top = gridDims.top - containerDims.top + this.focus.y
            const right = containerDims.width - left
            const bottom = containerDims.height - top

            space.left = Math.min(space.left, left)
            space.top = Math.min(space.top, top)
            space.right = Math.min(space.right, right)
            space.bottom = Math.min(space.bottom, bottom)
          }
        }

        resolvedAlign = null

        alignPriority.forEach(priority => {
          if (resolvedAlign) {
            return
          }
          if (priority === 'left') {
            if (
              space.left - tooltipArrowPadding - padding > tooltipDims.width &&
              space.top > tooltipDims.height / 2 &&
              space.bottom > tooltipDims.height / 2
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'right') {
            if (
              space.right - tooltipArrowPadding - padding > tooltipDims.width &&
              space.top > tooltipDims.height / 2 &&
              space.bottom > tooltipDims.height / 2
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'top') {
            if (
              space.top - tooltipArrowPadding - padding > tooltipDims.height &&
              space.left > tooltipDims.width / 2 &&
              space.right > tooltipDims.width / 2
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'bottom') {
            if (
              space.bottom - tooltipArrowPadding - padding > tooltipDims.height &&
              space.left > tooltipDims.width / 2 &&
              space.right > tooltipDims.width / 2
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'topLeft') {
            if (
              space.top - tooltipArrowPadding > tooltipDims.height &&
              space.left - tooltipArrowPadding > tooltipDims.width
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'topRight') {
            if (
              space.top - tooltipArrowPadding > tooltipDims.height &&
              space.right - tooltipArrowPadding > tooltipDims.width
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'bottomLeft') {
            if (
              space.bottom - tooltipArrowPadding > tooltipDims.height &&
              space.left - tooltipArrowPadding > tooltipDims.width
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'bottomRight') {
            if (
              space.bottom - tooltipArrowPadding > tooltipDims.height &&
              space.right - tooltipArrowPadding > tooltipDims.width
            ) {
              resolvedAlign = priority
            }
          }
        })
      }
    }

    if (resolvedAlign === 'top') {
      alignX = '-50%'
      alignY = '-100%'
    } else if (resolvedAlign === 'topRight') {
      alignX = '0%'
      alignY = '-100%'
    } else if (resolvedAlign === 'right') {
      alignX = '0%'
      alignY = '-50%'
    } else if (resolvedAlign === 'bottomRight') {
      alignX = '0%'
      alignY = '0%'
    } else if (resolvedAlign === 'bottom') {
      alignX = '-50%'
      alignY = '0%'
    } else if (resolvedAlign === 'bottomLeft') {
      alignX = '-100%'
      alignY = '0%'
    } else if (resolvedAlign === 'left') {
      alignX = '-100%'
      alignY = '-50%'
    } else if (resolvedAlign === 'topLeft') {
      alignX = '-100%'
      alignY = '-100%'
    }

    if (!arrowPosition) {
      if (resolvedAlign === 'left') {
        arrowPosition = 'right'
      } else if (resolvedAlign === 'right') {
        arrowPosition = 'left'
      } else if (resolvedAlign === 'top') {
        arrowPosition = 'bottom'
      } else if (resolvedAlign === 'bottom') {
        arrowPosition = 'top'
      }
    }

    if (arrowPosition === 'bottom') {
      triangleStyles = {
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: `5px solid ${backgroundColor}`,
      }
    } else if (arrowPosition === 'top') {
      triangleStyles = {
        top: '0%',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: `5px solid ${backgroundColor}`,
      }
    } else if (arrowPosition === 'right') {
      triangleStyles = {
        top: '50%',
        left: '100%',
        transform: 'translate(0%, -50%)',
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: `5px solid ${backgroundColor}`,
      }
    } else if (arrowPosition === 'left') {
      triangleStyles = {
        top: '50%',
        left: '0%',
        transform: 'translate(-100%, -50%)',
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderRight: `5px solid ${backgroundColor}`,
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
      visibility: 0,
    }

    const update = {}
    Object.keys(start).forEach(key => {
      update[key] = [start[key]]
    })
    update.visibility = [visibility]

    return (
      <Animate
        show={visibility}
        start={start}
        enter={update}
        update={update}
        leave={update}
        render={({
 x, y, alignX, alignY, triangleStyles, padding, visibility,
}) => {
          let renderedChildren
          const renderProps = {
            datum: this.focusDatum,
            primaryAxis,
            secondaryAxis,
            ...rest,
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
              ref={el => {
                this.el = el
              }}
              style={{
                pointerEvents: 'none',
                position: 'absolute',
                left: `${left + gridX}px`,
                top: `${top + gridY}px`,
                width: `${gridWidth}px`,
                height: `${gridHeight}px`,
                opacity: visibility,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transform: `translate3d(${x}px, ${y}px, 0px)`,
                }}
              >
                <div
                  style={{
                    transform: `translate3d(${alignX}, ${alignY}, 0)`,
                    padding: `${tooltipArrowPadding + padding}px`,
                    width: 'auto',
                  }}
                >
                  <div
                    ref={el => {
                      this.tooltipEl = el
                    }}
                    style={{
                      fontSize: '12px',
                      padding: '5px',
                      background: backgroundColor,
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

function defaultRenderer (props) {
  const {
    datum, primaryAxis, secondaryAxis, formatSecondary,
  } = props

  if (!datum) {
    return null
  }

  const resolvedFormatSecondary =
    formatSecondary ||
    (val =>
      Math.floor(val) < val
        ? secondaryAxis.format(Math.round(val * 100) / 100)
        : secondaryAxis.format(val))

  const sortedGroupDatums = secondaryAxis.stacked
    ? [...datum.group].reverse()
    : [...datum.group]
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
        <strong>{primaryAxis.format(datum.primary)}</strong>
      </div>
      <table
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        <tbody>
          {sortedGroupDatums.map((d, i) => (
            <tr
              key={i}
              style={{
                opacity: d === datum ? 1 : 0.8,
              }}
            >
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
                    boxShadow:
                      d === datum
                        ? '0 0 0 2px white, 0 0 8px rgba(0,0,0,.5)'
                        : '0 0 0 1px white, 0 0 8px rgba(0,0,0,.5)',
                  }}
                />
              </td>
              <td>{d.seriesLabel}: &nbsp;</td>
              <td
                style={{
                  textAlign: 'right',
                }}
              >
                {resolvedFormatSecondary(d.secondary)}
              </td>
            </tr>
          ))}
          {secondaryAxis.stacked && datum.group.length > 1 ? (
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
                Total: &nbsp;
              </td>
              <td
                style={{
                  paddingTop: '5px',
                }}
              >
                {resolvedFormatSecondary([...datum.group].reverse()[0].totalValue)}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
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
