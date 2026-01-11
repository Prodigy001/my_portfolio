import IconBell from "../icons/IconBell";
import logoSingle from "../assets/logo-single.png";
import IconHamburger from "../icons/IconHamburger";
import { useApp } from "../context/AppContext";
import IconCheckRates from "../icons/IconCheckRates";
import IconGetHelp from "../icons/IconGetHelp";

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

      <article>
        <h4 className="font-bold text-base text-zabira-dark mb-1">
          Hi <span className="capitalize">{userName}</span> 👋🏽
        </h4>
        <p className="text-text-tertiary font-medium text-zabira text-sm">
          Buy/Sell BTC, ETH. Start trading now on Zabira
        </p>
      </article>

      <div className="flex items-center gap-12">
        <nav className="flex justify-end" aria-label="Quick actions">
          <div className="flex">
            <button 
              className="text-text-primary font-medium flex items-center gap-1 bg-bg-card pl-4 pr-3 rounded-l-[50px] border border-border-default h-9 hover:bg-bg-hover transition-colors"
              aria-label="Check exchange rates"
            >
              <span className="size-5 min-w-5 flex items-center justify-center" aria-hidden="true">
                <IconCheckRates />
              </span>
              <span>Check Rates</span>
            </button>
            <button 
              className="text-text-primary font-medium flex items-center gap-1 bg-bg-card p-3 rounded-r-[50px] border border-border-default border-l-transparent h-9 hover:bg-bg-hover transition-colors"
              aria-label="Get help and support"
            >
              <span className="size-5 min-w-5 flex items-center justify-center" aria-hidden="true">
                <IconGetHelp />
              </span>
              <span>Get Help</span>
            </button>
          </div>
        </nav>
        <button 
          className="p-2 relative bg-bg-card-secondary text-neutral-700 rounded-full transition-colors shadow-[0px_1px_2px_0px_rgba(26,26,26,0.08)] hover:bg-bg-hover"
          aria-label="Notifications - 8 unread"
        >
          <IconBell />

          <div className="flex items-center justify-center w-4 bg-primary h-3.5 rounded-lg absolute top-0 right-0.5 translate-x-1/2 -translate-y-1/2">
            <p className="font-semibold text-[10px] leading-4.5 text-neutral-50">
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
