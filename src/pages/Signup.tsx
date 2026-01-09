import { useEffect, useState } from "react";
import IconZabira from "../icons/IconZabira";
import altCoins from "../assets/alt_coins.png";
import africaMap from "../assets/africa_map.png";
import bgTwo from "../assets/bg_two.png";
import bgThree from "../assets/bg_three.png";
import bgFour from "../assets/bg_four.png";
import bgFive from "../assets/bg_five.png";

const asideBannerMainText =
  "font-extrabold text-2xl leading-[124%] -tracking-[1.2%] relative z-10";
const asideBannerSubText =
  "font-light text-xl leading-[140%] -tracking-[1%] text-[#FFFFFFB2]";

interface ProgressBarProps {
  tabsLength?: number;
  backgroundProgress: number;
}

function ProgressBar({ tabsLength = 5, backgroundProgress }: ProgressBarProps) {
  return (
    <ul className="flex gap-1 items-center">
      {Array(tabsLength)
        .fill(0)
        .map((_, idx) => {
          return (
            <li
              key={idx}
              className={`h-1 w-4 rounded-sm ${
                idx === backgroundProgress ? "active_tab" : "dormant_tab"
              }`}
            ></li>
          );
        })}
    </ul>
  );
}

function BgOne() {
  return (
    <div className="h-full flex flex-col justify-between fade_In">
      <div className="relative h-[60%]">
        <img
          alt="alt coins"
          src={altCoins}
          className="size-full object-cover object-bottom"
        />
      </div>
      <div className="pb-14 px-7">
        <h2 className={asideBannerMainText}>
          Easily Buy & Sell Cryptocurrencies, Giftcards & Pay Bills
        </h2>
        <p className={asideBannerSubText}>
          Manage your assets and portfolio easily!
        </p>
      </div>
    </div>
  );
}

function BgTwo() {
  return (
    <div className="relative h-full flex flex-col justify-between fade_In">
      <div className="absolute size-full px-7 pt-20">
        <div className="w-full h-[70%] bg-[#00102680] rounded-xl flex items-center justify-center px-9">
          <div className="relative w-full aspect-square">
            <img
              alt="Vector Illustration of a man looking at his alt coins wallet portfolio"
              src={bgTwo}
              className="size-full object-cover object-bottom"
            />
          </div>
        </div>
      </div>
      <div className="relative h-[40%]">
        <img
          alt="alt coins"
          src={africaMap}
          className="size-full object-cover object-bottom"
        />
      </div>
      <div className="pb-14 px-7">
        <h2 className={asideBannerMainText}>Trade Cryptocurrencies</h2>
        <p className={asideBannerSubText}>
          Easy way to buy, sell, convert and store cryptocurrencies
        </p>
      </div>
    </div>
  );
}

function BgThree() {
  return (
    <div className="relative h-full flex flex-col justify-between fade_In">
      <div className="absolute size-full px-7 pt-20">
        <div className="w-full h-[70%] bg-[#00102680] rounded-xl flex items-center justify-center px-9">
          <div className="relative w-full aspect-square">
            <img
              alt="Vector Illustration of a man thinking of different bills he has to pay"
              src={bgThree}
              className="size-full object-cover object-bottom"
            />
          </div>
        </div>
      </div>
      <div className="relative h-[40%]">
        <img
          alt="Africa Vector Map"
          src={africaMap}
          className="size-full object-cover object-bottom"
        />
      </div>
      <div className="pb-14 px-7">
        <h2 className={asideBannerMainText}>Pay Bills</h2>
        <p className={asideBannerSubText}>
          Instantly pay all your bills and make payments all over the world
        </p>
      </div>
    </div>
  );
}

function BgFour() {
  return (
    <div className="relative h-full flex flex-col justify-between fade_In">
      <div className="absolute size-full px-7 pt-20">
        <div className="w-full h-[70%] bg-[#00102680] rounded-xl flex items-center justify-center px-9">
          <div className="relative w-full aspect-square">
            <img
              alt="Vector Illustration of a lady looking at her giftcard"
              src={bgFour}
              className="size-full object-cover object-bottom"
            />
          </div>
        </div>
      </div>
      <div className="relative h-[40%]">
        <img
          alt="Africa Vector Map"
          src={africaMap}
          className="size-full object-cover object-bottom"
        />
      </div>
      <div className="pb-14 px-7">
        <h2 className={asideBannerMainText}>Trade Giftcards</h2>
        <p className={asideBannerSubText}>
          Trade giftcards with Bitcoin, Ether, Tether, and more.
        </p>
      </div>
    </div>
  );
}

