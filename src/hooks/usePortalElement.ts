import * as React from 'react'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export default function usePortalElement() {
  const [portalEl, setPortalEl] = React.useState<HTMLDivElement | null>()

  useIsomorphicLayoutEffect(() => {
    if (!portalEl) {
      let element = document.getElementById(
        'react-charts-portal'
      ) as HTMLDivElement

      if (!element) {
        element = document.createElement('div')

        element.setAttribute('id', 'react-charts-portal')

        document.body.append(element)
      }

      Object.assign(element.style, {
        pointerEvents: 'none',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        'z-index': 99999999999,
      })

      setPortalEl(element)
    }
  }, [])

  return portalEl
}
