import { ReactNode } from "react"


type Props = {
   colList: string[],
   children: ReactNode
}



function Table({colList, children}: Props) {

   const classes = {
      th: "bg-slate-800 text-[#fff] font-medium text-left px-[6px]",
   }
  return (
<table className="w-full">
   <thead>
      <tr>
         {colList.map((item, index) => <th key={index} className={classes.th}>{item}</th>)}
      </tr>
   </thead>

   <tbody>
         {children}      
   </tbody>
</table>
  )
}

export default Table