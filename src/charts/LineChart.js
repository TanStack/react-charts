import React from 'react'
import 'javascript-detect-element-resize'
//
import Stack from '../components/Stack'
import Axis from '../components/Axis'
import Interaction from '../components/Interaction'

import Scale from '../utils/Scale'
import throttle from '../utils/throttle'

const ResponsiveWrapper = (WrappedComponent) => {
  return React.createClass({
    getInitialState () {
      return {
        ready: false,
        width: 0,
        height: 0
      }
    },
    componentWillMount () {
      this.resize = throttle(this.resize, 16)
    },
    componentDidMount () {
      window.addResizeListener(this.el, this.resize)
      this.resize()
    },
    componentWillUnmount () {
      window.removeResizeListener(this.el, this.resize)
    },
    resize (e) {
      this.setState({
        ready: true,
        width: parseInt(window.getComputedStyle(this.el).width),
        height: parseInt(window.getComputedStyle(this.el).height)
      })
    },
    render () {
      const {
        style,
        ...rest
      } = this.props
      const {
        ready,
        width,
        height
      } = this.state
      return (
        <div
          className='ResponsiveWrapper'
          ref={el => { this.el = el }}
          style={{
            width: '100%',
            height: '100%',
            ...style
          }}
        >
          {ready && (
            <WrappedComponent
              width={width}
              height={height}
              {...rest}
            />
          )}
        </div>
      )
    }
  })
}

export default ResponsiveWrapper(React.createClass({
  getInitialState () {
    return {
      active: null,
      hovered: null
    }
  },
  render () {
    const {
      data,
      style,
      width,
      height,
      ...rest
    } = this.props

    const {
      hovered,
      active
    } = this.state

    const marginLeft = 50
    const marginRight = 50
    const marginTop = 10
    const marginBottom = 30

    const layout = {
      width: width - marginLeft - marginRight,
      height: height - marginTop - marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom
    }

    const getX = d => Array.isArray(d) ? d[0] : d.x
    const getY = d => Array.isArray(d) ? d[1] : d.y

    // Should only run on update
    const scaleX = Scale({
      axis: 'x',
      data,
      getX,
      getY,
      ...layout
    })
    const scaleY = Scale({
      axis: 'y',
      data,
      getX,
      getY,
      ...layout
    })

    // TODO: Calculate Axis Bounds

    return (
      <div
        className='Chart'
      >
        <svg
          style={{
            width: width,
            height: height,
            border: '1px solid black',
            ...style
          }}
          {...rest}
        >
          <g
            transform={`translate(${marginLeft}, ${marginTop})`}
          >
            <Axis
              position='bottom'
              scale={scaleX}
              getX={getX}
              getY={getY}
              {...layout}
            />
            <Axis
              position='left'
              scale={scaleY}
              getX={getX}
              getY={getY}
              {...layout}
            />
            <Stack
              {...this.props}
              scaleX={scaleX}
              scaleY={scaleY}
              getX={getX}
              getY={getY}
              {...layout}
              hovered={hovered}
              active={active}
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
