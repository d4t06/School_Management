import { CollectionVariants } from "@/types";
import { db } from "../config/app";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

const isDev: boolean = !!import.meta.env.DEV;

export const myDeleteDoc = async ({
   collection,
   id,
   msg,
}: {
   collection: CollectionVariants;
   id: string;
   msg?: string;
}) => {
   if (isDev) console.log(msg ?? ">>> api: delete doc");
   await deleteDoc(doc(db, collection, id));
};

export const myGetDoc = async ({
   collection,
   id,
   msg,
}: {
   collection: CollectionVariants;
   id: string;
   msg?: string;
}) => {
   if (isDev) console.log(msg ?? ">>> api: get doc");

   return getDoc(doc(db, collection, id));
};

export const mySetDoc = async ({
   collection,
   id,
   data,
   msg,
}: {
   collection: CollectionVariants;
   id: string;
   data: {};
   msg?: string;
}) => {
   if (isDev) console.log(msg ?? ">>> api: set doc");

   return await setDoc(doc(db, collection, id), { ...data }, { merge: true });
};