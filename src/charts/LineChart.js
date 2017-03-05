import React from 'react'
import 'javascript-detect-element-resize'
//
import Stack from '../components/Stack'
import Axis from '../components/Axis'
import Tooltip from '../components/Tooltip'

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
          ref={el => { this.el = el }}
          style={{
            width: '100%',
            height: '100%',
            ...style
          }}
        >
          {ready && (
            <WrappedComponent
              {...rest}
              width={width}
              height={height}
            />
          )}
        </div>
      )
    }
  })
}

export default ResponsiveWrapper(React.createClass({
  render () {
    const {
      data,
      width,
      height,
      style,
      ...rest
    } = this.props

    // Should only run on update
    const scaleX = Scale({
      axis: 'x',
      data,
      width,
      height
    })
    const scaleY = Scale({
      axis: 'y',
      data,
      width,
      height
    })

    // TODO: Calculate Axis Bounds

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: width,
          height: height,
          ...style
        }}
        {...rest}
      >
        <Axis
          axis='x'
          scale={scaleX}
          height={height}
          width={width}
        />
        <Axis
          axis='y'
          scale={scaleY}
          height={height}
          width={width}
        />
        <Stack
          {...this.props}
          scaleX={scaleX}
          scaleY={scaleY}
          height={height}
          width={width}
        />
        <Tooltip
          {...this.props}
          scaleX={scaleX}
          scaleY={scaleY}
          height={height}
          width={width}
        />
      </svg>
    )
  }
}))
