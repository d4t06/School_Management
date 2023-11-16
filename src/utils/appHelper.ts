import { Timestamp, collection, query } from "firebase/firestore";
import { db } from "../config/app";

export const sleep = (time: number) =>
  new Promise<void>((rs) => setTimeout(() => rs(), time));

export const convertTimestampToString = (timeStamp: Timestamp) => {
  return new Date(timeStamp.toDate()).toLocaleString();
};

export const generateQueryString = (collectionName: string) => query(collection(db, collectionName));