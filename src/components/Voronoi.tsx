import React, { isValidElement } from 'react';
import { Delaunay, line } from '../../d3';
import useChartContext from '../hooks/useChartContext';
import useChartState from '../hooks/useChartState';
//
import Path from '../primitives/Path';
import Rectangle from '../primitives/Rectangle';
import { groupingPrimary } from '../utils/Constants';

const lineFn = line();

const VoronoiElement = ({ children, ...rest }) => (
  <g className="Voronoi" {...rest}>
    {children}
  </g>
);

export default function Voronoi() {
  const {
    stackData,
    primaryAxes,
    secondaryAxes,
    showVoronoi,
    width,
    height,
    gridWidth,
    gridHeight,
    onFocus,
    onClick,
    tooltip,
    primaryCursor,
    secondaryCursor,
    grouping,
  } = useChartContext();

  const [, setChartState] = useChartState(() => null);

  const handleFocus = React.useCallback(
    datum => {
      return setChartState(state => ({
        ...state,
        focused: datum,
      }));
    },
    [setChartState]
  );

  const needsVoronoi =
    onFocus || onClick || tooltip || primaryCursor || secondaryCursor;

  return React.useMemo(() => {
    // Don't render until we have all dependencies
    if (
      !stackData ||
      !primaryAxes.length ||
      !secondaryAxes.length ||
      !width ||
      !height ||
      !needsVoronoi
    ) {
      return null;
    }

    const extent = [
      [0, 0],
      [gridWidth, gridHeight],
    ];

    const props = {
      stackData,
      extent,
      handleFocus,
      showVoronoi,
      primaryAxes,
    };

    if (grouping === groupingPrimary) {
      return <PrimaryVoronoi {...props} />;
    }

    return <ClosestVoronoi {...props} />;
  }, [
    gridHeight,
    gridWidth,
    height,
    needsVoronoi,
    handleFocus,
    primaryAxes.length,
    secondaryAxes.length,
    showVoronoi,
    stackData,
    width,
  ]);
}

