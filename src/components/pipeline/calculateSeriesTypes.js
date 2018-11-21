import { useMemo } from 'use-react-hooks'

export default ({ materializedData, seriesOptions }) =>
  useMemo(
    () => {
      return materializedData
        .map((series, i) => {
          series.Component = seriesOptions[i].renderer
          return series
        })
        .map((series, i, all) => {
          const seriesTypeIndex = all.filter(
            (d, j) => j < i && d.Component === series.Component
          ).length
          return {
            ...series,
            seriesTypeIndex,
            datums: series.datums.map(datum => ({
              ...datum,
              seriesTypeIndex
            }))
          }
        })
    },
    [materializedData, ...seriesOptions.map(d => d.renderer)]
  )
