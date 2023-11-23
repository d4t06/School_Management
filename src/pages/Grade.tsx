import { Navigation } from "@/components";
import { Link, useParams } from "react-router-dom";

type GradeParams = { school_year_id: string };

function Grade() {
  const params = useParams<GradeParams>();
  const classes = {
    boxWrapper:
      "w-[20%]  text-[#fff] px-[8px] transition-transform   hover:translate-y-[-5px]",
    boxPD: "pt-[100%] rounded-[8px] relative w-full bg-slate-800",
    boxContent: "absolute inset-0 flex flex-col items-center justify-center",
    largeText: "text-[30px] font-bold",
  };

  return (
    <div className="">
      <Navigation className="mb-[30px]"/>
      <div className="flex -mx-[8px]">
        <Link to={`/class/${params.school_year_id}/k1`} className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Khối 1</h1>
              {/* <h5>2 Lớp</h5> */}
            </div>
          </div>
        </Link>

        <Link to={`/class/${params.school_year_id}/k2`} className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Khối 2</h1>
              {/* <h5>2 Lớp</h5> */}
            </div>
          </div>
        </Link>

        <Link to={`/class/${params.school_year_id}/k3`} className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Khối 3</h1>
              {/* <h5>2 Lớp</h5> */}
            </div>
          </div>
        </Link>

        <Link to={`/class/${params.school_year_id}/k4`} className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Khối 4</h1>
              {/* <h5>2 Lớp</h5> */}
            </div>
          </div>
        </Link>

        <Link to={`/class/${params.school_year_id}/k6`} className={classes.boxWrapper}>
          <div className={classes.boxPD}>
            <div className={classes.boxContent}>
              <h1 className={classes.largeText}>Khối 5</h1>
              {/* <h5>2 Lớp</h5> */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Grade;
