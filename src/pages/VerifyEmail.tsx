import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";
import IconSwap from "../icons/IconSwap";
import IconRepeat from "../icons/IconRepeat";
import IconShield from "../icons/IconShield";
import IconNDPR from "../icons/IconNDPR";
import IconVerifyEmail from "../icons/IconVerifyEmail";

interface UserState {
  email: string;
  password: string;
  referralCode: string;
  failedPasswordMatches: string[];
  passwordStrength: number;
  acceptTerms: boolean;
  showPassword: boolean;
}

function VerifyEmail() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [otp, setOTP] = useState({
    value: "",
    activeInput: "1",
    dummyOtp: "857573",
    formattedTime: "05:00",
    verified: false,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      let otpCoolDownStartTime: string | number | null = localStorage.getItem(
        "zabira_resend_otp_countdown"
      );
      if (otpCoolDownStartTime) {
        otpCoolDownStartTime = Number(JSON.parse(otpCoolDownStartTime));
      } else {
        navigate("/auth/sign-up");
        return;
      }
      const diff = Number(otpCoolDownStartTime) - Date.now();

      const minutes = new Date(diff).getMinutes().toString().padStart(2, "0");
      const seconds = new Date(diff).getSeconds().toString().padStart(2, "0");

      if (Number(minutes) > 4) {
        // navigate("/auth/sign-up");
        return;
      }

      const formattedTime = `${minutes}:${seconds}`;

      if (formattedTime === "00:00") {
        clearInterval(timerId);
      }
      setOTP((prev) => ({ ...prev, formattedTime }));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [navigate]);

  function focusInput(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const inputKey = input.name;
    setOTP({ ...otp, activeInput: inputKey });
  }

  function fillOTP(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const inputValue = input.value;
    const inputKey = Number(input.name);

    let otpValue;
    let nextActiveInput;

    if (inputKey === 1 && inputValue === "") {
      otpValue = "";
    }
    if (inputValue === "") {
      otpValue = otp.value.slice(0, inputKey - 1);
      nextActiveInput = otpValue.length.toString();
      const nextInput = document.getElementById(
        `otp-${nextActiveInput}`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else {
      otpValue = otp.value + inputValue;
      nextActiveInput = (otpValue.length + 1).toString();
      const nextInput = document.getElementById(
        `otp-${nextActiveInput}`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    setOTP({ ...otp, value: otpValue, activeInput: nextActiveInput });
  }

  function pasteCode() {
    setOTP({ ...otp, value: otp.dummyOtp, activeInput: "6" });
  }

  function resendCode() {
    let _otp = "";
    for (let i = 0; i < 6; i++) {
      const randVal = Math.round(Math.random() * 10);
      _otp += randVal;
    }
    setOTP({ ...otp, dummyOtp: _otp, value: "" });
  }

  function changeEmail() {
    navigate("/auth/change-email");
  }

  function verifyEmail() {
    if (otp.value === "" || otp.value.length !== 6) {
      return;
    }
    setOTP({ ...otp, verified: true });
  }

  function goToDashboard() {
    setOTP({ ...otp, verified: false });
    navigate("/dashboard");
  }

  return (
    <div className="relative bg-[#F4F4F5] h-screen w-full p-4 flex gap-4 overflow-auto">
      {/* Modal */}
      {otp.verified && (
        <div className="absolute z-10 size-full top-0 left-0 bg-[#F4F4F5] flex items-center justify-center">
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
                  // disabled={!enableSignupBtn}
                  onClick={goToDashboard}
                  className="h-11 w-full flex items-center gap-2 justify-center bg-[#1A1A1A] text-white rounded-md font-medium hover:bg-[#1a1a1aea] transition-colors disabled:bg-[#F4F4F5] disabled:text-[#1A1A1A2E] disabled:cursor-not-allowed "
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
          <div className=" text-black p-9 rounded-2xl bg-white shadow-[0px_2px_4px_-1px_#FFFFFF14,0px_1px_0px_0px_#FFFFFF14] space-y-6">
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
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm leading-[124%] -tracking-[1.2%] text-[#1A1A1A]">
                  Enter Code
                </p>
                <div>
                  <button
                    onClick={pasteCode}
                    className="p-1 rounded-sm bg-[#F4F4F5] hover:bg-[#1a1a1a17] text-center text-xs font-medium leading-[124%] -tracking-[1.2%] text-[#1A1A1AB2]"
                  >
                    Paste Code
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5, 6].map((item, idx) => {
                  return (
                    <div key={item}>
                      <input
                        id={`otp-${item}`}
                        // disabled={otp.activeInput !== item.toString()}
                        value={otp.value.split("")[idx]}
                        onChange={fillOTP}
                        onFocus={focusInput}
                        name={item.toString()}
                        maxLength={1}
                        autoFocus={otp.activeInput === item.toString()}
                        className={`rounded-lg w-12 h-11 border ${
                          otp.activeInput === item.toString()
                            ? "border-[#1A1A1A] text-[#1A1A1A]"
                            : "border-[#d8d8d891] text-[1A1A1A91]"
                        } text-center font-medium text-2xl leading-[124%] -tracking-[1.2%]`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Change Email */}
            <div className="flex justify-between items-center">
              <div>
                <button
                  onClick={changeEmail}
                  className="flex items-center p-2 gap-1 border border-[#E1E1E2] bg-[#FCFCFC] hover:bg-[#1a1a1a09] rounded-md text-sm leading-5.5 tracking-[0%] text-[#1A1A1A]"
                >
                  <IconRepeat />
                  <p>Change Email</p>
                </button>
              </div>
              {otp.formattedTime === "00:00" ? (
                <button onClick={resendCode}>
                  {" "}
                  <p className="text-sm leading-[124%] font-bold -tracking-[1.2%] text-[#1A1A1A]">
                    Resend Code
                  </p>
                </button>
              ) : (
                <p className="text-sm leading-[124%] font-medium -tracking-[1.2%] text-[#1A1A1AB2]">
                  Resend Code in{" "}
                  <span className=" text-zabira-blue">{otp.formattedTime}</span>
                </p>
              )}
            </div>
            {/* button */}
            <div>
              <button
                // disabled={!enableSignupBtn}
                onClick={verifyEmail}
                className="h-11 w-full flex items-center gap-2 justify-center bg-[#1A1A1A] text-white rounded-md font-medium hover:bg-[#1a1a1aea] transition-colors disabled:bg-[#F4F4F5] disabled:text-[#1A1A1A2E] disabled:cursor-not-allowed "
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
