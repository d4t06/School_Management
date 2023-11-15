import { ReactNode } from "react";

type Variant = "primary" | "default";

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
};

function Button({ children, variant = "default", className, onClick }: Props) {
  const classes: Record<Variant, string> = {
    default: "",
    primary: "px-[12px] py-[4px] rounded-[4px] hover:opacity-[.8]",
  };

  return (
    <button onClick={onClick} className={`${className ?? ""} ${classes[variant]}`}>
      {children}
    </button>
  );
}

export default Button;
