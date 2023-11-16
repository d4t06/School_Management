import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

function Input({ width, ...props }: Props, ref: any) {
  const classes = {
    label: "font-semibold text-[18px]",
    input:
      "outline-none px-[10px] py-[4px] text-[18px] rounded-[4px] border-[1px] text-[#000]",
  };
  return (
    <div className={`flex flex-col gap-[4px] ${width ?? "flex-grow"} `}>
      <label className={classes.label}>{props.title}</label>
      <input ref={ref} {...props} className={`${classes.input} ${props.className}`} />
    </div>
  );
}

export default forwardRef(Input);
