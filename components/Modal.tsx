import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex justify-center items-center">
      <div className="bg-white rounded-md z-5 w-2/5">{children}</div>
    </div>
  );
};

export default Modal;
