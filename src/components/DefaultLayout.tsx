import {ReactNode} from 'react'
import { Header, Sidebar } from '.'

function DefaultLayout({children}: {children: ReactNode}) {
  return (
    <div className="overflow-hidden">
      <Header/>
      <Sidebar />
      <div className='ml-[150px] pt-[30px] pl-[30px] max-h-[calc(100vh-50px)] overflow-auto'>{children}</div>
    </div>
  )
}

export default DefaultLayout