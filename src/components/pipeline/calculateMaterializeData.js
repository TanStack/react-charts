import { useMemo } from 'use-react-hooks'
//
import Utils from '../../utils/Utils'

export default ({
  getSeries,
  data,
  getSeriesID,
  getLabel,
  getPrimaryAxisID,
  getSecondaryAxisID,
  getDatums,
  getPrimary,
  getSecondary,
  getR
}) => {
  return useMemo(
    () => {
      getSeries = Utils.normalizeGetter(getSeries)
      getSeriesID = Utils.normalizeGetter(getSeriesID)
      getLabel = Utils.normalizeGetter(getLabel)
      getPrimaryAxisID = Utils.normalizeGetter(getPrimaryAxisID)
      getSecondaryAxisID = Utils.normalizeGetter(getSecondaryAxisID)
      getDatums = Utils.normalizeGetter(getDatums)
      getPrimary = Utils.normalizeGetter(getPrimary)
      getSecondary = Utils.normalizeGetter(getSecondary)
      getR = Utils.normalizeGetter(getR)

      // getSeries
      const originalData = getSeries(data)
      const materializedData = []

      // First access the data, and provide it to the context
      for (
        let seriesIndex = 0;
        seriesIndex < originalData.length;
        seriesIndex++
      ) {
        const originalSeries = originalData[seriesIndex]
        const seriesID = getSeriesID(originalSeries, seriesIndex, data)
        const seriesLabel = getLabel(originalSeries, seriesIndex, data)
        const primaryAxisID = getPrimaryAxisID(
          originalSeries,
          seriesIndex,
          data
        )
        const secondaryAxisID = getSecondaryAxisID(
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
            seriesID,
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
            r: getR(
              originalDatum,
              datumIndex,
              originalSeries,
              seriesIndex,
              data
            )
          }
        }

        materializedData[seriesIndex] = {
          originalSeries,
          index: seriesIndex,
          id: seriesID,
          label: seriesLabel,
          primaryAxisID,
          secondaryAxisID,
          datums
        }
      }

      return materializedData
    },
    [data]
  )
}
