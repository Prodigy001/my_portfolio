import { useState, useRef, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import { currencies } from "../data";
import { useApp } from "../context/AppContext";
import IconVerify from "../icons/IconVerify";
import IconVerifyEmail from "../icons/IconVerifyEmail";
import IconCaret from "../icons/IconCaret";
import IconArrow from "../icons/IconArrow";

interface VerifyPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified?: () => void;
}

type VerificationMethod = "whatsapp" | "sms" | "none";

// Animation styles for checkmark confirmation
const confirmationAnimationStyles = `
  @keyframes scaleIn {
    0% {
      transform: scale(0.4);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes ringPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.15);
      opacity: 0.5;
    }
  }

  .checkmark-container {
    animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .checkmark-ring {
    animation: ringPulse 2s ease-in-out infinite;
  }

  .checkmark-ring-2 {
    animation: ringPulse 2s ease-in-out 0.3s infinite;
  }

  .checkmark-ring-static {
    transform: scale(1);
    opacity: 1;
  }
`;

// Loading Animation Component
const LoadingAnimation = ({ isComplete }: { isComplete?: boolean }) => (
  <div className="flex items-center justify-center py-12">
    <style>{confirmationAnimationStyles}</style>
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Outer pulsing ring */}
      <div
        className={`absolute w-24 h-24 rounded-full border-2 border-[#D1F5E8] bg-[#F0FBF9] ${
          isComplete ? "checkmark-ring-static" : "checkmark-ring"
        }`}
      />
      {/* Inner pulsing ring */}
      <div
        className={`absolute w-16 h-16 rounded-full border-2 border-[#B8EFE4] ${
          isComplete ? "checkmark-ring-static" : "checkmark-ring-2"
        }`}
      />
      {/* Checkmark */}
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="checkmark-container relative z-10"
      >
        <path
          d="M16.3465 24.5196L21.5256 29.1807C22.4072 29.9742 23.7771 29.8527 24.5053 28.9164L32.6927 18.3898M24.5196 44.9523C35.8043 44.9523 44.9523 35.8043 44.9523 24.5196C44.9523 13.2349 35.8043 4.08691 24.5196 4.08691C13.2349 4.08691 4.08691 13.2349 4.08691 24.5196C4.08691 35.8043 13.2349 44.9523 24.5196 44.9523Z"
          stroke="#1DC660"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

