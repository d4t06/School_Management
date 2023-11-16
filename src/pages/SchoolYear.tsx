import { useState, useRef, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, MyInput } from "../components";
import { ArrowDownTrayIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { generateQueryString } from "@/utils/appHelper";
import { getDocs } from "firebase/firestore";
import { SchoolYear } from "@/types";
import ModalHeader from "@/components/modals/ModalHeader";
import { initSchoolYearObject } from "@/services/SchoolYearServices";
import { useToast } from "@/stores/ToastContext";
import { mySetDoc } from "@/utils/firebaseHelpers";

function SchoolYearPage() {
  const { setErrorToast, setSuccessToast } = useToast();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [schoolYearData, setSchoolYearData] = useState(initSchoolYearObject({}));
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
  const [loading, setLoading] = useState(false);

  const ranUseEffect = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetData = (name: keyof typeof schoolYearData, value: any) => {
    setSchoolYearData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (schoolYearData.id === "" || schoolYearData.name === "") {
      setErrorToast({});
      return;
    }

    try {
      setLoading(true);

      await mySetDoc({
        collection: "school_years",
        data: schoolYearData,
        id: schoolYearData.id,
      });
      setSchoolYears((prev) => [...prev, schoolYearData]);
      setSuccessToast({ message: "Thêm năm học thành công" });
    } catch (error) {
      console.log(error);
      setErrorToast({});
    } finally {
      setLoading(false);
      setIsOpenModal(false);
    }
  };

  useEffect(() => {
    const getSChoolYears = async () => {
      const queryGetAllSchoolYears = generateQueryString("school_years");
      const schoolYearsSnap = await getDocs(queryGetAllSchoolYears);

      if (schoolYearsSnap.docs.length) {
        const schoolYears = schoolYearsSnap.docs.map((doc) => doc.data() as SchoolYear);
        setSchoolYears(schoolYears);
      }
    };

    if (!ranUseEffect.current) {
      getSChoolYears();
      ranUseEffect.current = true;
    }
  }, []);

  const classes = {
    boxWrapper:
      "w-[20%]  text-[#fff] px-[8px] transition-transform   hover:translate-y-[-5px]",
    boxPD: "pt-[100%] rounded-[8px] relative w-full bg-slate-800",
    boxContent: "absolute inset-0 flex flex-col items-center justify-center",
    largeText: "text-[30px] font-bold text-center",
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-[30px]">
        <h1 className="text-[30px]">Năm học</h1>
        <Button
          onClick={() => setIsOpenModal(true)}
          variant="primary"
          className="bg-slate-800 text-white"
        >
          <PlusSmallIcon className="w-[25px]" />
          Thêm
        </Button>
      </div>
      <div className="flex -mx-[8px]">
        {schoolYears.map((item, index) => (
          <Link key={index} to={`/class/${item.id}`} className={classes.boxWrapper}>
            <div className={classes.boxPD}>
              <div className={classes.boxContent}>
                <h1 className={classes.largeText}>{item.name}</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {isOpenModal && (
        <Modal setOpenModal={setIsOpenModal}>
          <div
            className={`w-[400px] ${loading ? "opacity-60 pointer-events-none " : ""}`}
          >
            <ModalHeader setIsOpenModal={setIsOpenModal} title="Thêm năm học" />
            <form onSubmit={handleSubmit} action="" className="">
              <div className={`flex -mx-[10px]`}>
                <MyInput
                  ref={inputRef}
                  onChange={(e) => handleSetData("name", e.target.value)}
                  title="Tên Năm học"
                  width="w-[50%] px-[10px]"
                  value={schoolYearData.name}
                />
                <MyInput
                  width="w-[50%] px-[10px]"
                  onChange={(e) => handleSetData("id", e.target.value)}
                  title="Mã số"
                  value={schoolYearData.id}
                />
              </div>

              <div className={`flex -mx-[10px] opacity-60`}>
                <MyInput readOnly title="Bắt đầu" width="w-[50%] px-[10px]" />
                <MyInput readOnly width="w-[50%] px-[10px]" title="Kết thúc" />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="bg-slate-800 text-white mt-[20px]"
              >
                <ArrowDownTrayIcon className="w-[25px]" /> Thêm
              </Button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default SchoolYearPage;
