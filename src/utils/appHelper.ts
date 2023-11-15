import { Timestamp } from "firebase/firestore";

export const sleep = (time: number) =>
  new Promise<void>((rs) => setTimeout(() => rs(), time));

export const convertTimestampToString = (timeStamp: Timestamp) => {
  return new Date(timeStamp.toDate().getTime()).toLocaleString();
};

