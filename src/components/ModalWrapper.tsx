import type { ReactNode } from "react";
import IconRemove from "../icons/IconRemove";

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto py-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#0A18204D] backdrop-blur-[10px]" />

      {/* Modal content */}
      <div className="relative max-w-md w-full mx-4 my-auto">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            title="close modal"
            className="text-[#0A1820] text-2xl z-50 w-8 mb-2.5 aspect-square flex items-center justify-center rounded-full bg-[#F9F9FB] transition-colors"
          >
            <span className="sr-only">Close modal</span>
            <IconRemove />
          </button>
        </div>
        <div
          className={`bg-white rounded-2xl shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto ${className}`}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
