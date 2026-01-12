import { useNavigate, useLocation } from "react-router-dom";
import { navigationItems } from "../data";
import { useApp } from "../context/AppContext";
import logo from "../assets/logo.png";
import qrCode from "../assets/qr-code.png";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSidebarOpen } = useApp();

  const handleNavigation = (id: string) => {
    const pathMap: Record<string, string> = {
      dashboard: "/dashboard",
      giftcard: "/dashboard/giftcard",
      billpayment: "/dashboard/bill-payment",
      wallet: "/dashboard/wallet",
      transactions: "/dashboard/transactions",
      rewards: "/dashboard/rewards",
      settings: "/dashboard/settings",
    };
    navigate(pathMap[id]);
  };

  const isActive = (id: string): boolean => {
    const pathMap: Record<string, string> = {
      dashboard: "/dashboard",
      giftcard: "/dashboard/giftcard",
      billpayment: "/dashboard/bill-payment",
      wallet: "/dashboard/wallet",
      transactions: "/dashboard/transactions",
      rewards: "/dashboard/rewards",
      settings: "/dashboard/settings",
    };
    return location.pathname === pathMap[id];
  };

  return (
    <div className="h-screen overflow-y-auto no-scrollbar flex flex-col bg-bg-card px-4 py-6 border-r border-border-light">
      <div className="flex items-center justify-between">
        <button
          onClick={() => handleNavigation("dashboard")}
          className="hover:opacity-80 transition-opacity"
          aria-label="Go to dashboard home"
        >
          <h1>
            <img src={logo} alt="Zabira - Your trusted payment platform" />
          </h1>
        </button>
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-2 hover:bg-neutral-200 rounded-md transition-colors"
          aria-label="Close navigation menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 mb-5 mt-9" aria-label="Main navigation">
        <ul className="space-y-0.5 flex flex-col h-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="last:mt-auto">
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${
                    isActive(item.id)
                      ? "bg-primary-light text-primary"
                      : "text-text-tertiary hover:bg-neutral-200"
                  }`}
                  aria-current={isActive(item.id) ? "page" : undefined}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <span className="text-xl" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <section
        className="bg-[url('./assets/CardRow.png')] bg-primary bg-no-repeat bg-cover rounded-lg mb-5 text-neutral-50 text-center"
        aria-label="Referral program"
      >
        <h3 className="text-xs font-semibold mb-2 mt-14">REFER & EARN</h3>
        <p className="text-sm font-bold mb-3">Start Earning Rewards!</p>
      </section>

      <section className="px-6" aria-label="Download app">
        <h5 className="text-sm font-semibold text-zabira text-text-muted mb-3">
          Download the Zabira App
        </h5>

        <img
          src={qrCode}
          alt="QR Code to download Zabira mobile app"
          className="mx-auto"
        />
      </section>

      {/* Footer */}
      <footer className="px-6 mt-3">
        <p className="font-semibold text-zabira text-sm mb-2 text-text-secondary">
          Zabira Technologies
        </p>
        <p className="text-zabira text-sm text-text-tertiary">
          © 2027 All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Navigation;
