import { useNavigate, useLocation } from "react-router-dom";
import { navigationItems } from "../data";
import logo from "../assets/logo.png";
import qrCode from "../assets/qr-code.png";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="h-screen overflow-y-auto no-scrollbar flex flex-col bg-white px-4 py-6 border-r border-[#EDEDED]">
      <button
        onClick={() => handleNavigation("dashboard")}
        className="cursor-pointer"
      >
        <h1>
          <img src={logo} alt="zabira" />
        </h1>
      </button>

      {/* Navigation Items */}
      <nav className="flex-1 mb-5 mt-9">
        <ul className="space-y-0.5 flex flex-col h-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="last:mt-auto">
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${
                    isActive(item.id)
                      ? "bg-[#EBF0FF] text-[#0044EE]"
                      : "text-[#1A1A1A5C] hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl">
                    <Icon />
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className=" bg-[url('./assets/CardRow.png')] bg-[#0044EE] bg-no-repeat bg-cover rounded-lg mb-5 text-white text-center">
        <h3 className="text-xs font-semibold mb-2 mt-14">REFER & EARN</h3>
        <p className="text-sm font-bold mb-3">Start Earning Rewards!</p>
      </div>

      <div className="px-6">
        <h5 className="text-sm font-semibold text-zabira text-[#819099] mb-3">
          Download the Zabira App
        </h5>

        <img src={qrCode} alt="Download zabira QR Code" className=" mx-auto" />
      </div>

      {/* Footer */}
      <div className="px-6 mt-3">
        <p className="font-semibold text-zabira text-sm mb-2 text-[#1A1A1AB2]">
          Zabira Technologies
        </p>
        <p className="text-zabira text-sm text-[#1A1A1A5C]">
          © 2027 All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Navigation;
