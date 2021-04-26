import React from 'react';
import { functionalUpdate } from '../utils/Utils';
import useGetLatest from './useGetLatest';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const chartContext = React.createContext();

export function createChartState(initialState) {
  let listeners = [];
  const api = {};

  api.setState = (updater) => {
    const newState = functionalUpdate(updater, api.state);
    if (api.state === newState) {
      return;
    }

    api.state = newState;
    listeners.forEach((d) => d());
  };

  api.state = functionalUpdate(initialState, api.setState);

  api.subscribe = (cb) => {
    listeners.push(cb);
    return () => (listeners = listeners.filter((d) => d !== cb));
  };

  api.Provider = ({ children, state }) => {
    return <chartContext.Provider value={api} children={children} />;
  };

  return api;
}

export default function useChartState(selector, eqType = undefined) {
  const apiInstance = React.useContext(chartContext);
  const [, rerender] = React.useReducer((d) => d + 1, 0);
  const slice = selector ? selector(apiInstance.state) : apiInstance.state;
  const valueRef = React.useRef(slice);
  const getSelector = useGetLatest(selector);
  const getEqType = useGetLatest(eqType);

  useIsomorphicLayoutEffect(
    () =>
      apiInstance.subscribe(() => {
        const selector = getSelector();
        const eqType = getEqType();

        const slice = selector
          ? selector(apiInstance.state)
          : apiInstance.state;

        const eqFn = eqType === 'shallow' ? shallowEq : Object.is;

        if (!eqFn(valueRef.current, slice)) {
          valueRef.current = slice;
          rerender();
        }
      }),
    [getSelector, getEqType]
  );

  return [valueRef.current, apiInstance.setState];
}

export function useChartStateRef(selector) {
  const apiInstance = React.useContext(chartContext);
  const slice = selector ? selector(apiInstance.state) : apiInstance.state;
  const valueRef = React.useRef(slice);
  const getSelector = useGetLatest(selector);

  useIsomorphicLayoutEffect(
    () =>
      apiInstance.subscribe(() => {
        const selector = getSelector();
        valueRef.current = selector
          ? selector(apiInstance.state)
          : apiInstance.state;
      }),
    [getSelector]
  );

  return [valueRef, apiInstance.setState];
}

function shallowEq(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  if (Object.keys(aKeys).some((key) => a[key] !== b[key])) {
    return false;
  }
}
