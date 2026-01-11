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
import cryptoLight from "../assets/crypto-light.png";
import IconZabira2 from "../icons/IconZabira2";
import IconCheckRates from "../icons/IconCheckRates";
import IconGetHelp from "../icons/IconGetHelp";
import IconEmail from "../icons/IconEmail";
import IconPassword from "../icons/IconPassword";
import IconReferralCode from "../icons/IconReferralCode";
import IconGoogle from "../icons/IconGoogle";
import IconApple from "../icons/IconApple";
import IconNDPR from "../icons/IconNDPR";
import IconCheckmark from "../icons/IconCheckmark";
import IconFailedPasswordMatch from "../icons/IconFailedPasswordMatch";
import IconCorrectPasswordMatch from "../icons/IconCorrectPasswordMatch";
import Eye from "../icons/IconEye";
import EyeDisable from "../icons/IconEyeDisable";
import IconShield from "../icons/IconShield";
import IconRocket from "../icons/IconRocket";
import { Outlet } from "react-router-dom";

const asideBannerMainText =
  "font-extrabold text-2xl leading-[124%] -tracking-[1.2%] relative z-10 text-white";
const asideBannerSubText =
  "font-light text-xl leading-[140%] -tracking-[1%] text-text-white-secondary relative z-10";

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
        <div className="w-full h-[70%] bg-overlay-darker rounded-xl flex items-center justify-center px-9">
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
  acceptTerms: boolean;
  showPassword: boolean;
}

function AuthLayout() {
  const navigate = useNavigate();
  const { setUser: saveUserToContext } = useApp();
  const [backgroundProgress, setBackgroundProgress] = useState(0);
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
    navigate("/dashboard");
  }

  return (
    <div className="bg-bg-app h-screen w-full p-4 flex gap-4 overflow-auto">
      <aside
        className="h-full overflow-hidden w-[30%] max-w-md sticky top-0 rounded-2xl bg-linear-to-b from-primary-blue-darker to-neutral-950"
        aria-label="Zabira features showcase"
      >
        <div className="absolute h-full w-full">
          {BG_STORE[backgroundProgress]}
        </div>

        <div className="relative p-7 h-full flex flex-col justify-between">
          <div>
            <IconZabira2 width="90" />
          </div>
          <ProgressBar
            tabsLength={BG_STORE.length}
            backgroundProgress={backgroundProgress}
          />
        </div>
      </aside>
      <main className="relative h-full w-full flex items-center justify-center">
        <div className="absolute top-0 right-0 w-full flex justify-end z-10">
          <nav className="flex" aria-label="Quick actions">
            <button
              className="text-[#1A1A1A] font-medium flex items-center gap-1 bg-white pl-4 pr-3 rounded-l-[50px] border border-[#E1E1E2] h-9 hover:bg-[#F4F4F5] transition-colors"
              aria-label="Check exchange rates"
            >
              <div
                className="size-5 min-w-5 flex items-center justify-center"
                aria-hidden="true"
              >
                <IconCheckRates />
              </div>
              <span>Check Rates</span>
            </button>
            <a
              href="mailto:hello@ayoosota.com"
              className="text-[#1A1A1A] font-medium flex items-center gap-1 bg-white p-3 rounded-r-[50px] border border-[#E1E1E2] border-l-transparent h-9 hover:bg-[#F4F4F5] transition-colors"
              aria-label="Get help and support"
            >
              <div
                className="size-5 min-w-5 flex items-center justify-center"
                aria-hidden="true"
              >
                <IconGetHelp />
              </div>
              <span>Get Help</span>
            </a>
          </nav>
        </div>

        <Outlet />

        <footer className="absolute bottom-0 w-full px-4 text-text-secondary font-medium text-sm leading-4 flex items-center justify-between">
          <p>&#169; Zabira, {new Date().getFullYear()}</p>
          <nav className="flex gap-9 items-center" aria-label="Legal">
            <button type="button" className="hover:underline">
              Privacy Policy
            </button>
            <button type="button" className="hover:underline">
              Terms of Service
            </button>
          </nav>
        </footer>
      </main>
    </div>
  );
}

export default AuthLayout;
