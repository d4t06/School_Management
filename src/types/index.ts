export type Student = {
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
}
