import React, { Component } from 'react'
import { Provider, Connect } from 'react-state'
import RAF from 'raf'
//
import { Animate } from './ReactMove'
import Selectors from '../utils/Selectors'
import HyperResponsive from '../utils/HyperResponsive'
import Utils from '../utils/Utils'

import Rectangle from '../primitives/Rectangle'
import Voronoi from '../components/Voronoi'

class Chart extends Component {
  static defaultProps = {
    getData: d => d.data,
    getLabel: (d, i) => d.label || `Series ${i + 1}`,
    getSeriesID: (d, i) => i,
    getPrimary: d => (Array.isArray(d) ? d[0] : d.x),
    getSecondary: d => (Array.isArray(d) ? d[1] : d.y),
    getR: d => (Array.isArray(d) ? d[2] : d.r),
    interaction: null,
    hoverMode: 'primary',
    groupMode: 'primary',
    showVoronoi: false,
  }
  componentDidMount () {
    const {
      interaction, hoverMode, groupMode, showVoronoi, dispatch,
    } = this.props
    if (interaction) {
      dispatch(
        state => ({
          ...state,
          interaction,
        }),
        {
          type: 'interaction',
        }
      )
    }
    if (hoverMode) {
      dispatch(
        state => ({
          ...state,
          hoverMode,
        }),
        {
          type: 'hoverMode',
        }
      )
    }
    if (groupMode) {
      dispatch(
        state => ({
          ...state,
          groupMode,
        }),
        {
          type: 'groupMode',
        }
      )
    }
    if (showVoronoi) {
      dispatch(
        state => ({
          ...state,
          showVoronoi,
        }),
        {
          type: 'showVoronoi',
        }
      )
    }
    this.updateDataModel(this.props)
    this.componentDidUpdate(this.props)
  }
  componentWillReceiveProps (nextProps) {
    // If anything related to the data model changes, update it
    if (nextProps.interaction !== this.props.interaction) {
      this.props.dispatch(
        state => ({
          ...state,
          interaction: nextProps.interaction,
        }),
        {
          type: 'interaction',
        }
      )
    }

    if (nextProps.hoverMode !== this.props.hoverMode) {
      this.props.dispatch(
        state => ({
          ...state,
          hoverMode: nextProps.hoverMode,
        }),
        {
          type: 'hoverMode',
        }
      )
    }
    if (nextProps.groupMode !== this.props.groupMode) {
      this.props.dispatch(
        state => ({
          ...state,
          groupMode: nextProps.groupMode,
        }),
        {
          type: 'groupMode',
        }
      )
    }
    if (nextProps.showVoronoi !== this.props.showVoronoi) {
      this.props.dispatch(
        state => ({
          ...state,
          showVoronoi: nextProps.showVoronoi,
        }),
        {
          type: 'showVoronoi',
        }
      )
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
  shouldComponentUpdate (nextProps) {
    if (
      nextProps.style !== this.props.style ||
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height ||
      nextProps.gridX !== this.props.gridX ||
      nextProps.gridY !== this.props.gridY ||
      nextProps.children !== this.props.children
    ) {
      return true
    }
    return false
  }
  componentDidUpdate (prevProps) {
    RAF(() => this.measure(prevProps))
  }
  updateDataModel = props => {
    const { data } = props
    let {
      getData, getLabel, getSeriesID, getPrimary, getSecondary, getR,
    } = props

    // Normalize getters
    getData = Utils.normalizePathGetter(getData)
    getLabel = Utils.normalizePathGetter(getLabel)
    getSeriesID = Utils.normalizePathGetter(getSeriesID)
    getPrimary = Utils.normalizePathGetter(getPrimary)
    getSecondary = Utils.normalizePathGetter(getSecondary)
    getR = Utils.normalizePathGetter(getR)

    // First access the data, and provide it to the context
    const preMaterializedData = data.map((s, seriesIndex) => {
      const seriesID = getSeriesID(s, seriesIndex)
      const seriesLabel = getLabel(s, seriesIndex)
      const series = {
        row: s,
        index: seriesIndex,
        id: seriesID,
        label: seriesLabel,
        data: getData(s, seriesIndex).map((d, index) => ({
          row: s,
          seriesIndex,
          seriesID,
          seriesLabel,
          index,
          original: d,
          primary: getPrimary(d, index),
          secondary: getSecondary(d, index),
          r: getR(d, index),
        })),
      }
      return series
    })

    // Provide the preMaterializedData to the chart instance
    this.props.dispatch(
      state => ({
        ...state,
        preMaterializedData,
      }),
      {
        type: 'preMaterializedData',
      }
    )
  }
  measure = prevProps => {
    if (
      prevProps &&
      (this.props.offset.left !== prevProps.offset.left ||
        this.props.offset.top !== prevProps.offset.top)
    ) {
      this.props.dispatch(
        state => ({
          ...state,
          offset: {
            left: this.el.offsetLeft,
            top: this.el.offsetTop,
          },
        }),
        {
          type: 'offset',
        }
      )
    }
  }
  render () {
    const {
      style, width, height, handleRef, gridX, gridY, children,
    } = this.props

    const allChildren = React.Children.toArray(children)
    const svgChildren = allChildren.filter(d => !d.type.isHtml)
    const htmlChildren = allChildren.filter(d => d.type.isHtml)

    return (
      <div
        ref={handleRef}
        className="ReactChart"
        style={{
          width: 0,
          height: 0,
          position: 'relative',
        }}
      >
        <Animate
          start={{
            gridX,
            gridY,
          }}
          update={{
            gridX: [gridX],
            gridY: [gridY],
          }}
        >
          {({ gridX, gridY }) => (
            <svg
              ref={el => {
                this.el = el
              }}
              style={{
                width,
                height,
                ...style,
              }}
            >
              <g
                transform={`translate(${gridX || 0}, ${gridY || 0})`}
                onMouseEnter={e => {
                  e.persist()
                  this.onMouseMove(e)
                }}
                onMouseMove={e => {
                  e.persist()
                  this.onMouseMove(e)
                }}
                onMouseLeave={this.onMouseLeave}
                onMouseDown={this.onMouseDown}
              >
                <Rectangle
                  // This is to ensure the cursor always has something to hit
                  x1={-gridX}
                  x2={width - gridX}
                  y1={-gridY}
                  y2={height - gridY}
                  style={{
                    opacity: 0,
                  }}
                />
                <Voronoi />
                {svgChildren}
              </g>
            </svg>
          )}
        </Animate>
        {htmlChildren}
      </div>
    )
  }
  onMouseMove = Utils.throttle(e => {
    const { clientX, clientY } = e
    this.dims = this.el.getBoundingClientRect()
    const { gridX, gridY, dispatch } = this.props

    dispatch(
      state => {
        const cursor = {
          ...state.cursor,
          active: true,
          x: clientX - this.dims.left - gridX,
          y: clientY - this.dims.top - gridY,
          dragging: state.cursor && state.cursor.down,
        }
        return {
          ...state,
          cursor,
        }
      },
      {
        type: 'cursor',
      }
    )
  })
  onMouseLeave = () => {
    this.props.dispatch(
      state => ({
        ...state,
        cursor: {
          ...state.cursor,
          active: false,
        },
        hovered: {
          ...state.hovered,
          active: false,
        },
      }),
      {
        type: 'cursor_hovered',
      }
    )
  }
  onMouseDown = () => {
    const { dispatch } = this.props

    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)

    dispatch(
      state => ({
        ...state,
        cursor: {
          ...state.cursor,
          sourceX: state.cursor.x,
          sourceY: state.cursor.y,
          down: true,
        },
      }),
      {
        type: 'cursor',
      }
    )
  }
  onMouseUp = () => {
    const { dispatch } = this.props

    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mousemove', this.onMouseMove)

    dispatch(
      state => ({
        ...state,
        cursor: {
          ...state.cursor,
          down: false,
          dragging: false,
          released: {
            x: state.cursor.x,
            y: state.cursor.y,
          },
        },
      }),
      {
        type: 'cursor',
      }
    )
  }
}

const ReactChart = Connect(
  () => {
    const selectors = {
      primaryAxis: Selectors.primaryAxis(),
      gridWidth: Selectors.gridWidth(),
      gridHeight: Selectors.gridHeight(),
      gridX: Selectors.gridX(),
      gridY: Selectors.gridY(),
      offset: Selectors.offset(),
    }
    return state => ({
      data: state.data,
      width: state.width,
      height: state.height,
      gridWidth: selectors.gridWidth(state),
      gridHeight: selectors.gridHeight(state),
      gridX: selectors.gridX(state),
      gridY: selectors.gridY(state),
      active: state.active,
      offset: selectors.offset(state),
      selected: state.selected,
    })
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
  }
)(Chart)

const ProvidedChart = Provider(ReactChart, {
  initial: {
    hovered: {
      active: false,
      series: null,
      datums: [],
    },
  },
})

export default props => (
  <HyperResponsive
    render={({ handleRef, width, height }) => (
      <ProvidedChart {...props} width={width} height={height} handleRef={handleRef} />
    )}
  />
)
