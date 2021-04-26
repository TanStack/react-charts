import React from 'react';
import { Delaunay, line } from '../../d3';
import useChartContext from '../hooks/useChartContext';
import useChartState from '../hooks/useChartState';
//
import Path from '../primitives/Path';

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
  } = useChartContext();

  const [, setChartState] = useChartState(() => null);

  const onHover = React.useCallback(
    (datum) => {
      return setChartState((state) => ({
        ...state,
        hovered: datum,
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

    // if (type === 'pie') {
    //   const primaryAxis = primaryAxes[0]

    //   return (
    //     <VoronoiElement
    //       style={{
    //         transform: translate(primaryAxis.width /
    //           2, primaryAxis.height / 2)
    //       }}
    //     >
    //       {stackData.map(series => (
    //         <React.Fragment key={series.index}>
    //           {series.datums.map((datum, i) => {
    //             const arc = makeArc()
    //               .startAngle(datum.arcData.startAngle)
    //               .endAngle(datum.arcData.endAngle)
    //               .padAngle(0)
    //               .padRadius(0)
    //               .innerRadius(
    //                 !series.index
    //                   ? 0
    //                   : datum.arcData.innerRadius -
    //                       datum.arcData.seriesPaddingRadius / 2
    //               )
    //               .outerRadius(
    //                 series.index === stackData.length - 1
    //                   ? Math.max(primaryAxis.width, primaryAxis.height)
    //                   : datum.arcData.outerRadius +
    //                       datum.arcData.seriesPaddingRadius / 2
    //               )
    //               .cornerRadius(0)

    //             return (
    //               <Path
    //                 key={i}
    //                 d={arc()}
    //                 className='action-voronoi'
    //                 onMouseEnter={() => onHover([datum])}
    //                 style={{
    //                   fill: 'rgba(0,0,0,.2)',
    //                   stroke: 'rgba(255,255,255,.5)',
    //                   opacity: showVoronoi ? 1 : 0
    //                 }}
    //               />
    //             )
    //           })}
    //         </React.Fragment>
    //       ))}
    //     </VoronoiElement>
    //   )
    // }

    let polygons = null;

    const voronoiData = [];
    stackData.forEach((series) => {
      series.datums
        .filter((d) => d.defined)
        .forEach((datum) => {
          datum.boundingPoints.forEach((boundingPoint) => {
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
      (d) => Math.max(d.x, 0),
      (d) => Math.max(d.y, 0)
    );

    const flatExtent = extent.flat().map((d) => Math.max(d, 0));

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
              onMouseEnter={(e) => onHover(datum)}
              onMouseLeave={(e) => onHover(null)}
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
  }, [
    gridHeight,
    gridWidth,
    height,
    needsVoronoi,
    onHover,
    primaryAxes.length,
    secondaryAxes.length,
    showVoronoi,
    stackData,
    width,
  ]);
}
