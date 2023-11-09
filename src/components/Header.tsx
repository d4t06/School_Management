import { Link } from "react-router-dom"

function Header() {
  return (
    <div className='h-[50px] border-b border-[#000.1] px-[10px] flex justify-between items-center'>
        <Link to={'/'}>
          <h1 className="text-20px font-semibold">Hệ thống quản lý trường tiểu học</h1>
        </Link>

        <div className="flex items-center">
          <h2>Nguyễn Văn A</h2>
          <div className="ml-[8px] w-[34px] h-[34px] bg-[#ccc] rounded-full"></div>
        </div>
    </div>
  )
}

export default Header