function BgFive() {
  return (
    <div className="relative h-full flex flex-col justify-between fade_In">
      <div className="absolute size-full px-7 pt-20">
        <div className="w-full h-[70%] bg-[#00102680] rounded-xl flex items-center justify-center px-9">
          <div className="relative w-full aspect-square">
            <img
              alt="Vector Illustration of a customer support lady"
              src={bgFive}
              className="size-full object-cover object-bottom"
            />
          </div>
        </div>
      </div>
      <div className="relative h-[40%]">
        <img
          alt="Africa Vector Map"
          src={africaMap}
          className="size-full object-cover object-bottom"
        />
      </div>
      <div className="pb-14 px-7">
        <h2 className={asideBannerMainText}>Customer Support</h2>
        <p className={asideBannerSubText}>
          We provide excellent customer support to ensure seamless experience
        </p>
      </div>
    </div>
  );
}

interface UserState {
  email: string;
  password: string;
  referralCode: string;
  failedPasswordMatches: string[];
  passwordStrength: number;
}

function Signup() {
  const [backgroundProgress, setBackgroundProgress] = useState(0);
  const [user, setUser] = useState<UserState>({
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
  });
  const BG_STORE = [<BgOne />, <BgTwo />, <BgThree />, <BgFour />, <BgFive />];
  const strengthIndicatorText = ["Weak", "Average", "Good", "Strong"];
  const bgStoreLength = BG_STORE.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundProgress((prev) =>
        prev === bgStoreLength - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, [bgStoreLength]);

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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    let failedMatches: string[] = [];
    let strength = 0;
    if (name === "password") {
      for (const validator in PASSWORD_VALIDATOR) {
        failedMatches.push(PASSWORD_VALIDATOR[validator](value));
      }
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

    setUser({
      ...user,
      [name]: value,
      failedPasswordMatches: failedMatches,
      passwordStrength: strength,
    });
  }

  return (
    <div className="bg-[#F4F4F5] h-screen w-full p-4 flex gap-4 overflow-auto">
      <aside className=" h-full overflow-hidden w-[30%] max-w-md sticky top-0 rounded-2xl bg-gradient-to-b from-[#003B8D] to-[#000000]">
        <div className="absolute h-full w-full">
          {BG_STORE[backgroundProgress]}
        </div>

        <div className="relative p-7 h-full flex flex-col justify-between">
          <div>
            <IconZabira width="90" />
          </div>
          <ProgressBar
            tabsLength={BG_STORE.length}
            backgroundProgress={backgroundProgress}
          />
        </div>
      </aside>
      <main className="relative h-full w-full flex items-center justify-center">
        <div className="absolute top-0 right-0 w-full flex justify-end">
          <nav className="flex">
            <div className="text-[#1A1A1A] font-medium flex items-center gap-2 bg-white pl-4 pr-3 rounded-l-[50px] border border-[#E1E1E2] h-9">
              <div className="size-5 bg-red-500"></div>
              <p>Check Rates</p>
            </div>
            <div className="text-[#1A1A1A] font-medium flex items-center gap-2 bg-white p-3 rounded-r-[50px] border border-[#E1E1E2] border-l-transparent h-9">
              <div className="size-5 bg-red-500"></div>
              <p>Get Help</p>
            </div>
          </nav>
        </div>
        <div className=" max-h-[80vh] max-w-2xl overflow-auto no-scrollbar space-y-6">
          {/* inner form */}
          <div className=" text-black p-9 rounded-2xl bg-white shadow-[0px_2px_4px_-1px_#FFFFFF14,0px_1px_0px_0px_#FFFFFF14] space-y-6">
            {/* section 1 */}
            <div className="space-y-6">
              <h1 className="font-bold leading-[124%] -tracking-[1.2%] text-2xl text-[#1A1A1A]">
                Create an account in 2 minutes!
              </h1>
              <div className="h-20 w-full rounded-xl border-2 border-[#FFFFFF2E] bg-[linear-gradient(67.36deg,#3F9906_-90.03%,#C3BC02_-7.9%,#4B9C06_52.41%,#FFCC00_153.78%)]"></div>

              {/* Email */}
              <div className="border border-[#E1E1E2] rounded-lg p-4">
                <label className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]">
                  Email
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-5 bg-black"></div>
                  <input
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Type your email"
                    autoFocus={true}
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C]"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="border border-[#E1E1E2] rounded-lg p-4">
                <label className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]">
                  Password
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-5 bg-black"></div>
                  <input
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="outline-none leading-[140%] -tracking-[1%]   placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C]"
                  />
                </div>
              </div>
              {/* Password Validator */}
              <div className="space-y-3">
                <div className="flex gap-4 items-center bg-[#F9F9FB] rounded-lg py-1 px-3">
                  <p>{strengthIndicatorText[user.passwordStrength - 1]}</p>
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
                    {[1, 2, 3, 4].slice(user.passwordStrength).map((level) => {
                      return (
                        <div
                          key={level}
                          className={`h-1 bg-[#E1E1E2] rounded-sm w-full`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                {PASSWORD_VISUALS.map((visual) => {
                  return (
                    <div key={visual.label} className="flex items-center gap-3">
                      <div
                        className={`size-4 ${
                          visual.label
                            .split("|")
                            .some((item) =>
                              user.failedPasswordMatches.includes(item)
                            )
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <p className="leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1A]">
                        {visual.text}
                      </p>
                    </div>
                  );
                })}
              </div>
              {/* Referral */}
              <div className="border border-[#E1E1E2] rounded-lg p-4">
                <label className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]">
                  Referral Code (Optional)
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-5 bg-black"></div>
                  <input
                    name="referralCode"
                    value={user.referralCode}
                    onChange={handleInputChange}
                    placeholder="Enter referral code"
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C]"
                  />
                </div>
              </div>
              {/* Accept Terms */}
              <div className="flex items-start gap-3">
                <div className="size-5 min-w-5 border-2 border-[#1A1A1A5C] rounded-md"></div>

                <p className="leading-[140%] -tracking-[1%] text-sm text-[#1A1A1A]">
                  By clicking 'Sign Up', I agree to Zabira's{" "}
                  <span className="font-medium text-[#0044ee]">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-[#0044ee]">
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
            {/* section 2 */}
            <div className="space-y-5">
              <div>
                <button className="h-11 w-full bg-[#F4F4F5] text-[#1A1A1A2E] rounded-md">
                  Sign Up
                </button>
              </div>
              <p className="text-center leading-[124%] -tracking-[1.2%] text-[#1A1A1AB2]">
                Or continue with
              </p>

              <div className="flex w-full items-center justify-between gap-6">
                <div className="w-full">
                  <button className="h-11 w-full bg-[#FCFCFC] border border-[#E1E1E2] rounded-md flex items-center justify-center gap-2">
                    <div className="size-6 bg-black"></div>
                    <p className="font-medium leading-[124%] text-base text-[#1A1A1A]">
                      Google
                    </p>
                  </button>
                </div>
                <div className="w-full">
                  <button className="h-11 w-full bg-[#1A1A1A] border border-[#1A1A1A1F] rounded-md flex items-center justify-center gap-2">
                    <div className="size-6 bg-white"></div>
                    <p className="font-medium leading-[124%] text-base text-white">
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
              Already have an account?{" "}
              <span className=" text-[#0044ee]">Login</span>
            </p>
            <div className="bg-white p-2 flex items-center rounded-md gap-2">
              <div className="size-5 bg-black"></div>
              <p className="font-medium text-sm leading-[124%] -tracking-[1.2%] text-[#1A1A1AB2]">
                NDPR Compliant
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full bg-ed-50 px-4 text-[#1A1A1AB2] font-medium text-sm leading-4 flex items-center justify-between">
          <p>&#169; Zabira, {new Date().getFullYear()}</p>
          <nav className="flex gap-9 items-center">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </nav>
        </div>
      </main>
    </div>
  );
}

export default Signup;
