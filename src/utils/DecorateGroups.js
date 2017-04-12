import { normalizePathGetter, groupBy, orderBy } from './Utils'

export default function DecorateGroups (children, config) {
  const _groupBy = normalizePathGetter(config[0].groupBy || ((d, i) => i))
  const _orderBy = normalizePathGetter(config[0].orderBy || (d => d.groupKey))
  const orderByDir = config[0].orderByDir
  const decorate = normalizePathGetter(config[0].decorate)

  const nextConfigs = config.slice(1)

  let groups

  groups = groupBy(children, (d, i) => _groupBy(d.row, i))
  groups = Object.keys(groups).map(groupKey => ({
    groupKey,
    children: groups[groupKey]
  }))

  groups = orderBy(groups, _orderBy, orderByDir)

  if (decorate) {
    groups = groups.map((sGroup, i) => {
      // Send the sample, index, and entire group to the decorate
      const meta = decorate(sGroup.children[0], i, sGroup)
      return {
        meta,
        children: sGroup.children.map(children => {
          return {
            ...children,
            meta: {
              ...children.meta,
              ...meta
            }
          }
        })
      }
    })
  }
  if (nextConfigs.length) {
    children = groups.reduce((prev, current) => prev.concat(DecorateGroups(current.children, nextConfigs)), [])
  } else {
    children = groups.reduce((prev, current) => prev.concat(current.children), [])
  }

  return children
}
