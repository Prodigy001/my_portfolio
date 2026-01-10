import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";
import IconNDPR from "../icons/IconNDPR";
import IconEmail from "../icons/IconEmail";

function ChangeEmail() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  const [email, setEmail] = useState("");

  function ChangeEmail() {

    if (!email) return
    navigate("/auth/verify-email");

    setUser({
      email,
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return (
    <div className="bg-[#F4F4F5] h-screen w-full p-4 flex gap-4 overflow-auto">
      <main className="relative h-full w-full flex items-center justify-center">
        <form onSubmit={(e) => e.preventDefault()} className=" max-h-[80vh] w-125 overflow-auto no-scrollbar space-y-6">
          {/* inner form */}
          <div className=" text-black p-9 rounded-2xl bg-white shadow-[0px_2px_4px_-1px_#FFFFFF14,0px_1px_0px_0px_#FFFFFF14] space-y-6">
            {/* text */}
            <div className="space-y-4">
              <h1 className="font-bold leading-[124%] -tracking-[1.2%] text-2xl text-[#1A1A1A]">
                Change email
              </h1>
              <p className="text-base leading-[140%] -tracking-[1%] text-[#1A1A1AB2]">
                Enter the email address where you would like to receive the
                verification code
              </p>
            </div>
            {/* Email */}
            <div className="border border-[#E1E1E2] rounded-lg p-4">
              <label className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]">
                Email
              </label>
              <div className="flex items-center gap-2 mt-2">
                <div className="size-6 min-w-6 flex items-center justify-center">
                  <IconEmail stroke={email ? "#0044EE" : "#819099"} />
                </div>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Type your email"
                  autoFocus={true}
                  className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
                />
              </div>
            </div>

            {/* button */}
            <div>
              <button
                // disabled={!enableSignupBtn}
                onClick={ChangeEmail}
                className="h-11 w-full flex items-center gap-2 justify-center bg-[#1A1A1A] text-white rounded-md font-medium hover:bg-[#1a1a1aea] transition-colors disabled:bg-[#F4F4F5] disabled:text-[#1A1A1A2E] disabled:cursor-not-allowed "
              >
                Change Email
              </button>
            </div>
          </div>
          {/* outer form */}
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
        </form>
      </main>
    </div>
  );
}

export default ChangeEmail;
