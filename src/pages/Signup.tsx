import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import cryptoLight from "../assets/crypto-light.png";
import IconEmail from "../icons/IconEmail";
import IconPassword from "../icons/IconPassword";
import IconReferralCode from "../icons/IconReferralCode";
import IconGoogle from "../icons/IconGoogle";
import IconApple from "../icons/IconApple";
import IconNDPR from "../icons/IconNDPR";
import IconFailedPasswordMatch from "../icons/IconFailedPasswordMatch";
import IconCorrectPasswordMatch from "../icons/IconCorrectPasswordMatch";
import Eye from "../icons/IconEye";
import EyeDisable from "../icons/IconEyeDisable";
import IconShield from "../icons/IconShield";
import IconRocket from "../icons/IconRocket";

interface UserState {
  email: string;
  password: string;
  referralCode: string;
  failedPasswordMatches: string[];
  passwordStrength: number;
  acceptTerms: boolean;
  showPassword: boolean;
}

function Signup() {
  const navigate = useNavigate();
  const { setUser: saveUserToContext } = useApp();
  const [user, setUserData] = useState<UserState>({
    email: "",
    password: "",
    referralCode: "",
    failedPasswordMatches: [
      "minimumLength",
      "lowercase",
      "uppercase",
      "number",
      "specialCharacter",
    ],
    passwordStrength: 0,
    acceptTerms: false,
    showPassword: true,
  });
  const [error, setError] = useState("");
  const strengthIndicatorText = ["Weak", "Average", "Good", "Strong"];

  const PASSWORD_VISUALS = [
    {
      label: "minimumLength",
      text: "Must be at least 8 characters",
    },
    {
      label: "lowercase|uppercase",
      text: " Capital letters and lower case, e.g. A and a",
    },
    {
      label: "number",
      text: "Numbers, e.g. 1234567890",
    },
    {
      label: "specialCharacter",
      text: "Special characters, e.g. !@#$%^&*()_+{}",
    },
  ];

  const PASSWORD_VALIDATOR: Record<string, (password: string) => string> = {
    minimumLength: (password: string) => {
      return /.{8,}/.test(password) ? "" : "minimumLength";
    },
    lowercase: (password: string) => {
      return /(?=.*[a-z])/.test(password) ? "" : "lowercase";
    },
    uppercase: (password: string) => {
      return /(?=.*[A-Z])/.test(password) ? "" : "uppercase";
    },
    number: (password: string) => {
      return /(?=.*\d)/.test(password) ? "" : "number";
    },
    specialCharacter: (password: string) => {
      return /(?=.*[!@#$%^&*()_+{}])/.test(password) ? "" : "specialCharacter";
    },
  };

  const enableSignupBtn =
    Boolean(user.email) &&
    Boolean(user.password) &&
    user.passwordStrength > 2 &&
    user.acceptTerms;

  const beginTyping = Boolean(user.email) || Boolean(user.password);

  function acceptTerms() {
    setUserData({
      ...user,
      acceptTerms: !user.acceptTerms,
    });
  }

  function showPassword() {
    setUserData({
      ...user,
      showPassword: !user.showPassword,
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    let failedMatches: string[] = [];
    let strength = 4;
    if (name === "password") {
      for (const validator in PASSWORD_VALIDATOR) {
        failedMatches.push(PASSWORD_VALIDATOR[validator](value));
      }
      failedMatches = failedMatches.filter((match) => Boolean(match));
      if (failedMatches.length === 0) {
        strength = 4;
      } else if (
        !["minimumLength", "lowercase", "uppercase", "number"].some((item) =>
          failedMatches.includes(item)
        )
      ) {
        strength = 3;
      } else if (
        !["minimumLength", "number"].some((item) =>
          failedMatches.includes(item)
        ) &&
        ["lowercase", "uppercase"].some((item) => failedMatches.includes(item))
      ) {
        strength = 2;
      } else {
        strength = 1;
      }
    }

    setUserData({
      ...user,
      [name]: value,
      failedPasswordMatches: failedMatches,
      passwordStrength: strength,
    });
  }

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!user.email || !user.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (user.passwordStrength < 3) {
      setError("Password is not strong enough");
      return;
    }

    // Check if user already exists
    const existingUser = localStorage.getItem("zabira_user");
    if (existingUser) {
      const parsed = JSON.parse(existingUser);
      if (parsed.email === user.email) {
        setError("Email already registered. Please login instead.");
        return;
      }
    }

    // Store user data
    const newUser = {
      email: user.email,
      password: user.password,
      referralCode: user.referralCode,
    };

    saveUserToContext(newUser);
    navigate("/auth/verify-email");
  }

  return (
    <div className="bg-bg-app h-screen w-full p-4 flex gap-4 overflow-auto">
      <main className="relative h-full w-full flex items-center justify-center">
        <div className=" max-h-[80vh] w-125 overflow-auto no-scrollbar space-y-6">
          {/* inner form */}
          <form
            onSubmit={handleSignUp}
            className=" text-neutral-950 p-9 rounded-2xl bg-bg-card shadow-[0px_2px_4px_-1px_#FFFFFF14,0px_1px_0px_0px_#FFFFFF14] space-y-6"
          >
            {/* section 1 */}
            <div className="space-y-6">
              <h1 className="font-bold leading-[124%] -tracking-[1.2%] text-2xl text-text-primary">
                Create an account in 2 minutes!
              </h1>

              {beginTyping ? (
                <div
                  className={`relative bg-gradient-purple bg-cover p-4 overflow-hidden rounded-xl border-2 border-border-white flex gap-3 items-start justify-around w-full shrink-0`}
                  aria-hidden="true"
                >
                  <div className="absolute right-0 top-0 h-full aspect-square flex items-center justify-center">
                    <IconRocket />
                  </div>

                  <p className="font-bold leading-[124%] -tracking-[1.2%] text-lg text-neutral-50">
                    Speed UP Your Crypto, Giftcard & Bill Payments
                  </p>
                </div>
              ) : (
                <div
                  className={`bg-gradient-green bg-cover p-4 border-2 overflow-hidden rounded-xl border-border-white flex gap-3 items-start justify-around w-full shrink-0`}
                  aria-hidden="true"
                >
                  <div className="w-24 aspect-[1/0.5]">
                    <img
                      src={cryptoLight}
                      alt="Crypto currencies"
                      className="size-full object-contain object-top"
                    />
                  </div>

                  <p className="font-bold leading-[124%] -tracking-[1.2%] text-lg text-neutral-50">
                    SELL & GAIN up to ₦50 on every $ Crypto Trade
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  role="alert"
                >
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Email */}
              <div className="border border-[#E1E1E2] focus-within:border-zabira-blue rounded-lg p-4">
                <label
                  htmlFor="signup-email"
                  className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]"
                >
                  Email
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="size-6 min-w-6 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <IconEmail stroke={user.email ? "#0044EE" : "#819099"} />
                  </div>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Type your email"
                    autoFocus={true}
                    autoComplete="email"
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-text-tertiary w-full"
                  />
                </div>
              </div>
              {/* Password */}
              <div className=" border border-[#E1E1E2] focus-within:border-zabira-blue rounded-lg p-4">
                <label
                  htmlFor="signup-password"
                  className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]"
                >
                  Password
                </label>
                <div className="relative flex items-center gap-2 mt-2 ">
                  <div className="absolute h-full aspect-square right-0">
                    <button
                      type="button"
                      onClick={showPassword}
                      className="size-full flex items-center justify-center"
                      aria-label={
                        user.showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {user.showPassword ? <EyeDisable /> : <Eye />}
                    </button>
                  </div>
                  <div
                    className="size-6 min-w-6 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <IconPassword
                      stroke={user.password ? "#0044EE" : "#819099"}
                    />
                  </div>
                  <input
                    name="password"
                    id="signup-password"
                    type={user.showPassword ? "text" : "password"}
                    value={user.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    className="outline-none leading-[140%] -tracking-[1%]   placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-text-tertiary w-full"
                  />
                </div>
              </div>
              {/* Password Validator */}
              {user.password && (
                <div
                  className="space-y-3"
                  role="status"
                  aria-label="Password strength indicator"
                >
                  <div className="flex gap-4 items-center bg-neutral-150 rounded-lg py-1 px-3">
                    <p>
                      {strengthIndicatorText[user.passwordStrength - 1] ??
                        "Weak"}
                    </p>
                    <div className="flex w-full items-center gap-2">
                      {[1, 2, 3, 4]
                        .slice(0, user.passwordStrength)
                        .map((level) => {
                          return (
                            <div
                              key={level}
                              className={`h-1 ${
                                user.passwordStrength === 1 && "bg-[#DC2828]"
                              } ${
                                user.passwordStrength === 2 && "bg-[#E7B008]"
                              }  ${
                                user.passwordStrength > 2 && "bg-[#16A249]"
                              } rounded-sm w-full`}
                            ></div>
                          );
                        })}
                      {[1, 2, 3, 4]
                        .slice(user.passwordStrength)
                        .map((level) => {
                          return (
                            <div
                              key={level}
                              className={`h-1 bg-border-default rounded-sm w-full`}
                            ></div>
                          );
                        })}
                    </div>
                  </div>
                  {PASSWORD_VISUALS.map((visual) => {
                    return (
                      <div
                        key={visual.label}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="size-4 min-w-4  rounded-full overflow-hidden"
                          aria-hidden="true"
                        >
                          {visual.label
                            .split("|")
                            .some((item) =>
                              user.failedPasswordMatches.includes(item)
                            ) ? (
                            <IconFailedPasswordMatch />
                          ) : (
                            <IconCorrectPasswordMatch />
                          )}
                        </div>
                        <p
                          className={`leading-[124%] -tracking-[1.2%] text-sm text-text-primary ${
                            visual.label
                              .split("|")
                              .some((item) =>
                                user.failedPasswordMatches.includes(item)
                              )
                              ? "text-error"
                              : "text-text-muted"
                          }`}
                        >
                          {visual.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Referral */}
              <div className="border border-[#E1E1E2] focus-within:border-zabira-blue rounded-lg p-4">
                <label
                  htmlFor="referral-code"
                  className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]"
                >
                  Referral Code (Optional)
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="size-6 min-w-6 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <IconReferralCode
                      stroke={user.referralCode ? "#0044EE" : "#819099"}
                    />
                  </div>
                  <input
                    id="referral-code"
                    name="referralCode"
                    value={user.referralCode}
                    onChange={handleInputChange}
                    placeholder="Enter referral code"
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-text-tertiary w-full"
                  />
                </div>
              </div>
              {/* Accept Terms */}
              <div className="flex items-start gap-3">
                <div className="">
                  <button
                    type="button"
                    onClick={acceptTerms}
                    className={`${
                      user.acceptTerms
                        ? "bg-zabira-blue border-zabira-blue"
                        : "bg-transparent border-text-tertiary"
                    } size-5 min-w-5 border-2 rounded-md`}
                    aria-label={
                      user.acceptTerms ? "Terms accepted" : "Accept terms"
                    }
                    aria-pressed={user.acceptTerms}
                    role="checkbox"
                    aria-checked={user.acceptTerms}
                  >
                    {user.acceptTerms && (
                      <IconCorrectPasswordMatch rectFill="#0044ee" />
                    )}
                  </button>
                </div>

                <p className="leading-[140%] -tracking-[1%] text-sm text-text-primary">
                  By clicking 'Sign Up', I agree to Zabira's{" "}
                  <button
                    type="button"
                    className="font-medium text-zabira-blue hover:underline"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="font-medium text-zabira-blue hover:underline"
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>
            {/* section 2 */}
            <div className="space-y-5">
              <div>
                <button
                  type="submit"
                  disabled={!enableSignupBtn}
                  className="h-11 w-full flex items-center gap-2 justify-center custom-button text-white rounded-md font-medium transition-colors disabled:bg-[#F4F4F5] disabled:text-[#1A1A1A2E] disabled:cursor-not-allowed"
                >
                  {enableSignupBtn && <IconShield />}
                  Sign Up
                </button>
              </div>
              <p className="text-center leading-[124%] -tracking-[1.2%] text-text-secondary">
                Or continue with
              </p>

              <div className="flex w-full items-center justify-between gap-6">
                <div className="w-full">
                  <button
                    type="button"
                    className="h-11 w-full bg-bg-card-secondary hover:bg-bg-hover-dark border border-border-default rounded-md flex items-center justify-center gap-2"
                    aria-label="Sign up with Google"
                  >
                    <div
                      className="size-6 min-w-6 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <IconGoogle />
                    </div>
                    <span className="font-semibold leading-[124%] text-base text-text-primary">
                      Google
                    </span>
                  </button>
                </div>
                <div className="w-full">
                  <button
                    type="button"
                    className="h-11 w-full custom-button border border-[#1A1A1A1F] rounded-md flex items-center justify-center gap-2"
                    aria-label="Sign up with Apple"
                  >
                    <div
                      className="size-6 min-w-6 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <IconApple />
                    </div>
                    <span className="font-semibold leading-[124%] text-base text-neutral-50">
                      Apple
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/* outer form */}
          <div className="flex flex-col items-center gap-6">
            <p className="font-medium leading-[124%] -tracking-[1.2%] text-text-primary text-center">
              Already have an account?{" "}
              <button
                type="button"
                className="text-zabira-blue cursor-pointer hover:underline"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </button>
            </p>
            <div className="bg-bg-card p-2 flex items-center rounded-md gap-1">
              <div
                className="size-5 min-w-5 flex items-center justify-center"
                aria-hidden="true"
              >
                <IconNDPR />
              </div>
              <p className="font-medium text-sm leading-[124%] -tracking-[1.2%] text-text-secondary">
                NDPR Compliant
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
