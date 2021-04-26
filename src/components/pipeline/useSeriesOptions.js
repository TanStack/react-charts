import React from 'react';
//

import { curveMonotoneX } from '@visx/curve';

import Line from '../../seriesTypes/Line';
import Bubble from '../../seriesTypes/Bubble';
import Area from '../../seriesTypes/Area';
import Bar from '../../seriesTypes/Bar';

const seriesTypes = {
  line: Line,
  bubble: Bubble,
  area: Area,
  bar: Bar,
};

const defaultSeries = {
  type: 'line',
  showPoints: true,
  showOrphans: true,
  curve: curveMonotoneX,
};

export default ({ materializedData, series }) => {
  return React.useMemo(
    () =>
      materializedData.map((s, seriesIndex) => {
        const { type, ...rest } = {
          ...defaultSeries,
          ...(typeof series === 'function' ? series(s, seriesIndex) : series),
        };
        const renderer = seriesTypes[type];
        if (!renderer) {
          throw new Error(
            `Could not find a registered series type for ${type}`
          );
        }
        return {
          ...rest,
          type,
          renderer,
        };
      }),
    [materializedData, series]
  );
};
