import React from 'react'
import 'javascript-detect-element-resize'
//
import Scale from '../utils/scale'
import throttle from '../utils/throttle'
import Axis from '../components/Axis'
import Group from '../primitives/Group'
import Curve from '../primitives/Curve'

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
      height
    } = this.props

    const scaleX = Scale({
      data,
      axis: 'x',
      width,
      height
    })

    const scaleY = Scale({
      data,
      axis: 'y',
      width,
      height
    })

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: width,
          height: height
        }}
      >
        <Group>
          {data.map((series, i) => (
            <Curve
              key={i}
              data={series}
              scaleX={scaleX}
              scaleY={scaleY}
            />
          ))}
        </Group>
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
      </svg>
    )
  }
}))
