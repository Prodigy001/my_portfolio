import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconZabira from "../icons/IconZabira";
import { useApp } from "../context/AppContext";
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

interface LoginState {
  email: string;
  password: string;
  error: string;
}

function Login() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [backgroundProgress, setBackgroundProgress] = useState(0);
  const [loginData, setLoginData] = useState<LoginState>({
    email: "",
    password: "",
    error: "",
  });

  const BG_STORE = [<BgOne />, <BgTwo />, <BgThree />, <BgFour />, <BgFive />];
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

      // Simple email check (password verification would be on backend)
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
                Welcome back!
              </h1>
              <div className="h-20 w-full rounded-xl border-2 border-[#FFFFFF2E] bg-[linear-gradient(67.36deg,#3F9906_-90.03%,#C3BC02_-7.9%,#4B9C06_52.41%,#FFCC00_153.78%)]"></div>

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
                  <div className="size-5 bg-black"></div>
                  <input
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    autoFocus={true}
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
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
                    type="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="outline-none leading-[140%] -tracking-[1%]   placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <p className="text-[#0044ee] font-medium text-sm cursor-pointer">
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
              Don't have an account?{" "}
              <span
                className=" text-[#0044ee] cursor-pointer hover:underline"
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </span>
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

export default Login;
