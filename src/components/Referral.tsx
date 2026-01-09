import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import IconArrow from "../icons/IconArrow";
import IconCopy from "../icons/IconCopy";
import IconFlatCoins from "../icons/IconFlatCoins";

const Referral = () => {
  const { user } = useApp();
  const [copied, setCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const generateReferralCode = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Generate or retrieve referral code for current user
  const [referralCode, setReferralCode] = useState<string>(() => {
    if (!user?.email) return "";

    const storageKey = `referral_code_${user.email}`;
    const existingCode = localStorage.getItem(storageKey);

    if (existingCode) {
      return existingCode;
    } else {
      // Generate random referral code
      const newCode = generateReferralCode();
      localStorage.setItem(storageKey, newCode);
      return newCode;
    }
  });

  const handleCopyReferralCode = async () => {
    if (!referralCode || isDisabled) return;

    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setIsDisabled(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setIsDisabled(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy referral code:", error);
    }
  };

  return (
    <div className="bg-[#EBF0FF] shadow-[0px_1.25px_4px_0px_rgba(26,26,26,0.08)] overflow-hidden rounded-xl">
      <header className="flex items-center justify-between gap-4 p-4 bg-[#7099FF]">
        <h4 className="flex items-center gap-1.5">
          <IconFlatCoins /> Refer and Earn
        </h4>

        <button
          onClick={handleCopyReferralCode}
          disabled={isDisabled}
          className={`inline-flex items-center text-white gap-1.5 px-3 py-0.5 border border-zabira-dark/12  rounded-[50px] text-sm leading-5.5 font-semibold shadow-[0px_1px_2px_0px_rgba(26,26,26,0.08)] transition-all ${
            isDisabled
              ? "bg-zabira-dark/40 cursor-not-allowed"
              : "bg-zabira-dark/26 hover:bg-zabira-dark/35"
          }`}
        >
          {copied ? "Copied!" : "Referral Code"}
          <IconCopy />
        </button>
      </header>

      <div className="p-4">
        <p className="text-zabira text-lg font-medium text-zabira-dark/70 mb-6">
          Invite 10 people and get 100 points to use in amazing rewards! T&C
          Apply.
        </p>

        <Link
          to="/dashboard/rewards"
          className="custom-button w-full inline-flex items-center justify-center gap-2"
        >
          Invite your friends
          <span className="-rotate-135 text-2xl">
            <IconArrow />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Referral;
