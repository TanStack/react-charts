import { AxisOptions, GridDimensions, SeriesWithComponentIndex } from '../types'
import buildAxisLinear from './buildAxis.linear'

export default function (
  options: AxisOptions,
  materializedData: SeriesWithComponentIndex[],
  gridDimensions: GridDimensions
) {
  return buildAxisLinear(options, materializedData, gridDimensions)
}
