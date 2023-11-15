import { collection, getDocs, query } from "firebase/firestore";
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