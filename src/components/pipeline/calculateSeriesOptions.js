import React from 'react'
import PropTypes from 'prop-types'
import Curves from '../../utils/Curves'

import Line from '../../seriesTypes/Line'
import Bubble from '../../seriesTypes/Bubble'
import Area from '../../seriesTypes/Area'
import Bar from '../../seriesTypes/Bar'

const seriesTypes = {
  line: Line,
  bubble: Bubble,
  area: Area,
  bar: Bar
  // pie: Pie
}

const defaultSeries = {
  type: 'line',
  showPoints: true,
  showOrphans: true,
  curve: 'monotoneX'
}

export const seriesPropType = PropTypes.oneOfType([
  PropTypes.shape({
    type: PropTypes.string,
    showPoints: PropTypes.bool,
    showOrphans: PropTypes.bool,
    curve: PropTypes.oneOf(Object.keys(Curves))
  }),
  PropTypes.func
])

export default ({ materializedData, series }) =>
  React.useMemo(
    () =>
      materializedData.map((s, seriesIndex) => {
        const { type, ...rest } = {
          ...defaultSeries,
          ...(typeof series === 'function' ? series(s, seriesIndex) : series)
        }
        const renderer = seriesTypes[type]
        if (!renderer) {
          throw new Error(`Could not find a registered series type for ${type}`)
        }
        return {
          ...rest,
          type,
          renderer
        }
      }),
    [materializedData, series]
  )
