// import buildAxisPie from './buildAxis.pie'
import buildAxisLinear from './buildAxis.linear'

export default function(config) {
  // if (config.type === 'pie') {
  // return buildAxisPie(config)
  // }
  return buildAxisLinear(config)
}
