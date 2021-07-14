---
id: getting-started
title: Getting Started
---

Out of the box, React Charts is very forgiving and requires very little to use. Let's get started by going over the bare minimum configuration required to render a chart!

- An array of `Series` objects (more on this in a bit), each with a `data` property that is an array of `Datums` (be patient, we'll explain soon!)

```ts
type DailyStars = {
  date: Date,
  stars: number,
}

type Series = {
  label: string,
  data: DailyStars[]
}

const data: Series[] = [
  {
    label: 'React Charts",
    data: [
      {
        date: new Date(),
        stars: 202123,
      }
      // ...
    ]
  },
  {
    label: 'React Query",
    data: [
      {
        date: new Date(),
        stars: 10234230,
      }
      // ...
    ]
  }
]
```

- `primaryAxis: AxisOptions<TDatum>`
  - `isPrimary: true`
  - Scale Type
  - Position
  - Primary Value Accessor
- `secondaryAxes: AxisOptions<TDatum>[]`
  - `isPrimary: boolean`
  - Scale Type
  - Position
  - Primary Value Accessor

```tsx
function App() {
  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyStars> => ({
      isPrimary: true,
      scaleType: 'time',
      position: 'bottom',
      getValue: datum => datum.date,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DailyStars>[] => [
      {
        scaleType: 'linear',
        position: 'left',
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

Now that you know how to build a simple chart, let's dive deeper!