function PrimaryVoronoi({
  stackData,
  extent,
  handleFocus,
  showVoronoi,
  primaryAxes,
}) {
  const primaryAxis = primaryAxes[0];
  const isVertical = primaryAxis.vertical;

  const datumBoundaries: { start: number; end: number; datum: any }[] = [];

  stackData.forEach(series => {
    series.datums
      .filter(d => d.defined)
      .forEach(datum => {
        let start;
        let end;

        datum.boundingPoints.forEach(boundingPoint => {
          if (
            typeof datum.primaryCoord !== 'number' ||
            typeof datum.secondaryCoord !== 'number' ||
            Number.isNaN(datum.secondaryCoord) ||
            Number.isNaN(datum.primaryCoord)
          ) {
            return;
          }
          start = Math.min(start ?? datum.secondaryCoord, datum.secondaryCoord);
          end = Math.max(end ?? datum.secondaryCoord, datum.secondaryCoord);
        });

        datumBoundaries.push({
          start,
          end,
          datum,
        });
      });
  });

  const groupedBoundaries = new Map();

  datumBoundaries.forEach(datumBoundary => {
    if (!groupedBoundaries.has(datumBoundary.datum.primaryCoord)) {
      groupedBoundaries.set(datumBoundary.datum.primaryCoord, []);
    }

    const previous = groupedBoundaries.get(datumBoundary.datum.primaryCoord);

    groupedBoundaries.set(datumBoundary.datum.primaryCoord, [
      ...previous,
      datumBoundary,
    ]);
  });

  const sortedPrimaryKeys = Array.from(groupedBoundaries.keys()).sort(
    (a, b) => a - b
  );

  const columns = sortedPrimaryKeys.map((primaryKey, i) => {
    const prev = sortedPrimaryKeys[i - 1];
    const next = sortedPrimaryKeys[i + 1];

    let primaryStart = 0;
    let primaryEnd = extent[1][isVertical ? 1 : 0];

    if (prev) {
      primaryStart = primaryKey - (primaryKey - prev) / 2;
    }

    if (next) {
      primaryEnd = primaryKey + (next - primaryKey) / 2;
    }

    const datumBoundaries = groupedBoundaries.get(primaryKey);

    return {
      primaryStart,
      primaryEnd,
      primaryKey,
      datumBoundaries: datumBoundaries.map((datumBoundary, i) => {
        const datum = datumBoundary.datum;
        const prev = datumBoundaries[i - 1];
        const next = datumBoundaries[i + 1];

        let secondaryStart = 0;
        let secondaryEnd = extent[1][isVertical ? 0 : 1];

        if (prev) {
          secondaryStart =
            datumBoundary.start - (datumBoundary.start - prev.end) / 2;
        }

        if (next) {
          secondaryEnd =
            datumBoundary.end + (next.start - datumBoundary.end) / 2;
        }

        return {
          secondaryStart,
          secondaryEnd,
          datum,
        };
      }),
    };
  });

  return (
    <VoronoiElement>
      {columns.map(column => {
        return (
          <React.Fragment key={column.primaryKey}>
            {column.datumBoundaries.map(datumBoundary => {
              const x1 = !isVertical
                ? column.primaryStart
                : datumBoundary.secondaryStart;
              const x2 = !isVertical
                ? column.primaryEnd
                : datumBoundary.secondaryEnd;
              const y1 = !isVertical
                ? datumBoundary.secondaryStart
                : column.primaryStart;
              const y2 = !isVertical
                ? datumBoundary.secondaryEnd
                : column.primaryEnd;

              return (
                <Rectangle
                  {...{
                    key: `${column.primaryKey}_${datumBoundary.datum.seriesIndex}`,
                    x1,
                    x2,
                    y1,
                    y2,
                    className: 'action-voronoi',
                    onMouseEnter: e => handleFocus(datumBoundary.datum),
                    onMouseLeave: e => handleFocus(null),
                    style: {
                      fill: 'rgba(0,0,0,.2)',
                      stroke: 'rgba(255,255,255,.5)',
                      strokeWidth: 1,
                      opacity: showVoronoi ? 1 : 0,
                    },
                  }}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </VoronoiElement>
  );
}

function ClosestVoronoi({ stackData, extent, handleFocus, showVoronoi }) {
  let polygons = null;

  const voronoiData = [];
  stackData.forEach(series => {
    series.datums
      .filter(d => d.defined)
      .forEach(datum => {
        datum.boundingPoints.forEach(boundingPoint => {
          if (
            typeof datum.x !== 'number' ||
            typeof datum.y !== 'number' ||
            Number.isNaN(datum.y) ||
            Number.isNaN(datum.x)
          ) {
            return;
          }
          voronoiData.push({
            x: boundingPoint.x,
            y: boundingPoint.y,
            datum,
          });
        });
      });
  });

  const delaunay = Delaunay.from(
    voronoiData,
    d => Math.max(d.x, 0),
    d => Math.max(d.y, 0)
  );

  const flatExtent = extent.flat().map(d => Math.max(d, 0));

  const voronoi = delaunay.voronoi(flatExtent);

  polygons = voronoi.cellPolygons();

  polygons = Array.from(polygons);

  return (
    <VoronoiElement>
      {polygons.map((points, i) => {
        const index = points.index;
        const datum = voronoiData[index].datum;
        const path = lineFn(points);
        return (
          <Path
            key={i}
            d={path}
            className="action-voronoi"
            onMouseEnter={e => handleFocus(datum)}
            onMouseLeave={e => handleFocus(null)}
            style={{
              fill: 'rgba(0,0,0,.2)',
              stroke: 'rgba(255,255,255,.5)',
              opacity: showVoronoi ? 1 : 0,
            }}
          />
        );
      })}
    </VoronoiElement>
  );
}
