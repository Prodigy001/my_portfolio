import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import IconRocket from "../icons/IconRocket";
import cryptoLight from "../assets/crypto-light.png";
import IconEmail from "../icons/IconEmail";
import IconPassword from "../icons/IconPassword";
import EyeDisable from "../icons/IconEyeDisable";
import Eye from "../icons/IconEye";
import IconGoogle from "../icons/IconGoogle";
import IconApple from "../icons/IconApple";
import IconNDPR from "../icons/IconNDPR";

interface LoginState {
  email: string;
  password: string;
  error: string;
  showPassword: boolean;
}

function Login() {
  const navigate = useNavigate();
  const { setUser } = useApp();

  const [loginData, setLoginData] = useState<LoginState>({
    email: "",
    password: "",
    error: "",
    showPassword: true,
  });

  const beginTyping = Boolean(loginData.email) || Boolean(loginData.password);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
      error: "",
    });
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Validate inputs
    if (!loginData.email || !loginData.password) {
      setLoginData({
        ...loginData,
        error: "Please fill in all fields",
      });
      return;
    }

    // Check if user exists in localStorage
    const savedUser = localStorage.getItem("zabira_user");
    if (!savedUser) {
      setLoginData({
        ...loginData,
        error: "User not found. Please sign up first.",
      });
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      if (user.email === loginData.email) {
        // Set user in context
        setUser(user);
        navigate("/dashboard");
      } else {
        setLoginData({
          ...loginData,
          error: "Email or password is incorrect",
        });
      }
    } catch (error) {
      setLoginData({
        ...loginData,
        error: "An error occurred. Please try again.",
      });
    }
  }

  function showPassword() {
    setLoginData({
      ...loginData,
      showPassword: !loginData.showPassword,
    });
  }

  return (
    <div className="bg-[#F4F4F5] h-screen w-full p-4 flex gap-4 overflow-auto">
      <main className="relative h-full w-full flex items-center justify-center">
        <div className=" max-h-[80vh] w-125 overflow-auto no-scrollbar space-y-6">
          {/* inner form */}
          <div className=" text-black p-9 rounded-2xl bg-white shadow-[0px_2px_4px_-1px_#FFFFFF14,0px_1px_0px_0px_#FFFFFF14] space-y-6">
            {/* section 1 */}
            <div className="space-y-6">
              <h1 className="font-bold leading-[124%] -tracking-[1.2%] text-2xl text-[#1A1A1A]">
                Welcome back!
              </h1>
              {beginTyping ? (
                <div
                  className={`relative bg-gradient-purple bg-cover p-4 overflow-hidden rounded-xl border-2 border-[#FFFFFF2E] flex gap-3 items-start justify-around w-full shrink-0`}
                >
                  <div className="absolute right-0 top-0 h-full aspect-square flex items-center justify-center">
                    <IconRocket />
                  </div>

                  <p className="font-bold leading-[124%] -tracking-[1.2%] text-lg text-[#FFFFFF]">
                    Speed UP Your Crypto, Giftcard & Bill Payments
                  </p>
                </div>
              ) : (
                <div
                  className={`bg-gradient-green bg-cover p-4 border-2 overflow-hidden rounded-xl border-[#FFFFFF2E] flex gap-3 items-start justify-around w-full shrink-0`}
                >
                  <div className="w-24 aspect-[1/0.5]">
                    <img
                      src={cryptoLight}
                      alt="Crypto currencies"
                      className="size-full object-contain object-top"
                    />
                  </div>

                  <p className="font-bold leading-[124%] -tracking-[1.2%] text-lg text-[#FFFFFF]">
                    SELL & GAIN up to ₦50 on every $ Crypto Trade
                  </p>
                </div>
              )}

              {/* Error Message */}
              {loginData.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{loginData.error}</p>
                </div>
              )}

              {/* Email */}
              <div className="border border-[#E1E1E2] rounded-lg p-4">
                <label className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]">
                  Email
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-6 min-w-6 flex items-center justify-center">
                    <IconEmail
                      stroke={loginData.email ? "#0044EE" : "#819099"}
                    />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    placeholder="Type your email"
                    autoFocus={true}
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
                  />
                </div>
              </div>

              {/* Password */}
              <div className=" border border-[#E1E1E2] rounded-lg p-4">
                <label className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]">
                  Password
                </label>
                <div className="relative flex items-center gap-2 mt-2 ">
                  <div className="absolute h-full aspect-square right-0">
                    <button
                      onClick={showPassword}
                      className="size-full flex items-center justify-center"
                    >
                      {loginData.showPassword ? <EyeDisable /> : <Eye />}
                    </button>
                  </div>
                  <div className="size-6 min-w-6 flex items-center justify-center">
                    <IconPassword
                      stroke={loginData.password ? "#0044EE" : "#819099"}
                    />
                  </div>
                  <input
                    name="password"
                    id="password"
                    type={loginData.showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="outline-none leading-[140%] -tracking-[1%]   placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <p className="text-zabira-blue font-medium text-sm cursor-pointer">
                  Forgot password?
                </p>
              </div>
            </div>

            {/* section 2 */}
            <div className="space-y-5">
              <div>
                <button
                  onClick={handleLogin}
                  className="h-11 w-full bg-[#0044EE] text-white rounded-md font-medium hover:bg-[#0035BB] transition-colors"
                >
                  Login
                </button>
              </div>
              <p className="text-center leading-[124%] -tracking-[1.2%] text-[#1A1A1AB2]">
                Or continue with
              </p>

              <div className="flex w-full items-center justify-between gap-6">
                <div className="w-full">
                  <button className="h-11 w-full bg-[#FCFCFC] hover:bg-[#1a1a1a09] border border-[#E1E1E2] rounded-md flex items-center justify-center gap-2">
                    <div className="size-6 min-w-6 flex items-center justify-center">
                      <IconGoogle />
                    </div>
                    <p className="font-semibold leading-[124%] text-base text-[#1A1A1A]">
                      Google
                    </p>
                  </button>
                </div>
                <div className="w-full">
                  <button className="h-11 w-full bg-[#1A1A1A] hover:bg-[#1a1a1aea] border border-[#1A1A1A1F] rounded-md flex items-center justify-center gap-2">
                    <div className="size-6 min-w-6 flex items-center justify-center">
                      <IconApple />
                    </div>
                    <p className="font-semibold leading-[124%] text-base text-white">
                      Apple
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* outer form */}
          <div className="flex flex-col items-center gap-6">
            <p className="font-medium leading-[124%] -tracking-[1.2%] text-[#1A1A1A] text-center">
              Don't have an account?{" "}
              <span
                className=" text-zabira-blue cursor-pointer hover:underline"
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </span>
            </p>
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

export default Login;
