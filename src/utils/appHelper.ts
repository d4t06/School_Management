import { Timestamp, collection, query } from "firebase/firestore";
import { db } from "../config/app";
import { CollectionVariants } from "@/types";

export const sleep = (time: number) =>
  new Promise<void>((rs) => setTimeout(() => rs(), time));

export const convertTimestampToString = (timeStamp: Timestamp) => {
  return new Date(timeStamp.toDate()).toLocaleString();
};

export const generateQueryString = (collectionName: CollectionVariants) => query(collection(db, collectionName));