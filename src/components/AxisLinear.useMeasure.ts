import React from 'react';
import useChartState from '../hooks/useChartState';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

const getElBox = el => {
  var rect = el.getBoundingClientRect();
  return {
    top: Math.round(rect.top),
    right: Math.round(rect.right),
    bottom: Math.round(rect.bottom),
    left: Math.round(rect.left),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    x: Math.round(rect.x),
    y: Math.round(rect.y),
  };
};

function useIsLooping() {
  const callThreshold = 30;
  const timeLimit = 500;
  const now = Date.now();

  const ref = React.useRef([now]);

  ref.current.push(now);

  ref.current = ref.current.filter(d => d > now - timeLimit);

  while (ref.current.length > callThreshold) {
    ref.current.shift();
  }

  const isLooping =
    ref.current.length === callThreshold && now - ref.current[0] < timeLimit;

  return isLooping;
}

export default function useMeasure({
  elRef,
  rotation,
  showRotated,
  setShowRotated,
  id,
  position,
  tickSizeInner,
  tickSizeOuter,
  labelRotation,
  tickPadding,
  vertical,
  gridWidth,
  gridHeight,
  show,
}) {
  const [axisDimension, setChartState] = useChartState(
    state => state.axisDimensions?.[position]?.[id]
  );

  const isLooping = useIsLooping();

  const measureDimensions = React.useCallback(() => {
    if (!elRef.current) {
      return;
    }

    // if (show) {
    //   // Remeasure when show changes
    // }

    let gridSize = !vertical ? gridWidth : gridHeight;

    const unrotatedLabelDims = Array(
      ...elRef.current.querySelectorAll('.Axis.unrotated .tickLabel')
    ).map(el => getElBox(el));

    // Determine the largest labels on the axis
    const widestLabel = unrotatedLabelDims.reduce((label, d) => {
      label = label || d;
      if (d.width > 0 && d.width > label.width) {
        label = d;
      }
      return label;
    }, null);

    let smallestTickGap = gridSize;

    if (unrotatedLabelDims.length > 1) {
      unrotatedLabelDims.reduce((prev, current) => {
        if (prev) {
          smallestTickGap = Math.min(
            smallestTickGap,
            vertical ? current.top - prev.top : current.left - prev.left
          );
        }

        return current;
      }, false);
    }

    const shouldRotate =
      (widestLabel?.width || 0) + tickPadding > smallestTickGap;

    if (!isLooping) {
      // Rotate ticks for non-time horizontal axes
      if (!vertical) {
        setShowRotated(shouldRotate);
      }
    }
  }, [
    axisDimension,
    elRef,
    gridHeight,
    gridWidth,
    id,
    labelRotation,
    position,
    rotation,
    setChartState,
    show,
    tickPadding,
    tickSizeInner,
    tickSizeOuter,
    vertical,
  ]);

  // Measure after if needed
  useIsomorphicLayoutEffect(() => {
    measureDimensions();
  });

  useIsomorphicLayoutEffect(() => {
    if (!elRef.current) {
      if (axisDimension) {
        // If the entire axis is hidden, then we need to remove the axis dimensions
        setChartState(state => {
          const newAxes = state.axisDimensions[position] || {};
          delete newAxes[id];
          return {
            ...state,
            axisDimensions: {
              ...state.axisDimensions,
              [position]: newAxes,
            },
          };
        });
      }
      return;
    }

    const newDimensions = {
      width: 0,
      height: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };

    const domainDims = getElBox(
      elRef.current.querySelector(
        `.Axis.${showRotated ? 'rotated' : 'unrotated'} .domain`
      )
    );

    const measureDims = showRotated
      ? Array(
          ...elRef.current.querySelectorAll('.Axis.rotated .tickLabel')
        ).map(el => getElBox(el))
      : Array(
          ...elRef.current.querySelectorAll('.Axis.unrotated .tickLabel')
        ).map(el => getElBox(el));

    // Determine the largest labels on the axis
    const [widestRealLabel, tallestRealLabel] = measureDims.reduce(
      (labels, d) => {
        let [largestW = d, largestH = d] = labels;
        if (d.width > 0 && d.width > largestW.width) {
          largestW = d;
        }
        if (d.height > 0 && d.height > largestH.height) {
          largestH = d;
        }
        return [largestW, largestH];
      },
      []
    );

    // Axis overflow measurements
    if (!vertical) {
      if (measureDims.length) {
        const leftMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.left < d.left ? labelDim : d
        );
        const rightMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.right > d.right ? labelDim : d
        );

        newDimensions.left = Math.round(
          Math.max(0, domainDims.left - leftMostLabelDim?.left)
        );

        newDimensions.right = Math.round(
          Math.max(0, rightMostLabelDim?.right - domainDims.right)
        );
      }

      newDimensions.height = Math.round(
        Math.max(tickSizeInner, tickSizeOuter) +
          tickPadding +
          (tallestRealLabel?.height ?? 0)
      );
    } else {
      if (measureDims.length) {
        const topMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.top < d.top ? labelDim : d
        );

        const bottomMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.bottom > d.bottom ? labelDim : d
        );

        newDimensions.top = Math.round(
          Math.max(0, domainDims.top - topMostLabelDim?.top)
        );

        newDimensions.bottom = Math.round(
          Math.max(0, bottomMostLabelDim?.bottom - domainDims.bottom)
        );
      }

      newDimensions.width = Math.round(
        Math.max(tickSizeInner, tickSizeOuter) +
          tickPadding +
          (widestRealLabel?.width ?? 0)
      );
    }

    // Only update the axisDimensions if something has changed
    if (
      !axisDimension ||
      Object.keys(newDimensions).some(key => {
        return newDimensions[key] !== axisDimension[key];
      })
    ) {
      setChartState(state => ({
        ...state,
        axisDimensions: {
          ...state.axisDimensions,
          [position]: {
            ...(state.axisDimensions[position] || {}),
            [id]: newDimensions,
          },
        },
      }));
    }
  });
}
