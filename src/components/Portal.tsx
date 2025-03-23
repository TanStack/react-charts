import React from 'react'
import ReactDOM from 'react-dom'
import usePortalElement from '../hooks/usePortalElement'

interface PortalProps {
  children?: React.ReactNode | React.ReactNode[]
}

function Portal({ children }: PortalProps): React.ReactPortal {
  const portal = usePortalElement()
  const modal = document.createElement('div')

  React.useLayoutEffect(() => {
    if (!portal) return
    portal.appendChild(modal)

    return () => portal.removeChild(modal) as unknown as void
  }, [modal, portal])

  return ReactDOM.createPortal(children, modal)
}

export default Portal
