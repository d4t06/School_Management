import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Toast } from "../types";

type Props = {
  toast: Toast;
  onClick: (id: string) => void;
};

export default function ToastItem({ toast, onClick }: Props) {
  const classes = {
    icon: `w-[30px]`,
    container: `bg-white px-[20px] py-[10px] rounded-[6px] flex items-center shadow-[1px_4px_15px_rgba(0,0,0,0.15)]`,
    text: `font-[500] text-[16px] / `,
  };

  return (
    <div
      onClick={() => onClick(toast.id)}
      className={`${classes.container} animate-[fadeIn_0.3s_linear]`}
    >
      <span className="mr-[10px]">
        {toast.title === "success" && (
          <CheckCircleIcon className={`${classes.icon} text-emerald-500 `} />
        )}
        {toast.title === "error" && (
          <XCircleIcon className={`${classes.icon} text-red-500`} />
        )}
        {toast.title === "warning" && (
          <ExclamationCircleIcon className={`${classes.icon} text-yellow-500`} />
        )}
      </span>
      <p className={classes.text}>{toast.desc}</p>
    </div>
  );
}
