import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
//
import { Animate } from './ReactMove'
import Utils from '../utils/Utils'
import Selectors from '../utils/Selectors'
//

const backgroundColor = 'rgba(38, 38, 38, 0.9)'
const triangleSize = 7

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
    onChange: () => {},
  }
  static isHtml = true
  componentDidUpdate (oldProps) {
    if (oldProps.pointer !== this.props.pointer) {
      this.updateTooltip()
    }
  }
  updateTooltip = () => {
    const {
      focus,
      align,
      padding,
      tooltipArrowPadding,
      onChange,
      //
      hovered,
      primaryAxes,
      secondaryAxes,
      gridX,
      gridY,
      gridWidth,
      gridHeight,
      width,
      height,
      pointer,
    } = this.props

    let { arrowPosition } = this.props
    const { alignPriority } = this.props

    if (!primaryAxes.length || !secondaryAxes.length) {
      return null
    }

    const hoveredDatums = hovered.datums && hovered.datums.length ? hovered.datums : []

    // Get the closest focus datum out of the hoveredDatums
    const focusDatum = Utils.getClosestPoint(pointer, hoveredDatums)
    const active = hovered.active

    if (this.focusDatum === focusDatum && this.active === active) {
      return
    }

    this.focusDatum = focusDatum
    this.active = active

    // If there is a focusDatum, default the focus to its x and y
    if (this.focusDatum) {
      this.focus = this.focusDatum.focus
    }

    if (typeof focus === 'function') {
      // Support functional override for focus
      if (pointer) {
        this.focus = focus({
          hoveredDatums,
          pointer,
          focusDatum: this.focusDatum,
        })
      }
    } else if (focus === 'pointer') {
      // Support pointer-bound focus
      this.focus = pointer
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

    const {
      x, y, horizontalPadding = 0, verticalPadding = 0,
    } = this.focus

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
              space.left - tooltipArrowPadding - padding - horizontalPadding > tooltipDims.width &&
              space.top > tooltipDims.height / 2 &&
              space.bottom > tooltipDims.height / 2
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'right') {
            if (
              space.right - tooltipArrowPadding - padding - horizontalPadding > tooltipDims.width &&
              space.top > tooltipDims.height / 2 &&
              space.bottom > tooltipDims.height / 2
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'top') {
            if (
              space.top - tooltipArrowPadding - padding - verticalPadding > tooltipDims.height &&
              space.left > tooltipDims.width / 2 &&
              space.right > tooltipDims.width / 2
            ) {
              resolvedAlign = priority
            }
          } else if (priority === 'bottom') {
            if (
              space.bottom - tooltipArrowPadding - padding - verticalPadding > tooltipDims.height &&
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
        transform: 'translate3d(-50%, 0%, 0)',
        borderLeft: `${triangleSize * 0.8}px solid transparent`,
        borderRight: `${triangleSize * 0.8}px solid transparent`,
        borderTop: `${triangleSize}px solid ${backgroundColor}`,
      }
    } else if (arrowPosition === 'top') {
      triangleStyles = {
        top: '0%',
        left: '50%',
        transform: 'translate3d(-50%, -100%, 0)',
        borderLeft: `${triangleSize * 0.8}px solid transparent`,
        borderRight: `${triangleSize * 0.8}px solid transparent`,
        borderBottom: `${triangleSize}px solid ${backgroundColor}`,
      }
    } else if (arrowPosition === 'right') {
      triangleStyles = {
        top: '50%',
        left: '100%',
        transform: 'translate3d(0%, -50%, 0)',
        borderTop: `${triangleSize * 0.8}px solid transparent`,
        borderBottom: `${triangleSize * 0.8}px solid transparent`,
        borderLeft: `${triangleSize}px solid ${backgroundColor}`,
      }
    } else if (arrowPosition === 'left') {
      triangleStyles = {
        top: '50%',
        left: '0%',
        transform: 'translate3d(-100%, -50%, 0)',
        borderTop: `${triangleSize * 0.8}px solid transparent`,
        borderBottom: `${triangleSize * 0.8}px solid transparent`,
        borderRight: `${triangleSize}px solid ${backgroundColor}`,
      }
    } else {
      triangleStyles = {
        opacity: 0,
      }
    }

    const opacity = hovered.active ? 1 : 0

    const primaryAxis = Utils.getAxisByAxisID(
      primaryAxes,
      this.focusDatum ? this.focusDatum.series.primaryAxisID : null
    )
    const secondaryAxis = Utils.getAxisByAxisID(
      secondaryAxes,
      this.focusDatum ? this.focusDatum.series.secondaryAxisID : null
    )

    const tooltip = {
      x,
      y,
      horizontalPadding,
      verticalPadding,
      alignX,
      alignY,
      triangleStyles,
      opacity,
      primaryAxis,
      secondaryAxis,
      focusDatum: this.focusDatum,
    }

    onChange(tooltip)

    this.props.dispatch(state => ({
      ...state,
      tooltip,
    }))
  }
  render () {
    const {
      offset: { left, top },
      gridX,
      gridY,
      gridWidth,
      gridHeight,
      tooltip,
      padding,
      primaryAxes,
      secondaryAxes,
      tooltipArrowPadding,
      children,
      render,
      Component: Comp,
      ...rest
    } = this.props

    const {
      x,
      y,
      horizontalPadding,
      verticalPadding,
      alignX,
      alignY,
      triangleStyles,
      opacity = 0,
      primaryAxis,
      secondaryAxis,
    } = tooltip

    const resolvedHorizontalPadding = padding + horizontalPadding
    const resolvedVerticalPadding = padding + verticalPadding

    const start = {
      opacity: 0,
    }

    const update = {
      opacity,
      left: `${left + gridX}px`,
      top: `${top + gridY}px`,
      width: `${gridWidth}px`,
      height: `${gridHeight}px`,
    }

    let renderedChildren
    const renderProps = {
      datum: this.focusDatum,
      getStyle: datum => datum.getStatusStyle(Utils.getStatus(datum, rest.hovered, rest.selected)),
      primaryAxes,
      secondaryAxes,
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
      <Animate
        show={!!opacity}
        start={start}
        enter={update}
        update={update}
        leave={update}
        className="tooltip-wrap"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
        }}
        innerRef={el => {
          this.el = el
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate3d(${x}px, ${y}px, 0px)`,
            transition: 'all .2s ease-out',
          }}
        >
          <div
            style={{
              transform: `translate3d(${alignX}, ${alignY}, 0)`,
              padding: `${tooltipArrowPadding + resolvedVerticalPadding}px ${tooltipArrowPadding +
                resolvedHorizontalPadding}px`,
              width: 'auto',
              transition: 'all .2s ease-out',
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
                transition: 'all .2s ease-out',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 0,
                  height: 0,
                  ...triangleStyles,
                  transition: 'all .2s ease-out',
                }}
              />
              {renderedChildren}
            </div>
          </div>
        </div>
      </Animate>
    )
  }
}

function defaultRenderer (props) {
  const {
    datum, primaryAxis, secondaryAxis, formatSecondary, getStyle,
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

  const sortedGroupDatums =
    secondaryAxis && secondaryAxis.stacked
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
          {sortedGroupDatums.map((sortedDatum, i) => (
            <tr
              key={i}
              style={{
                opacity: sortedDatum === datum ? 1 : 0.8,
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
                <svg width="16" height="16">
                  <circle
                    cx="8"
                    cy="8"
                    style={{
                      ...getStyle(sortedDatum),
                      r: 7,
                      stroke: 'white',
                      strokeWidth: sortedDatum === datum ? 2 : 1,
                    }}
                  />
                </svg>
              </td>
              <td>{sortedDatum.seriesLabel}: &nbsp;</td>
              <td
                style={{
                  textAlign: 'right',
                }}
              >
                {resolvedFormatSecondary(sortedDatum.secondary)}
              </td>
            </tr>
          ))}
          {secondaryAxis && secondaryAxis.stacked && datum.group.length > 1 ? (
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
    primaryAxes: Selectors.primaryAxes(),
    secondaryAxes: Selectors.secondaryAxes(),
    gridX: Selectors.gridX(),
    gridY: Selectors.gridY(),
    gridWidth: Selectors.gridWidth(),
    gridHeight: Selectors.gridHeight(),
    offset: Selectors.offset(),
  }
  return state => ({
    primaryAxes: selectors.primaryAxes(state),
    secondaryAxes: selectors.secondaryAxes(state),
    gridX: selectors.gridX(state),
    gridY: selectors.gridY(state),
    gridWidth: selectors.gridWidth(state),
    gridHeight: selectors.gridHeight(state),
    width: state.width,
    height: state.height,
    hovered: state.hovered,
    pointer: state.pointer,
    tooltip: state.tooltip,
    offset: selectors.offset(state),
  })
})(Tooltip)
