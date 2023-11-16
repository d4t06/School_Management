import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

// Thường không khai báo width qua prop của Modal
// mà khai báo trong từng children

const Modal: FC<Props> = ({ children, setOpenModal }) => {
  return (
    <>
      {createPortal(
        <div className="fixed inset-0 z-[99]">
          <div
            onClick={(e) => {
              e.stopPropagation;
              setOpenModal(false);
            }}
            className="absolute bg-black opacity-60 inset-0 z-[90]"
          ></div>
          <div className="absolute z-[99] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="px-[16px] py-[20px] bg-[#f1f1f1] rounded-[12px] shadow-lg">
              {children}
            </div>
          </div>
        </div>,
        document.getElementById("portals")!
      )}
    </>
  );
};

export default Modal;
