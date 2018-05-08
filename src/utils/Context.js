import makeContext from './makeContext'

const {
  Provider, Consumer, withProvider, withConsumer,
} = makeContext({
  displayName: 'ChartContext',
  initialState: {},
})

export { Provider, Consumer, withProvider, withConsumer }
