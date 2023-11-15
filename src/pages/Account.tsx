import { FormEvent, useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/app";
import { Account } from "../types";
import { convertTimestampToString } from "../utils/appHelper";
import { Button, Form, Modal } from "../components";
import { mySetDoc } from "../utils/firebaseHelpers";

function AccountPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const ranUseEffect = useRef(false);

  const handleAddAccount = (e: FormEvent, form: {}) => {
    e.preventDefault();


    console.log('check form', form);
    
    // await mySetDoc({collection: "accounts", data: {email: })
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
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] mb-[30px]">Tài khoản</h1>
        <Button
          onClick={() => setIsOpenModal(true)}
          variant="primary"
          className="bg-slate-800 text-white"
        >
          Thêm
        </Button>
      </div>
      <Table colList={["", "Tên tài khoản", "Email", "Lần truy cập gần nhất"]}>
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
          </tr>
        ))}
      </Table>

      {isOpenModal && (
        <Modal setOpenModal={setIsOpenModal}>
          <div className="w-[400px]">
            <Form
              onSubmit={handleAddAccount}
              fields={[{ name: "Email", label: "Email", width: "w-full" }]}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AccountPage;
