import React from 'react'
import { voronoi } from 'd3-voronoi'
//
import Curve from '../primitives/Curve'
import Text from '../primitives/Text'

const getX = d => Array.isArray(d) ? d[0] : d.x
const getY = d => Array.isArray(d) ? d[1] : d.y

export default React.createClass({
  getInitialState () {
    return {
      tooltip: null
    }
  },
  render () {
    const {
      data,
      scaleX,
      scaleY,
      height
      // width
    } = this.props
    const {
      tooltip
    } = this.state

    const flatData = data.reduce((prev, now) => prev.concat(now), [])
    const mappedData = flatData.map(d => [scaleX(getX(d)), height - scaleY(getY(d))])
    const extent = [[0, 0], [scaleX.range()[1], scaleY.range()[1]]]

    const vor = voronoi()
      .extent(extent)(mappedData)

    const polygons = vor.polygons()

    return (
      <g
        onMouseLeave={e => {
          this.setState({
            tooltip: null
          })
        }}
      >
        {polygons.map((poly, i) => (
          <Curve
            key={i}
            points={poly}
            showPoints={false}
            stroke='transparent'
            onMouseEnter={e => {
              this.setState({
                tooltip: poly.data
              })
            }}
          />
        ))}
        {!!tooltip && (
          <Text
            x={tooltip[0]}
            y={tooltip[1]}
          >
            x: {tooltip[0]} - y: {tooltip[1]}
          </Text>
        )}
      </g>
    )
  }
})
