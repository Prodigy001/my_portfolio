import { useState, useRef, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import { currencies } from "../data";
import { useApp } from "../context/AppContext";

interface VerifyPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified?: () => void;
}

type VerificationMethod = "whatsapp" | "sms";

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

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep("phone");
      setPhoneNumber("");
      setCode(["", "", "", "", "", ""]);
      setPhoneError("");
      setVerificationMethod("whatsapp");
    }
  }, [isOpen]);

  const validatePhoneNumber = (number: string): boolean => {
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, "");

    // Check if it's a valid length (typically 10-15 digits)
    if (cleanNumber.length < 10 || cleanNumber.length > 15) {
      setPhoneError("Please enter a valid phone number");
      return false;
    }

    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and common phone formatting characters
    const cleanValue = value.replace(/[^\d\s\-\(\)]/g, "");
    setPhoneNumber(cleanValue);
    if (phoneError) setPhoneError("");
  };

  const handleVerify = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    // Simulate sending verification code
    const fullPhone = `${selectedCountry.code} ${phoneNumber}`;
    console.log(`Sending ${verificationMethod} code to ${fullPhone}`);

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

    // Simulate API call
    setTimeout(() => {
      console.log("Verifying code:", verificationCode);

      // Update user phone in context
      if (user) {
        setUser({
          ...user,
          phone: `${selectedCountry.code}${phoneNumber}`,
        });
      }

      setIsVerifying(false);

      // Call success callback
      onVerified?.();

      // Close modal
      onClose();
    }, 1500);
  };

  const handleResend = () => {
    console.log(
      `Resending ${verificationMethod} code to ${selectedCountry.code} ${phoneNumber}`
    );
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleChangePhoneNumber = () => {
    setStep("phone");
    setCode(["", "", "", "", "", ""]);
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {step === "phone" ? (
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zabira text-[#1A1A1A] mb-2">
              Verify phone number
            </h2>
            <p className="text-base text-zabira-dark/70">
              Please enter a phone number where you would like to receive the
              verification code
            </p>
          </div>

          {/* Verification Method Selection */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setVerificationMethod("whatsapp")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                verificationMethod === "whatsapp"
                  ? "bg-[#EBF5FF] border-[#0044EE] text-[#0044EE]"
                  : "bg-white border-[#E1E1E2] text-zabira-dark/70 hover:border-[#A1A1AA]"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8C0 9.54 0.46 10.98 1.26 12.18L0.5 15.5L3.82 14.74C5.02 15.54 6.46 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM11.93 11.18C11.78 11.58 11.04 11.94 10.73 11.99C10.46 12.03 10.12 12.04 9.75 11.92C9.53 11.85 9.25 11.75 8.89 11.58C7.12 10.83 5.97 9.01 5.88 8.89C5.79 8.77 5.19 7.97 5.19 7.14C5.19 6.31 5.62 5.91 5.79 5.73C5.96 5.55 6.16 5.5 6.31 5.5C6.37 5.5 6.42 5.5 6.47 5.5C6.64 5.5 6.72 5.51 6.83 5.79C6.96 6.11 7.27 6.94 7.31 7.02C7.35 7.1 7.38 7.2 7.32 7.32C7.27 7.44 7.23 7.5 7.14 7.6C7.05 7.7 6.95 7.83 6.87 7.91C6.78 8 6.69 8.1 6.79 8.27C6.89 8.44 7.27 9.06 7.84 9.56C8.55 10.19 9.14 10.38 9.31 10.46C9.48 10.54 9.58 10.52 9.68 10.41C9.78 10.3 10.09 9.93 10.2 9.76C10.31 9.59 10.42 9.62 10.57 9.67C10.72 9.72 11.55 10.13 11.72 10.22C11.89 10.31 12 10.35 12.04 10.43C12.08 10.51 12.08 10.78 11.93 11.18Z"
                  fill="currentColor"
                />
              </svg>
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setVerificationMethod("sms")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                verificationMethod === "sms"
                  ? "bg-[#EBF5FF] border-[#0044EE] text-[#0044EE]"
                  : "bg-white border-[#E1E1E2] text-zabira-dark/70 hover:border-[#A1A1AA]"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2H2C1.45 2 1 2.45 1 3V13C1 13.55 1.45 14 2 14H14C14.55 14 15 13.55 15 13V3C15 2.45 14.55 2 14 2ZM14 13H2V4L8 8.5L14 4V13ZM8 7.5L2 3H14L8 7.5Z"
                  fill="currentColor"
                />
              </svg>
              Text Message
            </button>
          </div>

          {/* Phone Number Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-zabira-dark mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              {/* Country Code Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-3 border border-[#E1E1E2] rounded-lg bg-white hover:border-[#A1A1AA] transition-colors"
                >
                  <selectedCountry.flag />
                  <span className="text-sm font-medium text-zabira-dark">
                    +
                    {selectedCountry.code === "USD"
                      ? "1"
                      : selectedCountry.code === "NGN"
                      ? "234"
                      : selectedCountry.code === "GHC"
                      ? "233"
                      : "254"}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="234"
                className={`flex-1 px-4 py-3 border rounded-lg bg-white transition-colors ${
                  phoneError
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#E1E1E2] focus:border-[#0044EE]"
                } focus:outline-none text-base`}
              />
            </div>
            {phoneError && (
              <p className="text-sm text-red-500 mt-1">{phoneError}</p>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={!phoneNumber}
            className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] disabled:bg-[#E1E1E2] disabled:text-zabira-dark/40 text-white rounded-lg py-3 px-4 font-semibold text-base transition-colors flex items-center justify-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-current"
            >
              <path
                d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.5 6.5L7.5 9.5L5.5 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verify
          </button>
        </div>
      ) : (
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zabira text-[#1A1A1A] mb-2">
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
              <label className="block text-sm font-medium text-zabira-dark">
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
                className="text-sm text-zabira-dark/70 hover:text-zabira-dark transition-colors"
              >
                Paste Code
              </button>
            </div>
            <div className="flex gap-2 justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
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
                  className="w-12 h-12 text-center text-xl font-semibold border border-[#E1E1E2] rounded-lg focus:border-[#0044EE] focus:outline-none transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Resend Options */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-zabira-dark/70">Resend Via</span>
              <button
                type="button"
                onClick={() => {
                  setVerificationMethod("whatsapp");
                  handleResend();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors ${
                  verificationMethod === "whatsapp"
                    ? "bg-[#EBF5FF] border-[#0044EE] text-[#0044EE]"
                    : "border-[#E1E1E2] text-zabira-dark/70 hover:border-[#A1A1AA]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8C0 9.54 0.46 10.98 1.26 12.18L0.5 15.5L3.82 14.74C5.02 15.54 6.46 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM11.93 11.18C11.78 11.58 11.04 11.94 10.73 11.99C10.46 12.03 10.12 12.04 9.75 11.92C9.53 11.85 9.25 11.75 8.89 11.58C7.12 10.83 5.97 9.01 5.88 8.89C5.79 8.77 5.19 7.97 5.19 7.14C5.19 6.31 5.62 5.91 5.79 5.73C5.96 5.55 6.16 5.5 6.31 5.5C6.37 5.5 6.42 5.5 6.47 5.5C6.64 5.5 6.72 5.51 6.83 5.79C6.96 6.11 7.27 6.94 7.31 7.02C7.35 7.1 7.38 7.2 7.32 7.32C7.27 7.44 7.23 7.5 7.14 7.6C7.05 7.7 6.95 7.83 6.87 7.91C6.78 8 6.69 8.1 6.79 8.27C6.89 8.44 7.27 9.06 7.84 9.56C8.55 10.19 9.14 10.38 9.31 10.46C9.48 10.54 9.58 10.52 9.68 10.41C9.78 10.3 10.09 9.93 10.2 9.76C10.31 9.59 10.42 9.62 10.57 9.67C10.72 9.72 11.55 10.13 11.72 10.22C11.89 10.31 12 10.35 12.04 10.43C12.08 10.51 12.08 10.78 11.93 11.18Z"
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors ${
                  verificationMethod === "sms"
                    ? "bg-[#EBF5FF] border-[#0044EE] text-[#0044EE]"
                    : "border-[#E1E1E2] text-zabira-dark/70 hover:border-[#A1A1AA]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M14 2H2C1.45 2 1 2.45 1 3V13C1 13.55 1.45 14 2 14H14C14.55 14 15 13.55 15 13V3C15 2.45 14.55 2 14 2ZM14 13H2V4L8 8.5L14 4V13ZM8 7.5L2 3H14L8 7.5Z"
                    fill="currentColor"
                  />
                </svg>
                SMS
              </button>
            </div>
          </div>

          {/* Change Phone Number */}
          <button
            type="button"
            onClick={handleChangePhoneNumber}
            className="w-full mb-6 flex items-center justify-center gap-2 text-zabira-dark/70 hover:text-zabira-dark text-sm font-medium transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4L2 8L6 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 8H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Change Phone Number
          </button>

          {/* Verify Button */}
          <button
            type="button"
            onClick={handleVerifyCode}
            disabled={!isCodeComplete || isVerifying}
            className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] disabled:bg-[#E1E1E2] disabled:text-zabira-dark/40 text-white rounded-lg py-3 px-4 font-semibold text-base transition-colors flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verifying...
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-current"
                >
                  <path
                    d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 6.5L7.5 9.5L5.5 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Verify
              </>
            )}
          </button>
        </div>
      )}
    </ModalWrapper>
  );
};

export default VerifyPhoneModal;
