import { FormEvent, useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/app";
import { Account } from "../types";
import { convertTimestampToString } from "../utils/appHelper";
import { Button, Modal, MyInput } from "../components";
import { myDeleteDoc, mySetDoc } from "../utils/firebaseHelpers";
import { initAccountObject } from "../services/AccountServices";
import { ArrowDownTrayIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import ModalHeader from "../components/modals/ModalHeader";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useToast } from "@/stores/ToastContext";

function AccountPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const ranUseEffect = useRef(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [removeAccount, setRemoveAccount] = useState<Account>();

  const modalName = useRef<"add_account" | "confirm_remove_student">("add_account");

  const { setErrorToast, setSuccessToast } = useToast();

  const openModal = (name: typeof modalName.current) => {
    setIsOpenModal(true);
    modalName.current = name;
  };

  const reRemoveAccount = (student: Account) => {
    setRemoveAccount(student);
    openModal("confirm_remove_student");
  };

  const handleAddAccount = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const newAccount = initAccountObject({ email });
      await mySetDoc({ collection: "accounts", data: newAccount, id: email });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpenModal(false);
    }
  };

  const handleRemoveAccount = async () => {
    if (!removeAccount) {
      setErrorToast({});
      return;
    }

    try {
      setLoading(true);

      await myDeleteDoc({
        collection: "accounts",
        id: removeAccount.email,
      });

      const newClassStudents = accounts.filter((st) => st.email !== removeAccount.email);
      setAccounts(newClassStudents);
      setSuccessToast({ message: "Account removed successfully  " });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpenModal(false);
    }
  };

  const classes = {
    label: "text-[14px]",
    th: "bg-slate-800 text-[#fff] font-medium text-left px-[6px]",
    td: "px-[6px] py-[4px] border-b",
    input:
      "w-[200px] outline-none h-[28px] px-[10px] rounded-[4px] border-[1px] text-[#000]",
  };

  useEffect(() => {
    const getAccounts = async () => {
      const queryGetAccount = query(collection(db, "accounts"));
      const usersSnapshot = await getDocs(queryGetAccount);

      if (usersSnapshot.docs) {
        const accounts = usersSnapshot.docs.map((doc) => doc.data() as Account);

        console.log("get user", accounts);

        setAccounts(accounts);
      }
    };

    if (!ranUseEffect.current) {
      getAccounts();
      ranUseEffect.current = true;
    }
  }, []);

  if (!accounts.length) return <h1>No account jet...</h1>;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-[30px]">
        <h1 className="text-[30px]">Tài khoản</h1>
        <Button
          onClick={() => setIsOpenModal(true)}
          variant="primary"
          className="bg-slate-800 text-white"
        >
          <PlusSmallIcon className="w-[25px]" />
          Thêm
        </Button>
      </div>
      <Table colList={["", "Tên tài khoản", "Email", "Lần truy cập gần nhất", ""]}>
        {accounts.map((item, index) => (
          <tr key={index} className="bg-[#e1e1e1]">
            <td className={classes.td}>
              <div className="h-[44px] w-[44px] ml-[20px]">
                <img className="rounded-[4px]" src={item.image_url} />
              </div>
            </td>
            <td className={classes.td}>{item.display_name}</td>
            <td className={classes.td}>{item.email}</td>
            <td className={classes.td}>{convertTimestampToString(item.latest_seen)}</td>
            <td className={classes.td}>
              <Button
                onClick={() => reRemoveAccount(item)}
                variant="primary"
                className="bg-red-500"
              >
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </Table>

      {isOpenModal && (
        <Modal setOpenModal={setIsOpenModal}>
          {modalName.current === "add_account" && (
            <>
              <ModalHeader setIsOpenModal={setIsOpenModal} title="Thêm tài khoản" />
              <div
                className={`w-[400px] ${
                  loading ? "opacity-60 pointer-events-none " : ""
                }`}
              >
                <form onSubmit={handleAddAccount} action="">
                  <MyInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    title="Email"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="bg-slate-800 text-white mt-[20px]"
                  >
                    <ArrowDownTrayIcon className="w-[25px]" /> Thêm
                  </Button>
                </form>
              </div>
            </>
          )}

          {modalName.current === "confirm_remove_student" && (
            <ConfirmModal
              label={`Xóa tài khoản '${removeAccount?.email}'`}
              loading={loading}
              setOpenModal={setIsOpenModal}
              callback={handleRemoveAccount}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default AccountPage;
