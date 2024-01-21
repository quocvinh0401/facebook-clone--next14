"use client";

import { IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "~/redux/slices/modal.slice";

import { TbArrowLeft } from "react-icons/tb";
import { RootState } from "~/redux/store";

interface Props {
  children: React.ReactNode;
  onBack?: () => void;
}

const Modal = ({ children, onBack }: Props) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [height, setHeight] = useState(0);

  const { isUsed, title, type } = useSelector(
    (state: RootState) => state.modal,
  );

  const closeModal = (child: boolean, e: any) => {
    if (child) {
      e.stopPropagation();
      dispatch(toggle());
    } else {
      if (modalRef.current == e.target) dispatch(toggle());
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const calcHeight = () => setHeight(window.innerHeight - 60);
      calcHeight();
      window.addEventListener("resize", calcHeight);

      return () => window.removeEventListener("resize", calcHeight);
    }
  }, []);

  return isUsed ? (
    <div
      onClick={(e) => closeModal(false, e)}
      ref={modalRef}
      className="absolute left-0 top-0 z-[9999] !m-0 flex h-screen w-full items-center justify-center bg-white bg-opacity-80"
    >
      <div
        className="overflow-hidden overflow-y-auto rounded bg-white shadow-lg"
        style={{ maxHeight: height }}
      >
        <div className="relative flex items-center justify-center border-b p-4">
          {onBack && (
            <button
              onClick={onBack}
              className="absolute left-4 flex items-center justify-center rounded-full bg-secondary-button p-2"
            >
              <TbArrowLeft size={20} />
            </button>
          )}
          <span className="text-xl font-bold">{title}</span>
          {!onBack && (
            <button
              onClick={(e) => closeModal(true, e)}
              className="absolute right-4 flex items-center justify-center rounded-full bg-secondary-button p-2"
            >
              <IconX width={20} height={20} />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Modal;
