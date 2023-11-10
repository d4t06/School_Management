import { Link } from "react-router-dom";
import { Navigation } from "../components";

function GradeDetail() {
   const classes = {
      boxWrapper:
         "w-[20%]  text-[#fff] px-[8px] transition-transform   hover:translate-y-[-5px]",
      boxPD: "pt-[100%] rounded-[8px] relative w-full bg-[#cd1818]",
      boxContent: "absolute inset-0 flex flex-col items-center justify-center",
      largeText: "text-[20px] font-bold",
   };

   return (
      <div className="">
         <Navigation />
         <div className="flex flex-wrap -mx-[8px] gap-y-[16px]">
            {[...Array(20).keys()].map((index) => (
               <Link key={index} to={"/classroom/1A"} className={classes.boxWrapper}>
                  <div className={classes.boxPD}>
                     <div className={classes.boxContent}>
                        <h1 className={classes.largeText}>Lớp 1-A{index + 1}</h1>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
}

export default GradeDetail;
