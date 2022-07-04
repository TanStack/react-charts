---
id: api
title: API
---

> 🚨 This documentation is for **Version 3.0.0, which is currently in beta and is a work-in-progress**. For now, please refer to the examples for any missing documentation.

## Memoize your Props!

The React Charts `<Chart>` component has a few options that need to be **stable** or **memoized using either `React.useMemo` or `React.useCallback`**. Using an unstable option incorrectly shouldn't severly break any basic functionality, but could results in infinite change-detection loops in your app or at the very least, your charts will be severly non-performant. If an option says it needs to be stable, it's not kidding around!

## Data Model

React Charts uses a data shape based on **arrays of series and nested arrays of datums in those series**.

```js
const data = [
  {
    label: 'Purchases',
    data: [
      {
        date: new Date(),
        stars: 299320,
      },
      // ...etc
    ],
  },
]
```

Visualization data can come in practically any shape and size, so **memoization of data into this shape is almost always necessary**.

```tsx
const data = React.useMemo(
  () => [
    {
      label: 'Series 1',
      data: [
        // ...
      ],
    },
    {
      label: 'Series 2',
      data: [
        // ...
      ],
    },
    {
      label: 'Series 3',
      data: [
        // ...
      ],
    },
  ],
  []
)
```

The individual datums in a series' `data` array can be anything you want! Just remember that most of the types for React Charts will require you to pass the type of your `Datum`s as the first generic type to work correctly.

## Chart Component Props

The Chart component props can be passed in its `options` property object:

```javascript
<Chart
  options={{
    data,
    primaryAxis,
    secondaryAxes,
  }}
/>
```

The data property should be an array of series, each series should be an array of objects.
Each object should have two properties, by convention called primary and secondary, but it can be named as you want. One of these properties will be used as the primary axis and the other as the secondary axes.

```javascript
const data = [
  {
    label: 'Series 1',
    data: [
      {
        primary: '2022-02-03T00:00:00.000Z',
        likes: 130,
      },
      {
        primary: '2022-03-03T00:00:00.000Z',
        likes: 150,
      },
    ],
  },
  {
    label: 'Series 2',
    data: [
      {
        primary: '2022-04-03T00:00:00.000Z',
        likes: 200,
      },
      {
        primary: '2022-05-03T00:00:00.000Z',
        likes: 250,
      },
    ],
  },
]
```

The `primaryAxis` and `secondaryAxes` options, should have a prop called getValue, which is a getter function that returns the axis value for the datum. Example:

```javascript
const primaryAxis = React.useMemo(
  () => ({
    getValue: (datum: { primary: string }) => datum.primary,
  }),
  []
)
const secondaryAxes = React.useMemo(
  () => [
    {
      getValue: (datum: { likes: number }) => datum.likes,
      elementType: 'area',
    },
  ],
  []
)
```

The `initialHeight` and `initialWidth` expect a number, a default value is applied for each of those, 300 and 200 respectively. It's important to mention that these options are available SSR only.
If you'd like to have a custom height and width in the client side you may have a wrapper div that sets the width and height CSS attributes

`interactionMode` expect an string wich can be "primary" or "closest". It's been using for the tooltip position. By default, primary is being set.

`showVoronoi` expect a boolean, it's a debug option to visualize the interaction click-map that sits on top of the chart.

`getSeriesOrder` expect a function, this option will allows you to reorder the series if you want.

`primaryCursor` and `secondaryCursor` take the options that configure the line/rectangle that is drawn underneath your cursor when you hover over the chart. When both are used, it produces a kind of cross-hair. Both are set to true by default.

## Axes

React Charts use axes to configure a fair amount of the charts. Axes handle many things like:

- Accessing chart values from your series' `Datum`s
- Optionally positioning your axis on the grid
- Optionally configuring the scale type for your axis
- Optionally configuring the element type for series that are tied to your axis

To date, we have the following scale types available:

