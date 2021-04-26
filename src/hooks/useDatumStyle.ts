import useChartContext from './useChartContext'
//

export default function useDatumStyle(datum) {
  const { focused, getDatumStyle } = useChartContext()
  return datum.getStatusStyle(focused, getDatumStyle)
}
