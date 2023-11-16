import { Timestamp, getDocs } from "firebase/firestore";
import { SchoolYear } from "../types";
import { generateQueryString } from "@/utils/appHelper";

export const getAllSchoolYear = async () => {
  const queryGetAllSchoolYears = generateQueryString("school_years");
  const schoolYearsSnp = await getDocs(queryGetAllSchoolYears);

  if (schoolYearsSnp.docs.length) {
    const schoolYears = schoolYearsSnp.docs.map((doc) => doc.data() as SchoolYear);
    return schoolYears;
  }
};

export const initSchoolYearObject = ({ ...values }: Partial<SchoolYear>) => {
  const data: SchoolYear = {
    id: "",
    name: "",
    start_date: Timestamp.fromDate(new Date()),
    end_date: Timestamp.fromDate(new Date()),
    ...values,
  };

  return data;
};
