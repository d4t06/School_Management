
import { useNavigate } from "react-router-dom";

function ErrorPage() {
   return (
      <div
         className={`bg-slate-800 flex flex-col justify-center items-center min-h-screen`}
      >
         <h1
            className={`text-[30px] font-bold border p-[10px] text-white"
            `}
         >
            Hệ thống hiện không hoạt động
         </h1>
      </div>
   );
}

export default ErrorPage;
