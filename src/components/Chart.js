import React from 'react'
//
import Stack from '../components/Stack'
import Axis from '../components/Axis'
import Scale from '../components/Scale'
// import Interaction from '../components/Interaction'
import Animated from '../components/Animated'

import Selectors from '../utils/Selectors'

import HyperResponsive from '../utils/HyperResponsive'
import Provider from '../utils/Provider'
import Connect from '../utils/Connect'

const ReactChart = Connect((state) => {
  return {
    width: state.width,
    height: state.height,
    gridX: Selectors.gridX(state),
    gridY: Selectors.gridY(state)
  }
})(React.createClass({
  componentDidUpdate () {
    // const {
    //   dispatch
    // } = this.props
    //
    // const dims = this.el.getBoundingClientRect()
    // const groupDims = this.groupEl.getBoundingClientRect()
    //
    // if (!groupDims.width && !groupDims.height) {
    //   return
    // }
    //
    // const gridOffsetWidth = dims.width - groupDims.width
    // const gridOffsetHeight = dims.height - groupDims.height
    // // const gridOffsetX = dims.left - groupDims.left
    // // const gridOffsetY = dims.top - groupDims.top
    //
    // console.log(
    //   gridOffsetWidth,
    //   gridOffsetHeight,
    //   // gridOffsetX,
    //   // gridOffsetY
    // )
    //
    // if (
    //   gridOffsetWidth !== 0 ||
    //   gridOffsetHeight !== 0
    // ) {
    //   setTimeout(() => dispatch(state => {
    //     return {
    //       ...state,
    //       gridOffsetWidth: (gridOffsetWidth || 0) + gridOffsetWidth,
    //       gridOffsetHeight: (gridOffsetHeight || 0) + gridOffsetHeight
    //     }
    //   }), 500)
    // }

    // if (
    //   gridOffsetX || gridOffsetY
    // ) {
    //   setTimeout(() => dispatch(state => {
    //     return {
    //       ...state,
    //       gridOffsetX: (state.gridOffsetX || 0) - gridOffsetX,
    //       gridOffsetY: (state.gridOffsetY || 0) - gridOffsetY
    //     }
    //   }), 500)
    // }

  },
  render () {
    const {
      style,
      width,
      height,
      gridX,
      gridY
    } = this.props

    return (
      <div
        className='Chart'
      >
        <Animated
          style={spring => ({
            gridX: spring(gridX),
            gridY: spring(gridY)
          })}
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
                // border: '3px solid rgba(0,0,0, 0.2)',
                overflow: 'visible',
                ...style
              }}
            >
              <g
                ref={el => { this.groupEl = el }}
                transform={`translate(${gridX}, ${gridY})`}
              >
                <Scale
                  type='x'
                >
                  <Axis
                    type='x'
                    position='bottom'
                  />
                </Scale>
                <Scale
                  type='y'
                >
                  <Axis
                    type='y'
                    position='left'
                  />
                </Scale>
                <Stack
                  type='line'
                />
                {/* <Interaction
                  {...this.props}
                  scaleX={scaleX}
                  scaleY={scaleY}
                  getX={getX}
                  getY={getY}
                  {...layout}
                  onHover={(hovered, e) => this.setState({hovered})}
                  onActivate={(active, e) => {
                  if (this.state.active === active) {
                  return this.setState({active: null})
                  }
                  this.setState({active})
                  }}
                /> */}
              </g>
            </svg>
          )}
        </Animated>
        {/* <Tooltip
          {...this.props}
          scaleX={scaleX}
          scaleY={scaleY}
          {...layout}
          hovered={hovered}
        /> */}
      </div>
    )
  }
}))

export default HyperResponsive(Provider(ReactChart))
