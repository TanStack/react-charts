import React from 'react'

//

export default function ({
  children,
}: {
  children: React.SVGProps<SVGDefsElement>['children']
}) {
  return <defs>{children}</defs>
}
