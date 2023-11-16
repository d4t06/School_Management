function subject() {
  const classes = {
    boxWrapper:
      "w-[20%]  text-[#fff] px-[8px] transition-transform   hover:translate-y-[-5px]",
    boxPD: "pt-[100%] rounded-[8px] relative w-full bg-slate-800",
    boxContent: "absolute inset-0 flex flex-col items-center justify-center",
    largeText: "text-[20px] font-bold",
  };
  return (
    <div className="">
      <div className="flex flex-wrap -mx-[8px] gap-y-[20px]">
        <div className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Toán</h1>
            </div>
          </div>
        </div>

        <div className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Ngữ Văn</h1>
            </div>
          </div>
        </div>

        <div className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Ngữ Văn</h1>
            </div>
          </div>
        </div>

        <div className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Ngữ Văn</h1>
            </div>
          </div>
        </div>

        <div className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Ngữ Văn</h1>
            </div>
          </div>
        </div>

        <div className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Ngữ Văn</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default subject;
