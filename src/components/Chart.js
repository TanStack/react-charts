import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
//
import Selectors from '../utils/Selectors'
import HyperResponsive from '../utils/HyperResponsive'
import Provider from '../utils/Provider'
import Connect from '../utils/Connect'
import Utils from '../utils/Utils'

import Interaction from '../components/Interaction'
import Tooltip from '../components/Tooltip'

class Chart extends PureComponent {
  static defaultProps = {
    getData: d => d,
    getLabel: (d, i) => 'Series ' + (i + 1),
    getSeriesID: (d, i) => i,
    getX: d => Array.isArray(d) ? d[0] : d.x,
    getY: d => Array.isArray(d) ? d[1] : d.y,
    getR: d => Array.isArray(d) ? d[0] : d.r
  }
  constructor () {
    super()
    this.updateDataModel = this.updateDataModel.bind(this)
    this.measure = this.measure.bind(this)
    this.onHover = this.onHover.bind(this)
  }
  componentDidMount () {
    this.updateDataModel(this.props)
    this.measure()
  }
  componentWillUpdate (nextProps) {
    // If anything related to the data model changes, update it
    if (
      nextProps.data !== this.props.data ||
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height ||
      nextProps.getData !== this.props.getData ||
      nextProps.getSeriesID !== this.props.getSeriesID ||
      nextProps.getLabel !== this.props.getLabel ||
      nextProps.getX !== this.props.getX ||
      nextProps.getY !== this.props.getY ||
      nextProps.getR !== this.props.getR
    ) {
      this.updateDataModel(nextProps)
    }
  }
  componentDidUpdate (prevProps) {
    window.requestAnimationFrame(() => this.measure(prevProps))
  }
  updateDataModel (props) {
    const {
      data
    } = props
    let {
      getData,
      getLabel,
      getSeriesID,
      getX,
      getY,
      getR
    } = props

    // Normalize getters
    getData = Utils.normalizePathGetter(getData)
    getLabel = Utils.normalizePathGetter(getLabel)
    getSeriesID = Utils.normalizePathGetter(getSeriesID)
    getX = Utils.normalizePathGetter(getX)
    getY = Utils.normalizePathGetter(getY)
    getR = Utils.normalizePathGetter(getR)

    // First access the data, and provide it to the context
    const accessedData = data.map((s, seriesIndex) => {
      const seriesID = getSeriesID(s, seriesIndex)
      const seriesLabel = getLabel(s, seriesIndex)
      return {
        row: s,
        index: seriesIndex,
        id: seriesID,
        label: seriesLabel,
        data: getData(s, seriesIndex).map((d, index) => {
          return {
            row: s,
            seriesIndex,
            seriesID,
            seriesLabel,
            index,
            datum: d,
            primary: getX(d, index),
            secondary: getY(d, index),
            r: getR(d, index)
          }
        })
      }
    })

    // This will make all of the props available to anything using
    // the chart context
    this.props.dispatch(state => ({
      ...state,
      accessedData
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
                  onHover={this.onHover}
                  onActivate={this.onActivate}
                />
              </g>
            </svg>
          )}
        </Animate>
        <Tooltip />
      </div>
    )
  }
  onHover (hovered, e) {
    return this.props.dispatch(state => ({
      ...state,
      hovered
    }))
  }
  onActivate (newActive, e) {
    const {
      active,
      dispatch
    } = this.props
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
  }
}

const ReactChart = Connect((state) => {
  return {
    data: state.data,
    width: state.width,
    height: state.height,
    gridX: Selectors.gridX(state),
    gridY: Selectors.gridY(state),
    active: state.active,
    hovered: state.hovered,
    offset: Selectors.offset(state)
  }
})(Chart)

export default HyperResponsive(Provider(ReactChart))
