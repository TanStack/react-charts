import React from 'react'
import { Motion, spring } from 'react-motion'
import { line } from 'd3-shape'
import { scaleLinear } from 'd3-scale'

const getX = d => Array.isArray(d) ? d[0] : d.x
const getY = d => Array.isArray(d) ? d[1] : d.y

// Primitives

const Line = React.createClass({
  getDefaultProps () {
    return {
      strokeWidth: '2',
      stroke: 'black',
      fill: 'transparent'
    }
  },
  render () {
    const {
      x1,
      y1,
      x2,
      y2,
      ...rest
    } = this.props

    const animated = {
      x1: spring(x1),
      y1: spring(y1),
      x2: spring(x2),
      y2: spring(y2)
    }

    return (
      <Motion
        style={{
          // anything being animated should have a key/value here
          ...animated
        }}
      >
        {({
          x1,
          y1,
          x2,
          y2
        }) => (
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            {...rest}
          />
        )}
      </Motion>
    )
  }
})

const Text = React.createClass({
  getDefaultProps () {
    return {
      fontFamily: 'Helvetica',
      fontSize: 10
    }
  },
  render () {
    const {
      x,
      y,
      ...rest
    } = this.props

    const animated = {
      x: spring(x),
      y: spring(y)
    }

    return (
      <Motion
        style={{
          // anything being animated should have a key/value here
          ...animated
        }}
      >
        {({
          x,
          y
        }) => (
          <text
            x={x}
            y={y}
            {...rest}
          />
        )}
      </Motion>
    )
  }
})

// const Circle = React.createClass({
//   getDefaultProps () {
//     return {
//       r: 3,
//       strokeWidth: '2',
//       stroke: 'red',
//       fill: 'transparent'
//     }
//   },
//   render () {
//     const {
//       x,
//       y,
//       r,
//       ...rest
//     } = this.props
//     return (
//       <circle
//         {...rest}
//         cx={x}
//         cy={y}
//         r={r}
//       />
//     )
//   }
// })

const Curve = React.createClass({
  getDefaultProps () {
    return {
      // Set up some default getters for our x and y values
      getX,
      getY,
      strokeWidth: '2',
      stroke: 'royalblue',
      fill: 'transparent'
    }
  },
  render () {
    const {
      data,
      getX,
      getY,
      scaleX,
      scaleY,
      ...rest
    } = this.props

    // For react-motion to interpolate correctly, it needs to interpolate
    // the x and y values independently for each point. So we create an
    // object that maps to the available points in the data array
    const pathKeyPrefix = 'path_'
    const pathXPrefix = pathKeyPrefix + 'x_'
    const pathYPrefix = pathKeyPrefix + 'y_'

    const pathSpringMap = {}
    data.forEach((d, i) => {
      // Interpolate each x and y with the default spring
      pathSpringMap[pathXPrefix + i] = spring(scaleX(getX(d)))
      pathSpringMap[pathYPrefix + i] = spring(scaleY(getY(d)))
    })

    return (
      <Motion
        style={{
          // anything being animated should have a key/value here
          ...pathSpringMap
        }}
      >
        {interpolated => {
          // Map back through the data, using the interpolated data point
          const interData = data.map((d, i) => [
            interpolated[pathXPrefix + i],
            interpolated[pathYPrefix + i]
          ])
          // Create the path using the interpolated data
          const path = line()(interData)
          return (
            <path
              {...rest}
              d={path}
            />
          )
        }}
      </Motion>
    )
  }
})

// Components

const Stack = React.createClass({
  render () {
    const {
      children
    } = this.props

    return (
      <g>
        {children}
      </g>
    )
  }
})

const Scale = ({
  data,
  axis,
  width,
  height
}) => {
  const getter = axis === 'y' ? getY : getX
  const vals = []

  data.forEach(series => {
    series.forEach(d => {
      vals.push(getter(d))
    })
  })

  const min = Math.min(...vals)
  const max = Math.max(...vals)

  return scaleLinear()
    .domain([min, max])
    .range([0, axis === 'y' ? height : width])
}

const Axis = React.createClass({
  render () {
    const {
      axis,
      scale,
      height,
      width
    } = this.props

    const range = scale.range()

    const x1 = 0
    const y1 = axis === 'x' ? height : 0

    const x2 = axis === 'x' ? width : 0
    const y2 = axis === 'x' ? height : range[1]

    const ticks = scale.ticks()

    return (
      <g>
        <Line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={axis === 'y' ? 'red' : 'green'}
        />
        <g>
          {ticks.map((d, i) => {
            const zero = 0
            const val = scale(d)
            const x = axis === 'y' ? zero : val
            const y = axis === 'y' ? val : height
            return (
              <Line
                key={i}
                x1={x}
                y1={y}
                x2={axis === 'y' ? x + 5 : x}
                y2={axis === 'y' ? y : y - 5}
                stroke={axis === 'y' ? 'red' : 'green'}
              />
            )
          })}
        </g>
        <g>
          {ticks.map((d, i) => {
            const zero = 0
            const val = scale(d)
            const x = axis === 'y' ? zero : val
            const y = axis === 'y' ? val : height
            return (
              <Text
                key={i}
                x={axis === 'y' ? x + 5 : x}
                y={axis === 'y' ? y : y - 5}
                stroke={axis === 'y' ? 'red' : 'green'}
              >
                {d}
              </Text>
            )
          })}
        </g>
      </g>
    )
  }
})

export default React.createClass({
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
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <Stack>
          {data.map((series, i) => (
            <Curve
              key={i}
              data={series}
              scaleX={scaleX}
              scaleY={scaleY}
            />
          ))}
        </Stack>
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
})
