import { ReactNode } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  className = "",
}: ModalWrapperProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal content */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
