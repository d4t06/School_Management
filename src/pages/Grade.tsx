import { Link } from "react-router-dom";

function Grade() {
   const classes = {
      boxWrapper:
         "w-[20%]  text-[#fff] px-[8px] transition-transform   hover:translate-y-[-5px]",
      boxPD: "pt-[100%] rounded-[8px] relative w-full bg-slate-800",
      boxContent: "absolute inset-0 flex flex-col items-center justify-center",
      largeText: "text-[30px] font-bold",
   };

   return (
      <div className="mt-[50px]">
         <div className="flex -mx-[8px]">
            <Link to={"/grade/1"} className={classes.boxWrapper}>
               <div className={classes.boxPD}>
                  <div className={classes.boxContent}>
                     <h1 className={classes.largeText}>Khối 1</h1>
                     <h5>2 Lớp</h5>
                  </div>
               </div>
            </Link>

            <Link to={"/grade/2"} className={classes.boxWrapper}>
               <div className={classes.boxPD}>
                  <div className={classes.boxContent}>
                     <h1 className={classes.largeText}>Khối 2</h1>
                     <h5>2 Lớp</h5>
                  </div>
               </div>
            </Link>

            <Link to={"/grade/3"} className={classes.boxWrapper}>
               <div className={classes.boxPD}>
                  <div className={classes.boxContent}>
                     <h1 className={classes.largeText}>Khối 3</h1>
                     <h5>2 Lớp</h5>
                  </div>
               </div>
            </Link>

            <Link to={"/grade/4"} className={classes.boxWrapper}>
               <div className={classes.boxPD}>
                  <div className={classes.boxContent}>
                     <h1 className={classes.largeText}>Khối 4</h1>
                     <h5>2 Lớp</h5>
                  </div>
               </div>
            </Link>

            <Link to={"/grade/6"} className={classes.boxWrapper}>
               <div className={classes.boxPD}>
                  <div className={classes.boxContent}>
                     <h1 className={classes.largeText}>Khối 5</h1>
                     <h5>2 Lớp</h5>
                  </div>
               </div>
            </Link>
         </div>
      </div>
   );
}

export default Grade;
