export function noData (...args) {
  console.warn(
    'No data was passed to chart! If this was intentional, disregard this warning.',
    ...args
  )
}
