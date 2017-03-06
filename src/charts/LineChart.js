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
  // getInitialState () {
  //   const {
  //     width,
  //     height
  //   } = this.props
  //   return {
  //     layout: {
  //       width,
  //       height
  //     }
  //   }
  // },
  // componentWillReceiveProps (nextProps, nextState) {
  //   console.log(nextProps)
  //   const prevProps = this.props
  //   if (
  //     prevProps.width !== nextProps.width ||
  //     prevProps.height !== nextProps.height
  //   ) {
  //     this.setState({
  //       width: nextProps.width,
  //       height: nextProps.width
  //     })
  //   }
  // },
  // updateLayout (state) {
  //   this.setState({
  //     layout: {
  //       ...this.state.layout,
  //       ...state
  //     }
  //   })
  // },
  render () {
    const {
      data,
      style,
      width,
      height,
      ...rest
    } = this.props

    const marginLeft = 50
    const marginRight = 50
    const marginTop = 50
    const marginBottom = 50

    const layout = {
      width: width - marginLeft - marginRight,
      height: height - marginTop - marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom
    }

    // Should only run on update
    const scaleX = Scale({
      axis: 'x',
      data,
      ...layout
    })
    const scaleY = Scale({
      axis: 'y',
      data,
      ...layout
    })

    // TODO: Calculate Axis Bounds

    return (
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
            {...layout}
          />
          <Axis
            position='left'
            scale={scaleY}
            {...layout}
          />
          <Stack
            {...this.props}
            scaleX={scaleX}
            scaleY={scaleY}
            layout={layout}
            updateLayout={this.updateLayout}
          />
          {/* <Tooltip
            {...this.props}
            scaleX={scaleX}
            scaleY={scaleY}
            layout={layout}
            updateLayout={this.updateLayout}
          /> */}
        </g>
      </svg>
    )
  }
}))
