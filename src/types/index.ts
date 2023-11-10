import { Timestamp } from "firebase/firestore";

export type StudentType = {
  id: string;
  full_name: string;
  image_url: string;
  image_path: string[];
  gender: "male" | "female" | "others";
  class_id: string;
  GPA: number;
  birthday: Date;
  placeOfBirth: string;
  address_id: string;
  father_full_name: string;
  father_phone_number: string;
  mother_full_name: string;
  mother_phone_number: string;
};

export type User = {
  email: string;
  role: "R1" | "R2" | "R3";
  display_name: string;
  latest_seen: Timestamp;
  image_url: string;
};

export type Teacher = {
  id: string;
  full_name: string;
  phone_number: string;
  gender: "male" | "female" | "others";
  birthday: Date;
  address_id: string;
  subjects_ids: string[];
};

export type Subject = {
  id: string;
  name: string;
};

export type Class = {
  id: string;
  teacher_id: string;
  className: string;
  grade_id: string;
};

export type Grade = {
  id: string;
  grade_name: string;
};

export type Address = {
  id: string;
  province: string;
  district: string;
  ward: string;
};

export type Toast = {
  title: "success" | "error" | "warning";
  desc: string;
  id: string;
};

export type ThemeKeyType = "red" | "green_light" | "deep_blue" | "gray" | "white";

export type ThemeType = {
  name: string;
  id: ThemeKeyType;
  type: "light" | "dark";
  side_bar_bg: string;
  container: string;
  content_text: string;
  content_hover_text: string;
  content_bg: string;
  content_hover_bg: string;
};
