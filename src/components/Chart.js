import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
import { Provider, Connect } from 'codux'
//
import Selectors from '../utils/Selectors'
import HyperResponsive from '../utils/HyperResponsive'
import Utils from '../utils/Utils'

import Rectangle from '../primitives/Rectangle'
import Voronoi from '../components/Voronoi'

class Chart extends PureComponent {
  static defaultProps = {
    getData: d => d,
    getLabel: (d, i) => 'Series ' + (i + 1),
    getSeriesID: (d, i) => i,
    getPrimary: d => Array.isArray(d) ? d[0] : d.x,
    getSecondary: d => Array.isArray(d) ? d[1] : d.y,
    getR: d => Array.isArray(d) ? d[0] : d.r,
    decorate: d => ({}),
    interaction: 'closestPoint'
  }
  constructor () {
    super()
    this.updateDataModel = this.updateDataModel.bind(this)
    this.measure = this.measure.bind(this)
    this.onCursor = Utils.throttle(this.onCursor.bind(this), 16)
    this.onCursorLeave = this.onCursorLeave.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(state => ({
      ...state,
      interaction: this.props.interaction
    }))
    this.updateDataModel(this.props)
    this.measure()
  }
  componentWillUpdate (nextProps) {
    // If anything related to the data model changes, update it
    if (nextProps.interaction !== this.props.interaction) {
      this.props.dispatch(state => ({
        ...state,
        interaction: nextProps.interaction
      }))
    }

    if (
      nextProps.data !== this.props.data ||
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height ||
      nextProps.getData !== this.props.getData ||
      nextProps.getSeriesID !== this.props.getSeriesID ||
      nextProps.getLabel !== this.props.getLabel ||
      nextProps.getPrimary !== this.props.getPrimary ||
      nextProps.getSecondary !== this.props.getSecondary ||
      nextProps.getR !== this.props.getR
    ) {
      this.updateDataModel(nextProps)
    }
  }
  componentDidUpdate (prevProps) {
    window.requestAnimationFrame(() => this.measure(prevProps))
    this.dims = this.el.getBoundingClientRect()
  }
  updateDataModel (props) {
    const {
      data
    } = props
    let {
      getData,
      getLabel,
      getSeriesID,
      getPrimary,
      getSecondary,
      getR
    } = props

    // Normalize getters
    getData = Utils.normalizePathGetter(getData)
    getLabel = Utils.normalizePathGetter(getLabel)
    getSeriesID = Utils.normalizePathGetter(getSeriesID)
    getPrimary = Utils.normalizePathGetter(getPrimary)
    getSecondary = Utils.normalizePathGetter(getSecondary)
    getR = Utils.normalizePathGetter(getR)

    // First access the data, and provide it to the context
    let materializedData = data.map((s, seriesIndex) => {
      const seriesID = getSeriesID(s, seriesIndex)
      const seriesLabel = getLabel(s, seriesIndex)
      const series = {
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
            primary: getPrimary(d, index),
            secondary: getSecondary(d, index),
            r: getR(d, index)
          }
        })
      }
      return series
    })

    // Provide the materializedData to the chart instance
    this.props.dispatch(state => ({
      ...state,
      materializedData
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

    const allChildren = React.Children.toArray(children)
    const svgChildren = allChildren.filter(d => !d.type.isHTML)
    const htmlChildren = allChildren.filter(d => d.type.isHTML)

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
                ref={el => { this.el = el }}
                transform={`translate(${gridX}, ${gridY})`}
                onMouseEnter={e => {
                  e.persist()
                  this.onCursor(e)
                }}
                onMouseMove={e => {
                  e.persist()
                  this.onCursor(e)
                }}
                onMouseLeave={this.onCursorLeave}
              >
                <Rectangle
                  // This is to ensure the cursor always has something to hit
                  x1={-gridX}
                  x2={width - gridX}
                  y1={-gridY}
                  y2={height - gridY}
                  style={{
                    opacity: 0
                  }}
                />
                {svgChildren}
                <Voronoi />
              </g>
            </svg>
          )}
        </Animate>
        {htmlChildren}
      </div>
    )
  }
  onCursor ({
    clientX,
    clientY
  }) {
    const {
      gridX,
      gridY,
      dispatch
    } = this.props
    dispatch(state => ({
      ...state,
      cursor: {
        active: true,
        x: clientX - this.dims.left - gridX,
        y: clientY - this.dims.top - gridY
      }
    }))
  }
  onCursorLeave () {
    this.props.dispatch(state => ({
      ...state,
      cursor: {
        ...state.cursor,
        active: false
      },
      hovered: {
        ...state.hovered,
        active: false
      }
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
    cursor: state.cursor,
    offset: Selectors.offset(state),
    selected: state.selected
  }
})(Chart)

export default HyperResponsive(Provider(ReactChart))
