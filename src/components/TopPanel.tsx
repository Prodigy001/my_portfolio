import IconBell from "../icons/IconBell";
import logoSingle from "../assets/logo-single.png";
import IconHamburger from "../icons/IconHamburger";
import { useApp } from "../context/AppContext";
import IconCheckRates from "../icons/IconCheckRates";
import IconGetHelp from "../icons/IconGetHelp";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

interface TopPanelProps {
  onMenuClick?: () => void;
}

const TopPanel = ({ onMenuClick }: TopPanelProps) => {
  const { user } = useApp();
  const userEmail = user?.email || "User";
  const userName = userEmail.split("@")[0];

  return (
    <div className="flex items-center justify-between pl-12 pr-5.5 py-4">
      <button
        onClick={onMenuClick}
        className="md:hidden text-interactive-text hover:text-zabira-dark transition-colors text-[1.625rem]"
        aria-label="Toggle navigation menu"
      >
        <IconHamburger />
      </button>

      <article className="max-md:hidden">
        <h4 className="font-bold text-base text-zabira-dark mb-1">
          Hi <span className="capitalize">{userName}</span> 👋🏽
        </h4>
        <p className="text-text-tertiary font-medium text-sm">
          Buy/Sell BTC, ETH. Start trading now on Zabira
        </p>
      </article>

      <div className="flex items-center gap-12">
        <nav className="max-xl:hidden flex justify-end">
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
        <button
          className="p-2 relative bg-transparent hover:bg-[#E1E1E2] text-neutral-700 rounded-full transition-colors md:shadow-[0px_1px_2px_0px_rgba(26,26,26,0.08)]"
          aria-label="Notifications - 8 unread"
        >
          <span className="text-[1.625rem] md:text-xl text-[#52525B]">
            <IconBell />
          </span>

          <div className="flex items-center justify-center w-4 bg-[#00DD77] md:bg-primary h-3.5 rounded-lg absolute top-3 right-3 md:top-0 md:right-0.5 translate-x-1/2 -translate-y-1/2">
            <p className="font-semibold text-[.625rem] leading-4.5 text-neutral-50">
              8
            </p>
          </div>
        </button>
        <button
          className="p-1 border border-secondary rounded-full hover:bg-neutral-200 transition-colors"
          aria-label="User profile"
        >
          <img src={logoSingle} alt="User avatar" />
        </button>
      </div>
    </div>
  );
};

export default TopPanel;
