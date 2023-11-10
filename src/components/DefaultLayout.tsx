import {ReactNode} from 'react'
import { Header, Sidebar } from '.'

function DefaultLayout({children}: {children: ReactNode}) {
  return (
    <div className="overflow-hidden">
      <Header/>
      <Sidebar />
      <div className='ml-[150px] pt-[30px] px-[30px] max-h-[calc(100vh-50px)] min-h-[calc(100vh-50px)] overflow-auto pb-[30px] bg-[#f1f1f1]'>{children}</div>
    </div>
  )
}

export default DefaultLayout