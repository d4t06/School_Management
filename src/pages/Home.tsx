function Home() {
   const classes = {
      boxWrapper:
         "w-[20%]  text-[#fff] px-[8px] transition-transform   hover:translate-y-[-5px]",
      boxPD: "pt-[100%] rounded-[8px] relative w-full bg-slate-800",
      boxContent: "absolute inset-0 flex flex-col items-center justify-center",
      largeText: "text-[30px] font-bold",
   };
   return (
      <div className="">
         <div className="flex -mx-[8px]">
            <div className={classes.boxWrapper}>
               <div className={classes.boxPD}>
                  <div className={classes.boxContent}>
                     <h1 className={classes.largeText}>200</h1>
                     <h5>Học sinh</h5>
                  </div>
               </div>
            </div>

            <div className={classes.boxWrapper}>
               <div className={classes.boxPD}>
                  <div className={classes.boxContent}>
                     <h1 className={classes.largeText}>30</h1>
                     <h5>Giáo viên</h5>
                  </div>
               </div>
            </div>

            <div className={classes.boxWrapper}>
               <div className={classes.boxPD}>
                  <div className={classes.boxContent}>
                     <h1 className={classes.largeText}>20</h1>
                     <h5>Lớp học</h5>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;
