import React from "react";
import { voronoi } from "d3-voronoi";
import { line, arc as makeArc } from "d3-shape";
//
import ChartContext from "../utils/ChartContext";
import Path from "../primitives/Path";
// import Utils from '../utils/Utils'

const lineFn = line();

const VoronoiElement = ({ children, ...rest }) => (
  <g className="Voronoi" {...rest}>
    {children}
  </g>
);

export default function Voronoi() {
  const [
    {
      // type,
      stackData,
      primaryAxes,
      secondaryAxes,
      showVoronoi,
      width,
      height,
      gridWidth,
      gridHeight
    },
    setChartState
  ] = React.useContext(ChartContext);

  const onHover = React.useCallback(
    datum => {
      return setChartState(state => ({
        ...state,
        focused: datum
      }));
    },
    [setChartState]
  );

  return React.useMemo(
    () => {
      // Don't render until we have all dependencies
      if (
        !stackData ||
        !primaryAxes.length ||
        !secondaryAxes.length ||
        !width ||
        !height
      ) {
        return null;
      }

      const extent = [[0, 0], [gridWidth, gridHeight]];

      // if (type === 'pie') {
      //   const primaryAxis = primaryAxes[0]

      //   return (
      //     <VoronoiElement
      //       style={{
      //         transform: Utils.translate(primaryAxis.width /
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

      let vor;
      let polygons = null;

      const voronoiData = [];
      stackData.forEach(series => {
        series.datums
          .filter(d => d.defined)
          .forEach(datum => {
            datum.boundingPoints.forEach(boundingPoint => {
              if (
                typeof datum.x !== "number" ||
                typeof datum.y !== "number" ||
                Number.isNaN(datum.y) ||
                Number.isNaN(datum.x)
              ) {
                return;
              }
              voronoiData.push({
                x: boundingPoint.x,
                y: boundingPoint.y,
                datum
              });
            });
          });
      });

      vor = voronoi()
        .x(d => d.x)
        .y(d => d.y)
        .extent(extent)(voronoiData);

      polygons = vor.polygons();

      return (
        <VoronoiElement>
          {polygons.map((points, i) => {
            const path = lineFn(points);
            return (
              <Path
                key={i}
                d={path}
                className="action-voronoi"
                onMouseEnter={e => onHover(points.data.datum)}
                onMouseLeave={e => onHover(null)}
                style={{
                  fill: "rgba(0,0,0,.2)",
                  stroke: "rgba(255,255,255,.5)",
                  opacity: showVoronoi ? 1 : 0
                }}
              />
            );
          })}
        </VoronoiElement>
      );
    },
    [
      gridHeight,
      gridWidth,
      height,
      onHover,
      primaryAxes.length,
      secondaryAxes.length,
      showVoronoi,
      stackData,
      width
    ]
  );
}
