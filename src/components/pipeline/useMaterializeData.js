import React from 'react'
//

export default ({
  data,
  getSeriesId,
  getLabel,
  getPrimaryAxisId,
  getSecondaryAxisId,
  getDatums,
  getPrimary,
  getSecondary,
  getR,
}) => {
  return React.useMemo(() => {
    const materializedData = []

    // First access the data, and provide it to the context
    for (let seriesIndex = 0; seriesIndex < data.length; seriesIndex++) {
      const originalSeries = data[seriesIndex]
      const seriesId = getSeriesId(originalSeries, seriesIndex, data)
      const seriesLabel = getLabel(originalSeries, seriesIndex, data)
      const primaryAxisId = getPrimaryAxisId(originalSeries, seriesIndex, data)
      const secondaryAxisId = getSecondaryAxisId(
        originalSeries,
        seriesIndex,
        data
      )
      const originalDatums = getDatums(originalSeries, seriesIndex, data)
      const datums = []

      for (
        let datumIndex = 0;
        datumIndex < originalDatums.length;
        datumIndex++
      ) {
        const originalDatum = originalDatums[datumIndex]
        datums[datumIndex] = {
          originalSeries,
          seriesIndex,
          seriesId,
          seriesLabel,
          index: datumIndex,
          originalDatum,
          primary: getPrimary(
            originalDatum,
            datumIndex,
            originalSeries,
            seriesIndex,
            data
          ),
          secondary: getSecondary(
            originalDatum,
            datumIndex,
            originalSeries,
            seriesIndex,
            data
          ),
          r: getR(originalDatum, datumIndex, originalSeries, seriesIndex, data),
        }
      }

      materializedData[seriesIndex] = {
        originalSeries,
        index: seriesIndex,
        id: seriesId,
        label: seriesLabel,
        primaryAxisId,
        secondaryAxisId,
        datums,
      }
    }

    return materializedData
  }, [
    data,
    getDatums,
    getLabel,
    getPrimary,
    getPrimaryAxisId,
    getR,
    getSecondary,
    getSecondaryAxisId,
    getSeriesId,
  ])
}
