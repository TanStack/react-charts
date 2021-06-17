import React from 'react';
//
import Raf from '../utils/Raf';
import { translate } from '../utils/Utils';

import useChartContext from '../hooks/useChartContext';
import useChartState from '../hooks/useChartState';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

import Rectangle from '../primitives/Rectangle';

import Voronoi from './Voronoi';
import Axis from './Axis';
import Tooltip from './Tooltip';
import Cursor from './Cursor';
import Brush from './Brush';

export default React.forwardRef(function ChartInner(
  { className, style = {}, ...rest },
  ref
) {
  const svgRef = React.useRef();

  const {
    width,
    height,
    gridX,
    gridY,
    stackData,
    primaryAxes,
    secondaryAxes,
    renderSVG,
    seriesOptions,
    getSeriesOrder,
    focused,
    focused,
    getOnClick,
  } = useChartContext();

  const [offset] = useChartState(d => d.offset);
  const [setOffset, setChartState] = useChartState(d => d.setOffset);

  useIsomorphicLayoutEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const current = svgRef.current.getBoundingClientRect();

    if (current.left !== offset.left || current.top !== offset.top) {
      setOffset({
        left: current.left,
        top: current.top,
      });
    }
  });

  const onMouseLeave = e => {
    setChartState(old => ({ ...old, focused: null }));
    setChartState(old => ({
      ...old,
      pointer: {
        ...old.pointer,
        active: false,
      },
    }));
  };

  const rafRef = React.useRef();

  const onMouseMove = e => {
    if (rafRef.current) {
      Raf.cancel(rafRef.current);
    }
    rafRef.current = Raf(() => {
      rafRef.current = null;
      const { clientX, clientY } = e;

      setChartState(old => {
        const x = clientX - offset.left - gridX;
        const y = clientY - offset.top - gridY;

        const pointer = {
          ...old.pointer,
          active: true,
          x,
          y,
          dragging: old.pointer?.down,
        };

        return {
          ...old,
          pointer,
        };
      });
    });
  };

  const onMouseUp = () => {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);

    setChartState(old => {
      return {
        ...old,
        pointer: {
          ...old.pointer,
          down: false,
          dragging: false,
          released: {
            x: old.pointer.x,
            y: old.pointer.y,
          },
        },
      };
    });
  };

  const onMouseDown = () => {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    setChartState(old => ({
      ...old,
      pointer: {
        ...old.pointer,
        sourceX: old.pointer.x,
        sourceY: old.pointer.y,
        down: true,
      },
    }));
  };

  // Reverse the stack order for proper z-indexing
  const reversedStackData = [...stackData].reverse();
  const orderedStackData = getSeriesOrder(reversedStackData);

  const focusedSeriesIndex = focused
    ? orderedStackData.findIndex(series => series.id === focused.series.id)
    : -1;

  // Bring focused series to the front
  const focusOrderedStackData = focused
    ? [
        ...orderedStackData.slice(0, focusedSeriesIndex),
        ...orderedStackData.slice(focusedSeriesIndex + 1),
        orderedStackData[focusedSeriesIndex],
      ]
    : orderedStackData;

  const stacks = focusOrderedStackData.map(stack => {
    return (
      <stack.Component
        key={stack.id}
        {...seriesOptions[stack.index]}
        series={stack}
        stackData={stackData}
      />
    );
  });

  useIsomorphicLayoutEffect(() => {
    if (
      ref.current &&
      ref.current.parentElement &&
      !ref.current.parentElement.style.position
    ) {
      ref.current.parentElement.style.position = 'relative';
    }
  });

  return (
    <div
      ref={ref}
      {...rest}
      className={`ReactChart ${className || ''}`}
      style={{
        width,
        height,
        position: 'absolute',
        ...style,
      }}
      onClick={getOnClick() ? e => getOnClick()(focused, e) : undefined}
    >
      <svg
        ref={svgRef}
        style={{
          width,
          height,
          overflow: 'hidden',
        }}
        onMouseEnter={e => e.persist() || onMouseMove(e)}
        onMouseMove={e => e.persist() || onMouseMove(e)}
        onMouseLeave={e => e.persist() || onMouseLeave(e)}
        onMouseDown={e => e.persist() || onMouseDown(e)}
      >
        {width && height ? (
          <>
            <g
              style={{
                transform: translate(gridX, gridY),
              }}
            >
              <Rectangle
                // To ensure the pointer always has something to hit
                x1={-gridX}
                x2={width - gridX}
                y1={-gridY}
                y2={height - gridY}
                style={{
                  opacity: 0,
                }}
              />
              <Voronoi />
              <g className="axes">
                {[...primaryAxes, ...secondaryAxes].map(axis => (
                  <Axis key={axis.id} {...axis} />
                ))}
              </g>
              <g
                className="Series"
                style={{
                  pointerEvents: 'none',
                }}
              >
                {stacks}
              </g>
            </g>
            {renderSVG ? renderSVG() : null}
          </>
        ) : null}
      </svg>
      <Cursor primary />
      <Cursor />
      <Brush />
      <Tooltip />
    </div>
  );
});
