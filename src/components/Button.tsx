import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "default";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}

function Button({ children, variant = "default", className, onClick, ...props }: Props) {
  const classes: Record<Variant, string> = {
    default: "hover:opacity-[.8]",
    primary:
      "px-[16px] py-[4px] rounded-[4px] hover:opacity-[.8] text-white inline-flex gap-[4px] items-center",
  };

  return (
    <button
      {...props}
      onClick={onClick}
      className={`${className ?? ""} ${classes[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
