import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      {children}
    </>
  );
};
export default ToastProvider;
