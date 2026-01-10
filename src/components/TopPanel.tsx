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
      <div className="md:hidden  flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-[#323232] hover:text-zabira-dark transition-colors text-[1.625rem]"
          aria-label="Toggle menu"
        >
          <IconHamburger />
        </button>
        <Link to="/dashboard" className="cursor-pointer">
          <h1>
            <img src={logo} alt="zabira" />
          </h1>
        </Link>
      </div>

      <article className="max-md:hidden">
        <h4 className="font-bold text-base text-zabira-dark mb-1">
          Hi <span className="capitalize">{userName}</span> 👋🏽
        </h4>
        <p className="text-[#1A1A1A5C] font-medium text-zabira text-sm">
          Buy/Sell BTC, ETH. Start trading now on Zabira
        </p>
      </article>

      <div className="flex items-center gap-12 ">
        <div className="max-xl:hidden flex justify-end">
          <nav className="flex">
            <button className="text-[#1A1A1A] font-medium flex items-center gap-1 bg-white pl-4 pr-3 rounded-l-[50px] border border-[#E1E1E2] h-9">
              <div className="size-5 min-w-5 flex items-center justify-center">
                <IconCheckRates />
              </div>
              <p>Check Rates</p>
            </button>
            <a
              href="mailto:hello@ayoosota.com"
              className="text-[#1A1A1A] font-medium flex items-center gap-1 bg-white p-3 rounded-r-[50px] border border-[#E1E1E2] border-l-transparent h-9"
            >
              <div className="size-5 min-w-5 flex items-center justify-center">
                <IconGetHelp />
              </div>
              <p>Get Help</p>
            </a>
          </nav>
        </div>
        <button className="p-2 relative md:bg-[#FCFCFC] hover:bg-[#E1E1E2] text-[#52525B] rounded-full transition-colors md:shadow-[0px_1px_2px_0px_rgba(26,26,26,0.08)]">
          <span className="text-[1.625rem] md:text-xl text-[#52525B]">
            <IconBell />
          </span>

          <div className="flex items-center justify-center w-4 bg-[#00DD77] md:bg-[#0044EE] h-3.5 rounded-lg absolute top-3 right-3 md:top-0 md:right-0.5 translate-x-1/2 -translate-y-1/2">
            <p className="font-semibold text-[.625rem] leading-4.5 text-white">
              8
            </p>
          </div>
        </button>
        <button className="p-1 border border-[#00DD77] rounded-full hover:bg-gray-100 transition-colors ">
          <img src={logoSingle} alt="Zabira logo" />
        </button>
      </div>
    </div>
  );
};

export default TopPanel;
