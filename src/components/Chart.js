import React, { Component } from 'react'
import { Animate } from 'react-move'
//
import Interaction from '../components/Interaction'
import Tooltip from '../components/Tooltip'

import Utils from '../utils/Utils'
import Selectors from '../utils/Selectors'

import HyperResponsive from '../utils/HyperResponsive'
import Provider from '../utils/Provider'
import Connect from '../utils/Connect'

class Chart extends Component {
  static defaultProps = {
    getSeries: d => d,
    getX: d => Array.isArray(d) ? d[0] : d.x,
    getY: d => Array.isArray(d) ? d[1] : d.y,
    getR: d => Array.isArray(d) ? d[0] : d.r
  }
  constructor () {
    super()
    this.injestProps = this.injestProps.bind(this)
    this.measure = this.measure.bind(this)
  }
  componentDidMount () {
    this.injestProps(this.props)
    this.measure()
  }
  componentWillUpdate (nextProps) {
    // Any time these props change, we need to make them available
    // to the entire chart via context
    if (
      nextProps.data !== this.props.data ||
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height ||
      nextProps.getSeries !== this.props.getSeries ||
      nextProps.getX !== this.props.getX ||
      nextProps.getY !== this.props.getY ||
      nextProps.getR !== this.props.getR
    ) {
      this.injestProps(nextProps)
    }
  }
  componentDidUpdate (prevProps) {
    window.requestAnimationFrame(() => this.measure(prevProps))
  }
  injestProps (props) {
    const {
      data,
      width,
      height,
      getSeries,
      getX,
      getY,
      getR
    } = props

    // This will make all of the props available to anything using
    // the chart context
    this.props.dispatch(state => ({
      data,
      width,
      height,
      getSeries: Utils.normalizeGetter(getSeries),
      getX: Utils.normalizeGetter(getX),
      getY: Utils.normalizeGetter(getY),
      getR: Utils.normalizeGetter(getR)
    }))
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
    getX: state.getX,
    getY: state.getY,
    active: state.active,
    hovered: state.hovered,
    offset: Selectors.offset(state)
  }
})(Chart)

export default HyperResponsive(Provider(ReactChart))