- `linear` - A continuous axis used for plotting numerical data on an evenly distributed scale. Works well both as a **primary and secondary** axis.
- `band` - A banded axis commonly used to plot categories or ordinal information. Works well as the **primary** axis for bar charts with ordinal domains.
- `time` - A continuous axis used for plotting UTC `Date`s on an evenly distributed scale. Works well as a **primary** axis.
- `timeLocal` - Similar to the `time` scale, but uses localized `Date` objects instead of UTC. Works well as a **primary** axis.
- `log` - A continuous axis used for plotting numerical data on a logarithmically distributed scale. Works well as a **secondary** axis

Axes are a required component of a React Chart. Both a `primaryAxis` and at least one axis vis `secondaryAxes` must be configured.

```javascript
import { Chart } from 'react-charts'

type MyDatum = { date: Date, stars: number }

function MyChart() {
  const data = [
    {
      label: 'React Charts',
      data: [
        {
          date: new Date(),
          stars: 23467238,
        },
      ],
    },
  ]

  const primaryAxis = React.useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: datum => datum.date,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: datum => datum.stars,
      },
    ],
    []
  )

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  )
}
```

## Secondary Axis Element Types

Secondary axes for the most part are automatic, but can be optionally configured to render their respective series using 3 different element types using the `AxisOptions<TDatum>['scaleType']` property:

- `line`
  - 1 Line per series (optional, eg. for Bubble/Scatter charts)
  - 1 Circle per datum (optional)
- `area`
  - 1 Enclosed area per series
  - 1 Line per series (optional)
  - 1 Circle per datum (optional)
- `bar`
  - 1 Rectangle per datum

Example

```javascript
const secondaryAxes = React.useMemo(
  (): AxisOptions<MyDatum>[] => [
    {
      getValue: datum => datum.stars,
      elementType: 'bar',
    },
  ],
  []
)
```

### Chart Component Props

The Chart component props can be passed in its **options** property object:

```javascript
<Chart
  options={{
    data,
    primaryAxis,
    secondaryAxes,
  }}
/>
```

The data property should be an array of series, each series should be an array of objects.
Each object should have two properties, by convention called primary and secondary, but it can be named as you want. One of these properties will be used as the primary axis and the other as the secondary axes.

```javascript
const data = [
  {
    label: 'Series 1',
    data: [
      {
        primary: '2022-02-03T00:00:00.000Z',
        likes: 130,
      },
      {
        primary: '2022-03-03T00:00:00.000Z',
        likes: 150,
      },
    ],
  },
  {
    label: 'Series 2',
    data: [
      {
        primary: '2022-04-03T00:00:00.000Z',
        likes: 200,
      },
      {
        primary: '2022-05-03T00:00:00.000Z',
        likes: 250,
      },
    ],
  },
]
```

The **primaryAxis** and **secondaryAxes** options, should have a prop called getValue, which is a getter function that returns the axis value for the datum. Example:

```javascript
const primaryAxis = React.useMemo(
  () => ({
    getValue: (datum: { primary: string }) => datum.primary,
  }),
  []
)
const secondaryAxes = React.useMemo(
  () => [
    {
      getValue: (datum: { likes: number }) => datum.likes,
      elementType: 'area',
    },
  ],
  []
)
```

**initialHeight** and **initialWidth** expect a number, a default value is applied for each of those, 300 and 200 respectively. It's important to mention that these options are available SSR onoly. If you'd like to have a custom height and width in the client side you may have a wrapper div that sets the width and height CSS attributes

**interactionMode** expect an string wich can be "primary" or "closest". It's been using for the tooltip position. By default, primary is being set.

**showVoronoi** expect a boolean, it's a debug option to visualize the interaction click-map that sits on top of the chart.

**getSeriesOrder** expect a function, this option will allows you to reorder the series if you want.

**primaryCursor** and **secondaryCursor** take the options that configure the line/rectangle that is drawn underneath your cursor when you hover over the chart. When both are used, it produces a kind of cross-hair. Both are set to true by default.

### Curve Types

All element types that support lines or curves can be configured by passing any `curve` generator function as the `AxisOptions<TDatum>['curve']` option. By default, horizontal and vertical series default to using `monotoneX` and `monotoneY` curves, respectively. More information can be found at [`d3-shape curves`](https://github.com/d3/d3-shape#curves)

# API

> Coming Soon! Feel free to consult the **[examples](/examples/simple)** or refer to the exported types in your favorite IDE for now.
