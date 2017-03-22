import React, { Component } from 'react'
import { Animate } from 'react-move'
//
import Interaction from '../components/Interaction'
import Tooltip from '../components/Tooltip'

import Selectors from '../utils/Selectors'

import HyperResponsive from '../utils/HyperResponsive'
import Provider from '../utils/Provider'
import Connect from '../utils/Connect'

const defaultProps = {
  getX: d => Array.isArray(d) ? d[0] : d.x,
  getY: d => Array.isArray(d) ? d[1] : d.y,
  getR: d => Array.isArray(d) ? d[0] : d.r
}

class Chart extends Component {
  constructor () {
    super()
    this.measure = this.measure.bind(this)
  }
  componentDidMount () {
    this.measure()
  }
  componentDidUpdate (prevProps) {
    window.requestAnimationFrame(() => this.measure(prevProps))
  }
  measure (prevProps) {
    if (prevProps && (
      this.props.offset.left !== prevProps.offset.left ||
      this.props.offset.top !== prevProps.offset.top
    )) {
      this.props.dispatch(state => ({
        ...state,
        offset: {
          left: this.el.offsetLeft,
          top: this.el.offsetTop
        }
      }))
    }
  }
  render () {
    const {
      style,
      width,
      height,
      gridX,
      gridY,
      active,
      dispatch,
      children
    } = this.props

    return (
      <div
        className='Chart'
      >
        <Animate
          data={{
            gridX,
            gridY
          }}
        >
          {({
            gridX,
            gridY
          }) => (
            <svg
              ref={el => { this.el = el }}
              style={{
                width: width,
                height: height,
                ...style
              }}
            >
              <g
                ref={el => { this.groupEl = el }}
                transform={`translate(${gridX}, ${gridY})`}
              >
                {children}
                <Interaction
                  onHover={(hovered, e) => dispatch(state => ({
                    ...state,
                    hovered
                  }))}
                  onActivate={(newActive, e) => {
                    if (active === newActive) {
                      return dispatch(state => ({
                        ...state,
                        active: null
                      }))
                    }
                    dispatch(state => ({
                      ...state,
                      active: newActive
                    }))
                  }}
                />
              </g>
            </svg>
          )}
        </Animate>
        <Tooltip />
      </div>
    )
  }
}

const ReactChart = Connect((state) => {
  return {
    width: state.width,
    height: state.height,
    gridX: Selectors.gridX(state),
    gridY: Selectors.gridY(state),
    active: state.active,
    hovered: state.hovered,
    offset: Selectors.offset(state)
  }
})(Chart)

export default HyperResponsive(Provider(ReactChart), defaultProps)
