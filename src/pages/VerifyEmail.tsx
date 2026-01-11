import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useEffect, useState, useRef } from "react";
import IconRepeat from "../icons/IconRepeat";
import IconShield from "../icons/IconShield";
import IconNDPR from "../icons/IconNDPR";
import IconVerifyEmail from "../icons/IconVerifyEmail";

const OTP_LENGTH = 6;

function VerifyEmail() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(300);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer effect
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

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

  return (
    <div className="relative bg-[#F4F4F5] xs:max-md:bg-white h-screen xs:max-md:h-auto w-full p-4 flex gap-4 overflow-auto">
      {/* Modal */}
      {verified && (
        <div className="absolute z-10 size-full top-0 left-0 bg-[#F4F4F5] xs:max-md:bg-white flex items-center justify-center">
          <div className=" max-h-[80vh] w-125 overflow-auto no-scrollbar space-y-6">
            {/* inner form */}
            <div className=" text-black p-9 rounded-2xl bg-white shadow-[0px_2px_4px_-1px_#FFFFFF14,0px_1px_0px_0px_#FFFFFF14] space-y-6">
              <div className="w-full flex justify-center items-center">
                <IconVerifyEmail />
              </div>
              {/* text */}
              <div className="space-y-2">
                <h1 className="text-center font-bold leading-[124%] -tracking-[1.2%] text-2xl text-[#1A1A1A]">
                  Email Verified!
                </h1>
                <p className="text-center text-base leading-[140%] -tracking-[1%] text-[#1A1A1AB2]">
                  Your email has been verified successfully.
                </p>
              </div>

              {/* button */}
              <div>
                <button
                  onClick={() => {
                    setVerified(false);
                    navigate("/dashboard");
                  }}
                  className="h-11 w-full flex items-center gap-2 justify-center custom-button text-white rounded-md font-medium  transition-colors disabled:bg-[#F4F4F5] disabled:text-[#1A1A1A2E] disabled:cursor-not-allowed "
                >
                  Done
                </button>
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <div className="bg-white p-2 flex items-center rounded-md gap-1">
                <div className="size-5 min-w-5 flex items-center justify-center">
                  <IconNDPR />
                </div>
                <p className="font-medium text-sm leading-[124%] -tracking-[1.2%] text-[#1A1A1AB2]">
                  NDPR Compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <main className="relative h-full w-full flex items-center justify-center">
        <div className=" max-h-[80vh] w-125 overflow-auto no-scrollbar space-y-6">
          {/* inner form */}
          <div className=" text-black p-9 xs:max-md:px-0 rounded-2xl bg-white shadow-[0px_2px_4px_-1px_#FFFFFF14,0px_1px_0px_0px_#FFFFFF14] space-y-6">
            {/* text */}
            <div className="space-y-4">
              <h1 className="font-bold leading-[124%] -tracking-[1.2%] text-2xl text-[#1A1A1A]">
                Check your email
              </h1>
              <p className="text-base leading-[140%] -tracking-[1%] text-[#1A1A1AB2]">
                Hello Boss, please enter the 6 digit code that was sent to{" "}
                <span className="font-medium text-zabira-blue leading-[124%] -tracking-[1.2%]">
                  {user?.email}{" "}
                </span>
              </p>
            </div>
            {/* otp */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="verify-email-code"
                  className="block text-sm font-semibold text-zabira-dark"
                >
                  Enter Code
                </label>
                <button
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
                  className="text-xs font-medium text-zabira-dark transition-colors py-1 px-1.5 bg-[#F4F4F5] rounded-sm hover:bg-[#E1E1E2]"
                >
                  Paste Code
                </button>
              </div>
              <div className="flex gap-2 justify-between">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={index === 0 ? "verify-email-code" : undefined}
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
            {/* Change Email */}
            <div className="flex justify-between items-center">
              <div>
                <button
                  onClick={() => navigate("/auth/change-email")}
                  className="flex items-center p-2 gap-1 border border-[#E1E1E2] bg-[#FCFCFC] hover:bg-bg-hover-dark rounded-md text-sm leading-5.5 tracking-[0%] text-[#1A1A1A]"
                >
                  <IconRepeat />
                  <p>Change Email</p>
                </button>
              </div>
              {resendCountdown > 0 ? (
                <p className="text-sm leading-[124%] font-medium -tracking-[1.2%] text-[#1A1A1AB2]">
                  Resend Code in{" "}
                  <span className=" text-zabira-blue">
                    {String(Math.floor(resendCountdown / 60)).padStart(2, "0")}:
                    {String(resendCountdown % 60).padStart(2, "0")}
                  </span>
                </p>
              ) : (
                <button
                  onClick={() => {
                    setCode(["", "", "", "", "", ""]);
                    setResendCountdown(300);
                    inputRefs.current[0]?.focus();
                  }}
                >
                  {" "}
                  <p className="text-sm leading-[124%] font-bold -tracking-[1.2%] text-[#1A1A1A]">
                    Resend Code
                  </p>
                </button>
              )}
            </div>
            {/* button */}
            <div>
              <button
                onClick={() => {
                  const verificationCode = code.join("");
                  if (verificationCode.length !== 6) {
                    alert("Please enter all 6 digits");
                    return;
                  }
                  setVerified(true);
                }}
                className="h-11 w-full flex items-center gap-2 justify-center custom-button text-white rounded-md font-medium  transition-colors disabled:bg-[#F4F4F5] disabled:text-[#1A1A1A2E] disabled:cursor-not-allowed "
              >
                <IconShield />
                Verify
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <div className="bg-white p-2 flex items-center rounded-md gap-1">
              <div className="size-5 min-w-5 flex items-center justify-center">
                <IconNDPR />
              </div>
              <p className="font-medium text-sm leading-[124%] -tracking-[1.2%] text-[#1A1A1AB2]">
                NDPR Compliant
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerifyEmail;
