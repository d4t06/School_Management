import {
   Timestamp,
   collection,
   getDocs,
   query,
} from "firebase/firestore";
import { Account } from "../types";
import { db } from "../config/app";

export const getAllAccounts = async () => {
   const queryGetAccount = query(collection(db, "accounts"));
   const usersSnapshot = await getDocs(queryGetAccount);

   if (usersSnapshot.docs) {
      const accounts = usersSnapshot.docs.map((doc) => doc.data() as Account);
      return accounts;
   }
};

export const initAccountObject = ({ ...values }: Partial<Account>) => {
   const data: Account = {
      email: "",
      latest_seen: Timestamp.fromDate(new Date()),
      display_name: "",
      role: "R1",
      image_url: "",
      ...values,
   };

   return data;
};
