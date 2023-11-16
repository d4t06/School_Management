// import {
//   ChangeEvent,
//   FormEvent,
//   ReactNode,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// type Props = {
//   fields: {
//     name: string;
//     label: string;
//     width?: string;
//     value?: string;
//   }[];
//   viewOnly?: boolean;
//   onSubmit: (e: FormEvent, form: {}) => void;
//   children?: ReactNode;
// };

// const prepareForm = (fields: Props["fields"]) => {
//   console.log("call");
//   return fields.reduce((prev, cur) => {
//     return { ...prev, [cur.name]: cur.value ?? "" };
//   }, {});
// };

// function Form({ fields, onSubmit, children, viewOnly }: Props) {
//   const [form, setForm] = useState(useMemo(() => prepareForm(fields), []));

//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleSetForm = (e: ChangeEvent<HTMLInputElement>) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const classes = {
//     label: "text-[14px]",
//     th: "bg-slate-800 text-[#fff] font-medium text-left px-[6px]",
//     td: "px-[6px] py-[4px] border-b",
//     input: "outline-none h-[28px] px-[10px] rounded-[4px] border-[1px] text-[#000]",
//   };

//   useEffect(() => {
//     if (!viewOnly) {
//       const inputEle = inputRef.current as HTMLInputElement;

//       if (inputEle) {
//         inputEle.focus();
//       }
//     }
//   }, [viewOnly]);

//   return (
//     <form className=" " action="" onSubmit={(e) => onSubmit(e, form)}>
//       <div className="-mx-[6px] flex flex-wrap gap-y-[8px]">
//         {fields.map((field, index) => (
//           <div
//             key={index}
//             className={`flex flex-col gap-[4px] ${field.width ?? "w-[50%]"} px-[6px]`}
//           >
//             <label htmlFor={field.name} className="font-semibold">
//               {field.label}
//             </label>
//             {viewOnly ? (
//               <input
//                 readOnly
//                 type="text"
//                 value={form[field.name]}
//                 id={field.name}
//                 name={field.name}
//                 className={classes.input}
//               />
//             ) : (
//               <input
//                 ref={index === 0 ? inputRef : null}
//                 type="text"
//                 id={field.name}
//                 name={field.name}
//                 className={classes.input}
//                 value={form[field.name]}
//                 onChange={(e) => handleSetForm(e)}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {children}
//     </form>
//   );
// }

// export default Form;