const VerifyPhoneModal = ({
  isOpen,
  onClose,
  onVerified,
}: VerifyPhoneModalProps) => {
  const { user, setUser } = useApp();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [selectedCountry, setSelectedCountry] = useState(currencies[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationMethod, setVerificationMethod] =
    useState<VerificationMethod>("whatsapp");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const previousIsOpenRef = useRef(false);
  const previousStepRef = useRef<"phone" | "code">("phone");

  // Reset state when modal closes
  useEffect(() => {
    if (previousIsOpenRef.current && !isOpen) {
      // Modal just closed, reset all state
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep("phone");
      setPhoneNumber("");
      setCode(["", "", "", "", "", ""]);
      setPhoneError("");
      setVerificationMethod("whatsapp");
      setResendCountdown(0);
      setIsChanging(false);
      setIsConfirmed(false);
    }
    previousIsOpenRef.current = isOpen;
  }, [isOpen]);

  // Initialize countdown when entering code step
  useEffect(() => {
    if (previousStepRef.current !== "code" && step === "code") {
      // Just entered code step, initialize countdown
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResendCountdown(60);
    }
    previousStepRef.current = step;
  }, [step]);

  // Countdown timer effect
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendCountdown === 0 && step === "code") {
      // When timer reaches 0, reset verification method to none
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVerificationMethod("none");
    }
  }, [resendCountdown, step]);

  const validatePhoneNumber = (number: string): boolean => {
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, "");

    // Check if it's a valid length (exactly 10 digits)
    if (cleanNumber.length !== 10) {
      setPhoneError("Enter valid phone number");
      return false;
    }

    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and common phone formatting characters
    const cleanValue = value.replace(/[^\d\s\-()]/g, "");
    // Limit to 10 digits only
    const digitsOnly = cleanValue.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(digitsOnly);
    if (phoneError) setPhoneError("");
  };

  const handleVerify = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    // Simulate sending verification code - in production, call API here
    // Move to code verification step
    setStep("code");
    // Focus first input
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  const handleCodeChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value[value.length - 1];
    }

    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);

    const newCode = [...code];
    digits.split("").forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex((c) => !c);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyCode = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      return;
    }

    setIsVerifying(true);

    // Simulate API call - in production, send verificationCode to backend
    setTimeout(() => {
      // Update user phone in context
      if (user) {
        setUser({
          ...user,
          phone: `${selectedCountry.code}${phoneNumber}`,
        });
      }

      setIsVerifying(false);
      setIsConfirmed(true);
    }, 1500);
  };

  const handleConfirmationDone = () => {
    // Call success callback
    onVerified?.();

    // Close modal
    onClose();
  };

  const handleResend = () => {
    // In production, call API to resend verification code
    setCode(["", "", "", "", "", ""]);
    setResendCountdown(60);
    inputRefs.current[0]?.focus();
  };

  const handleChangePhoneNumber = () => {
    setStep("phone");
    setCode(["", "", "", "", "", ""]);
    setIsChanging(true);
  };

  const handleBackToCode = () => {
    setStep("code");
    setIsChanging(false);
    setPhoneNumber("");
    setPhoneError("");
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {isVerifying || isConfirmed ? (
        // Confirmation Screen copied from Email Verification style
        <div className=" text-black p-9 rounded-2xl bg-white shadow-[0px_2px_4px_-1px_#FFFFFF14,0px_1px_0px_0px_#FFFFFF14] space-y-6">
          <div className="w-full flex justify-center items-center">
            <IconVerifyEmail />
          </div>
          <div className="space-y-2">
            <h1 className="text-center font-bold leading-[124%] -tracking-[1.2%] text-2xl text-[#1A1A1A]">
              {isConfirmed ? "Phone Number Verified!" : "Verifying..."}
            </h1>
            <p className="text-center text-base leading-[140%] -tracking-[1%] text-[#1A1A1AB2]">
              {isConfirmed
                ? "Your phone number has been verified successfully."
                : "Please wait while we verify your code."}
            </p>
          </div>
          {isConfirmed && (
            <div>
              <button
                type="button"
                onClick={handleConfirmationDone}
                className="h-11 w-full flex items-center gap-2 justify-center custom-button text-white rounded-md font-medium  transition-colors disabled:bg-[#F4F4F5] disabled:text-[#1A1A1A2E] disabled:cursor-not-allowed "
              >
                Done
              </button>
            </div>
          )}
        </div>
      ) : step === "phone" ? (
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            {isChanging && (
              <button
                type="button"
                onClick={handleBackToCode}
                className="flex bg-[#F4F4F5] py-1.5 rounded-[40px] px-2 border-zabira-dark/12 items-center gap-1 text-sm font-semibold text-zabira-dark mb-4 transition-colors"
              >
                <span className="rotate-45 text-[#0A1820]">
                  <IconArrow />
                </span>
                Back
              </button>
            )}
            <h2 className="text-2xl font-bold text-zabira text-zabira-dark mb-2">
              {isChanging ? "Change phone number" : "Verify phone number"}
            </h2>
            <p className="text-base -tracking-[0.01em] text-zabira-dark/70">
              {isChanging
                ? "Enter your new phone number"
                : "Please enter a phone number where you would like to receive the verification code"}
            </p>
          </div>

          {/* Verification Method Selection */}
          {isChanging || (
            <div className="flex gap-3 mb-8">
              <button
                type="button"
                onClick={() => setVerificationMethod("whatsapp")}
                className={`flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(26,26,26,0.08)] gap-2 px-3 py-2 rounded-[50px] border transition-all ${
                  verificationMethod === "whatsapp"
                    ? "bg-[#0044EE] border-white/12 text-white"
                    : "bg-[#FCFCFC] border-[#E1E1E2] text-zabira-dark hover:border-[#A1A1AA]"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  className={`${
                    verificationMethod === "whatsapp"
                      ? "text-white"
                      : "text-[#52525B]"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66997 18.3337L2.79664 14.1937C2.05425 12.921 1.66422 11.4737 1.66664 10.0003C1.66664 5.39783 5.39747 1.66699 9.99997 1.66699C14.6025 1.66699 18.3333 5.39783 18.3333 10.0003C18.3333 14.6028 14.6025 18.3337 9.99997 18.3337C8.52729 18.336 7.08052 17.9463 5.8083 17.2045L1.66997 18.3337ZM6.99247 6.09033C6.88486 6.09701 6.7797 6.12535 6.6833 6.17366C6.5929 6.22485 6.51038 6.28885 6.4383 6.36366C6.3383 6.45783 6.28164 6.53949 6.2208 6.61866C5.91281 7.01949 5.74715 7.51151 5.74997 8.01699C5.75164 8.42533 5.8583 8.82283 6.02497 9.19449C6.3658 9.94616 6.92664 10.742 7.66747 11.4795C7.8458 11.657 8.01997 11.8353 8.20747 12.0012C9.12696 12.8107 10.2227 13.3945 11.4075 13.7062L11.8816 13.7787C12.0358 13.787 12.19 13.7753 12.345 13.7678C12.5877 13.7553 12.8246 13.6896 13.0391 13.5753C13.1775 13.502 13.2425 13.4653 13.3583 13.392C13.3583 13.392 13.3941 13.3687 13.4625 13.317C13.575 13.2337 13.6441 13.1745 13.7375 13.077C13.8066 13.0053 13.8666 12.9212 13.9125 12.8253C13.9775 12.6895 14.0425 12.4303 14.0691 12.2145C14.0891 12.0495 14.0833 11.9595 14.0808 11.9037C14.0775 11.8145 14.0033 11.722 13.9225 11.6828L13.4375 11.4653C13.4375 11.4653 12.7125 11.1495 12.27 10.9478C12.2233 10.9275 12.1733 10.9159 12.1225 10.9137C12.0655 10.9078 12.0078 10.9142 11.9535 10.9325C11.8992 10.9507 11.8494 10.9804 11.8075 11.0195V11.0178C11.8033 11.0178 11.7475 11.0653 11.145 11.7953C11.1104 11.8418 11.0628 11.8769 11.0081 11.8962C10.9535 11.9155 10.8944 11.9181 10.8383 11.9037C10.784 11.8891 10.7308 11.8708 10.6791 11.8487C10.5758 11.8053 10.54 11.7887 10.4691 11.7578L10.465 11.7562C9.98823 11.548 9.54682 11.2669 9.15664 10.9228C9.05164 10.8312 8.95414 10.7312 8.85414 10.6345C8.52629 10.3205 8.24057 9.96534 8.00414 9.57783L7.95497 9.49866C7.91966 9.44546 7.8911 9.38808 7.86997 9.32783C7.8383 9.20533 7.9208 9.10699 7.9208 9.10699C7.9208 9.10699 8.1233 8.88533 8.21747 8.76533C8.29588 8.66559 8.36903 8.56184 8.43664 8.45449C8.53497 8.29616 8.5658 8.13366 8.51414 8.00783C8.2808 7.43783 8.03914 6.87033 7.7908 6.30699C7.74164 6.19533 7.5958 6.11533 7.4633 6.09949C7.4183 6.09449 7.3733 6.08949 7.3283 6.08616C7.21639 6.0806 7.10425 6.08171 6.99247 6.08949V6.09033Z"
                    fill="currentColor"
                  />
                </svg>
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setVerificationMethod("sms")}
                className={`flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(26,26,26,0.08)] gap-2 px-3 py-2 rounded-[50px] border transition-all ${
                  verificationMethod === "sms"
                    ? "bg-[#0044EE] border-white/12 text-white"
                    : "bg-[#FCFCFC] border-[#E1E1E2] text-zabira-dark hover:border-[#A1A1AA]"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  className={`${
                    verificationMethod === "sms"
                      ? "text-white"
                      : "text-[#52525B]"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.00002 1.66699H15C15.221 1.66699 15.433 1.75479 15.5893 1.91107C15.7456 2.06735 15.8334 2.27931 15.8334 2.50033V17.5003C15.8334 17.7213 15.7456 17.9333 15.5893 18.0896C15.433 18.2459 15.221 18.3337 15 18.3337H5.00002C4.77901 18.3337 4.56705 18.2459 4.41076 18.0896C4.25448 17.9333 4.16669 17.7213 4.16669 17.5003V2.50033C4.16669 2.27931 4.25448 2.06735 4.41076 1.91107C4.56705 1.75479 4.77901 1.66699 5.00002 1.66699ZM10 14.167C9.77901 14.167 9.56705 14.2548 9.41077 14.4111C9.25448 14.5673 9.16669 14.7793 9.16669 15.0003C9.16669 15.2213 9.25448 15.4333 9.41077 15.5896C9.56705 15.7459 9.77901 15.8337 10 15.8337C10.221 15.8337 10.433 15.7459 10.5893 15.5896C10.7456 15.4333 10.8334 15.2213 10.8334 15.0003C10.8334 14.7793 10.7456 14.5673 10.5893 14.4111C10.433 14.2548 10.221 14.167 10 14.167Z"
                    fill="currentColor"
                  />
                </svg>
                Text Message
              </button>
            </div>
          )}

          {/* Phone Number Input */}
          <div className="border border-[#E1E1E2] focus-within:border-zabira-blue rounded-lg p-4">
            <label
              htmlFor="phone-number"
              className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1A]"
            >
              Phone Number
            </label>
            <div className="flex items-center gap-2 mt-2">
              {/* Country Code Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 pr-2.5 py-1.5 rounded-md   hover:border-[#A1A1AA] transition-colors"
                >
                  <selectedCountry.flag />
                  <span className="text-sm font-medium text-[#1A1A1A]/70">
                    +
                    {selectedCountry.code === "USD"
                      ? "1"
                      : selectedCountry.code === "NGN"
                      ? "234"
                      : selectedCountry.code === "GHC"
                      ? "233"
                      : "254"}
                  </span>
                  <span className="rotate-90 text-sm">
                    <IconCaret />
                  </span>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#E1E1E2] rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                    {currencies.map((currency) => {
                      const dialCode =
                        currency.code === "USD"
                          ? "1"
                          : currency.code === "NGN"
                          ? "234"
                          : currency.code === "GHC"
                          ? "233"
                          : "254";
                      return (
                        <button
                          key={currency.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(currency);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F4F4F5] transition-colors text-left"
                        >
                          <currency.flag />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-zabira-dark">
                              {currency.name}
                            </div>
                            <div className="text-xs text-zabira-dark/70">
                              +{dialCode}
                            </div>
                          </div>
                          {selectedCountry.code === currency.code && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M13.3333 4L6 11.3333L2.66666 8"
                                stroke="#0044EE"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Phone Number Input */}
              <input
                id="phone-number"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
              />
            </div>
          </div>
          {phoneError && (
            <p className="text-sm text-[#E92F15] text-zabira font-semibold mt-3 inline-flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99917 5.33366C7.90717 5.33366 7.83251 5.40833 7.83317 5.50033C7.83317 5.59233 7.90784 5.66699 7.99984 5.66699C8.09184 5.66699 8.16651 5.59233 8.16651 5.50033C8.16651 5.40833 8.09184 5.33366 7.99917 5.33366"
                  stroke="#E92F15"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 14V14C4.686 14 2 11.314 2 8V8C2 4.686 4.686 2 8 2V2C11.314 2 14 4.686 14 8V8C14 11.314 11.314 14 8 14Z"
                  stroke="#E92F15"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.99984 8V11.3333"
                  stroke="#E92F15"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              {phoneError}
            </p>
          )}

          {/* Verify Button */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={!phoneNumber}
            className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] disabled:bg-[#E1E1E2] disabled:text-zabira-dark/40 text-white rounded-lg py-3 px-4 font-semibold text-base transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {isChanging || (
              <span className="text-2xl">
                <IconVerify />
              </span>
            )}
            {isChanging ? "Change Phone Number" : "Verify"}
          </button>
        </div>
      ) : (
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zabira text-[#1A1A1A] mb-2">
              Enter verification code
            </h2>
            <p className="text-base text-zabira-dark/70">
              Hello Boss, please enter the 6 digit code that was sent to{" "}
              <span className="text-[#0044EE] font-medium">
                {selectedCountry.code === "USD"
                  ? "+1"
                  : selectedCountry.code === "NGN"
                  ? "+234"
                  : selectedCountry.code === "GHC"
                  ? "+233"
                  : "+254"}
                {phoneNumber}
              </span>
            </p>
          </div>

          {/* Code Input */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="verify-code"
                className="block text-sm font-semibold text-zabira text-zabira-dark"
              >
                Enter Code
              </label>
              <button
                type="button"
                onClick={() => {
                  // Manually trigger paste from clipboard
                  navigator.clipboard.readText().then((text) => {
                    const digits = text.replace(/\D/g, "").slice(0, 6);
                    const newCode = [...code];
                    digits.split("").forEach((digit, index) => {
                      if (index < 6) {
                        newCode[index] = digit;
                      }
                    });
                    setCode(newCode);
                    const nextEmptyIndex = newCode.findIndex((c) => !c);
                    const focusIndex =
                      nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
                    inputRefs.current[focusIndex]?.focus();
                  });
                }}
                className="text-xs font-medium text-zabira text-zabira-dark transition-colors py-1 px-1.5 bg-[#F4F4F5] rounded-sm hover:bg-[#E1E1E2] "
              >
                Paste Code
              </button>
            </div>
            <div className="flex gap-2 justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={index === 0 ? "verify-code" : undefined}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12.5 h-11.5 text-center text-xl font-semibold border border-[#D8D8D8] rounded-lg focus:border-[#0044EE] focus:outline-none transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Resend Options */}
          <div className="mb-6">
            {resendCountdown > 0 || (
              <div className="flex items-center gap-3">
                <p className="text-sm text-zabira font-medium text-zabira-dark/70">
                  Resend Via
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setVerificationMethod("whatsapp");
                      handleResend();
                    }}
                    className={`flex-1 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(26,26,26,0.08)] gap-2 px-3 py-2 rounded-[50px] border transition-all ${
                      verificationMethod === "whatsapp"
                        ? "bg-[#0044EE] border-white/12 text-white"
                        : "bg-[#FCFCFC] border-[#E1E1E2] text-zabira-dark hover:border-[#A1A1AA]"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      className={`${
                        verificationMethod === "whatsapp"
                          ? "text-white"
                          : "text-[#52525B]"
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.66997 18.3337L2.79664 14.1937C2.05425 12.921 1.66422 11.4737 1.66664 10.0003C1.66664 5.39783 5.39747 1.66699 9.99997 1.66699C14.6025 1.66699 18.3333 5.39783 18.3333 10.0003C18.3333 14.6028 14.6025 18.3337 9.99997 18.3337C8.52729 18.336 7.08052 17.9463 5.8083 17.2045L1.66997 18.3337ZM6.99247 6.09033C6.88486 6.09701 6.7797 6.12535 6.6833 6.17366C6.5929 6.22485 6.51038 6.28885 6.4383 6.36366C6.3383 6.45783 6.28164 6.53949 6.2208 6.61866C5.91281 7.01949 5.74715 7.51151 5.74997 8.01699C5.75164 8.42533 5.8583 8.82283 6.02497 9.19449C6.3658 9.94616 6.92664 10.742 7.66747 11.4795C7.8458 11.657 8.01997 11.8353 8.20747 12.0012C9.12696 12.8107 10.2227 13.3945 11.4075 13.7062L11.8816 13.7787C12.0358 13.787 12.19 13.7753 12.345 13.7678C12.5877 13.7553 12.8246 13.6896 13.0391 13.5753C13.1775 13.502 13.2425 13.4653 13.3583 13.392C13.3583 13.392 13.3941 13.3687 13.4625 13.317C13.575 13.2337 13.6441 13.1745 13.7375 13.077C13.8066 13.0053 13.8666 12.9212 13.9125 12.8253C13.9775 12.6895 14.0425 12.4303 14.0691 12.2145C14.0891 12.0495 14.0833 11.9595 14.0808 11.9037C14.0775 11.8145 14.0033 11.722 13.9225 11.6828L13.4375 11.4653C13.4375 11.4653 12.7125 11.1495 12.27 10.9478C12.2233 10.9275 12.1733 10.9159 12.1225 10.9137C12.0655 10.9078 12.0078 10.9142 11.9535 10.9325C11.8992 10.9507 11.8494 10.9804 11.8075 11.0195V11.0178C11.8033 11.0178 11.7475 11.0653 11.145 11.7953C11.1104 11.8418 11.0628 11.8769 11.0081 11.8962C10.9535 11.9155 10.8944 11.9181 10.8383 11.9037C10.784 11.8891 10.7308 11.8708 10.6791 11.8487C10.5758 11.8053 10.54 11.7887 10.4691 11.7578L10.465 11.7562C9.98823 11.548 9.54682 11.2669 9.15664 10.9228C9.05164 10.8312 8.95414 10.7312 8.85414 10.6345C8.52629 10.3205 8.24057 9.96534 8.00414 9.57783L7.95497 9.49866C7.91966 9.44546 7.8911 9.38808 7.86997 9.32783C7.8383 9.20533 7.9208 9.10699 7.9208 9.10699C7.9208 9.10699 8.1233 8.88533 8.21747 8.76533C8.29588 8.66559 8.36903 8.56184 8.43664 8.45449C8.53497 8.29616 8.5658 8.13366 8.51414 8.00783C8.2808 7.43783 8.03914 6.87033 7.7908 6.30699C7.74164 6.19533 7.5958 6.11533 7.4633 6.09949C7.4183 6.09449 7.3733 6.08949 7.3283 6.08616C7.21639 6.0806 7.10425 6.08171 6.99247 6.08949V6.09033Z"
                        fill="currentColor"
                      />
                    </svg>
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVerificationMethod("sms");
                      handleResend();
                    }}
                    className={`flex-1 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(26,26,26,0.08)] gap-2 px-3 py-2 rounded-[50px] border transition-all ${
                      verificationMethod === "sms"
                        ? "bg-[#0044EE] border-white/12 text-white"
                        : "bg-[#FCFCFC] border-[#E1E1E2] text-zabira-dark hover:border-[#A1A1AA]"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      className={`${
                        verificationMethod === "sms"
                          ? "text-white"
                          : "text-[#52525B]"
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.00002 1.66699H15C15.221 1.66699 15.433 1.75479 15.5893 1.91107C15.7456 2.06735 15.8334 2.27931 15.8334 2.50033V17.5003C15.8334 17.7213 15.7456 17.9333 15.5893 18.0896C15.433 18.2459 15.221 18.3337 15 18.3337H5.00002C4.77901 18.3337 4.56705 18.2459 4.41076 18.0896C4.25448 17.9333 4.16669 17.7213 4.16669 17.5003V2.50033C4.16669 2.27931 4.25448 2.06735 4.41076 1.91107C4.56705 1.75479 4.77901 1.66699 5.00002 1.66699ZM10 14.167C9.77901 14.167 9.56705 14.2548 9.41077 14.4111C9.25448 14.5673 9.16669 14.7793 9.16669 15.0003C9.16669 15.2213 9.25448 15.4333 9.41077 15.5896C9.56705 15.7459 9.77901 15.8337 10 15.8337C10.221 15.8337 10.433 15.7459 10.5893 15.5896C10.7456 15.4333 10.8334 15.2213 10.8334 15.0003C10.8334 14.7793 10.7456 14.5673 10.5893 14.4111C10.433 14.2548 10.221 14.167 10 14.167Z"
                        fill="currentColor"
                      />
                    </svg>
                    SMS
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Change Phone Number */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <button
              type="button"
              onClick={handleChangePhoneNumber}
              className="custom-button__inverted text-sm"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3811 1.66699L13.3629 4.24263C12.3757 3.66483 11.2266 3.33366 10.0002 3.33366C6.31826 3.33366 3.3335 6.31843 3.3335 10.0003C3.3335 11.2146 3.65814 12.3531 4.22538 13.3337M7.61921 18.3337L6.63744 15.758C7.62463 16.3358 8.77372 16.667 10.0002 16.667C13.6821 16.667 16.6668 13.6822 16.6668 10.0003C16.6668 8.78603 16.3422 7.64757 15.7749 6.66699"
                  stroke="#52525B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Change Phone Number
            </button>

            {resendCountdown > 0 && (
              <div className="flex items-center justify-center">
                <p className="text-sm font-semibold text-zabira-dark">
                  Resend Code in{" "}
                  {String(Math.floor(resendCountdown / 60)).padStart(2, "0")}:
                  {String(resendCountdown % 60).padStart(2, "0")}
                </p>
              </div>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="button"
            onClick={handleVerifyCode}
            disabled={!isCodeComplete || isVerifying}
            className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] disabled:bg-[#E1E1E2] disabled:text-zabira-dark/40 text-white rounded-lg py-3 px-4 font-semibold text-base transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">
              <IconVerify />
            </span>
            Verify
          </button>
        </div>
      )}
    </ModalWrapper>
  );
};

export default VerifyPhoneModal;
