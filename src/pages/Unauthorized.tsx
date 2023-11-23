function Unauthorized() {
   return (
      <div
         className={`bg-slate-800 flex flex-col justify-center items-center min-h-screen`}
      >
         <h1 className={`text-[30px] font-bold border p-[10px] text-white`}>
            Hiện bạn không thể truy nội dung này!
         </h1>
      </div>
   );
}

export default Unauthorized;
