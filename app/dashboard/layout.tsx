import React, { ReactNode } from 'react'
import Navlink from './components/navlink'

export default function Layout({children}:{children:ReactNode}) {
  return (
    <div>
        <Navlink/>
        {children}
    </div>
  )
}
