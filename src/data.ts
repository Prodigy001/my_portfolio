import FlagGhana from "./icons/FlagGhana";
import FlagKenya from "./icons/FlagKenya";
import FlagNgn from "./icons/FlagNgn";
import FlagUSA from "./icons/FlagUSA";
import BitcoinIcon from "./assets/bitcoin.png";
import AmazonIcon from "./assets/amazon.png";
import EthereumIcon from "./assets/ethereum.png";
import SpotifyIcon from "./assets/spotify.png";
import TetherIcon from "./assets/usdt.png";
import IconGift from "./icons/IconGift";
import IconBitcoin from "./icons/IconBitcoin";
import IconPhone from "./icons/IconPhone";
import IconLink from "./icons/IconLink";
import IconCalculator from "./icons/IconCalculator";
import IconBall from "./icons/IconBall";
import IconHome from "./icons/IconHome";
import IconSettings from "./icons/IconSettings";
import IconWallet from "./icons/IconWallet";
import IconList from "./icons/IconList";
import IconMedal from "./icons/IconMedal";
import IconEye from "./icons/IconEye";
import IconFile from "./icons/IconFile";
import IconShield from "./icons/IconBell";
import IconEnvelop from "./icons/IconEnvelop";
import IconVerifyPhone from "./icons/IconVerifyPhone";
import IconCustomer from "./icons/IconCustomer";
import IconCustomerUpgrade from "./icons/IconCustomerUpgrade";
import Icon2fa from "./icons/Icon2fa";
import IconPaperPlane from "./icons/IconPaperPlane";

const currencies = [
  {
    code: "USD",
    name: "United States Dollar",
    symbol: "$",
    flag: FlagUSA,
  },
  {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
    flag: FlagNgn,
  },
  {
    code: "GHC",
    name: "Ghanaian Cedi",
    symbol: "₵",
    flag: FlagGhana,
  },
  {
    code: "KES",
    name: "Kenyan Shilling",
    symbol: "KSh",
    flag: FlagKenya,
  },
];

const exchangeRates: Record<string, number> = {
  USD: 1,
  NGN: 1650,
  GHC: 15.5,
  KES: 130,
};

const tradedAssets = [
  {
    id: "BTC",
    name: "Bitcoin",
    code: "BTC",
    icon: BitcoinIcon,
    change: 0.54,
    isPositive: true,
  },
  {
    id: "AMZN",
    name: "Amazon Gift Card",
    code: "AMZN",
    icon: AmazonIcon,
    change: 6.88,
    isPositive: true,
  },
  {
    id: "ETH",
    name: "Ethereum",
    code: "ETH",
    icon: EthereumIcon,
    change: -12.09,
    isPositive: false,
  },
  {
    id: "SPOTIFY",
    name: "Spotify Premium",
    code: "SPOTIFY",
    icon: SpotifyIcon,
    change: 6.88,
    isPositive: true,
  },
  {
    id: "USDT",
    name: "Tether",
    code: "USDT",
    icon: TetherIcon,
    change: 6.88,
    isPositive: true,
  },
];

const paymentMethods = [
  {
    id: "giftcard",
    name: "Giftcard",
    description: "Trade giftcards easily and fast.",
    icon: IconGift,
    color: "#07B4D3",
  },
  {
    id: "crypto",
    name: "Crypto",
    description: "Quickly trade cryptocurrencies",
    icon: IconBitcoin,
    color: "#F67416",
  },
  {
    id: "paybills",
    name: "Pay Bills",
    description: "Airtime, data, cable, betting, electricity.",
    icon: IconPhone,
    color: "#E7B008",
  },
  {
    id: "paylink",
    name: "Pay Link",
    description: "Get paid in seconds with payment links.",
    icon: IconLink,
    color: "#7BC111",
  },
  {
    id: "rates",
    name: "Rates",
    description: "Check current rates in realtime.",
    icon: IconCalculator,
    color: "#A855F7",
  },
  {
    id: "betting",
    name: "Betting",
    description: "Fund betting accounts fast.",
    icon: IconBall,
    color: "#6B6EF8",
  },
];

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: IconHome,
    isActive: true,
  },
  {
    id: "giftcard",
    label: "Giftcard",
    icon: IconGift,
    isActive: false,
  },
  {
    id: "billpayment",
    label: "Bill Payment",
    icon: IconPhone,
    isActive: false,
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: IconWallet,
    isActive: false,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: IconList,
    isActive: false,
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: IconMedal,
    isActive: false,
  },
  {
    id: "settings",
    label: "Settings",
    icon: IconSettings,
    isActive: false,
  },
];

const transactions = [
  {
    id: 1,
    channel: "Giftcard Sell",
    type: "Deposit",
    typeIcon: "↓",
    isPositive: true,
    amount: "1,500.00",
    amountCurrency: "NGN",
    fee: "0.00",
    feeCurrency: "USDT",
    total: "1,500.00",
    totalCurrency: "NGN",
    referenceId: "2027348563858235937...",
    status: "Success",
    date: "Nov 5, 2027",
    time: "03:34:52 PM",
  },
  {
    id: 2,
    channel: "Crypto Sell",
    type: "Withdrawal",
    typeIcon: "↑",
    isPositive: false,
    amount: "0.00",
    amountCurrency: "BTC",
    fee: "0.00",
    feeCurrency: "BTC",
    total: "0.00",
    totalCurrency: "BTC",
    referenceId: "2027348563858235937...",
    status: "Pending",
    date: "Sept 29, 2027",
    time: "03:34:52 PM",
  },
  {
    id: 3,
    channel: "Airtime",
    type: "Withdrawal",
    typeIcon: "↑",
    isPositive: false,
    amount: "0.00",
    amountCurrency: "ETH",
    fee: "0.00",
    feeCurrency: "BTC",
    total: "0.00",
    totalCurrency: "ETH",
    referenceId: "2027348563858235937...",
    status: "Success",
    date: "Sept 10, 2027",
    time: "03:34:52 PM",
  },
  {
    id: 4,
    channel: "Data",
    type: "Deposit",
    typeIcon: "↓",
    isPositive: true,
    amount: "0.00",
    amountCurrency: "USD",
    fee: "0.00",
    feeCurrency: "USD",
    total: "0.00",
    totalCurrency: "USD",
    referenceId: "2027348563858235937...",
    status: "Success",
    date: "Sept 6, 2027",
    time: "03:34:52 PM",
  },
  {
    id: 5,
    channel: "Fiat",
    type: "Withdrawal",
    typeIcon: "↑",
    isPositive: false,
    amount: "3,000.00",
    amountCurrency: "NGN",
    fee: "0.00",
    feeCurrency: "BTC",
    total: "3,000.00",
    totalCurrency: "NGN",
    referenceId: "2027348563858235937...",
    status: "Cancelled",
    date: "Aug 8, 2027",
    time: "03:34:52 PM",
  },
];

const onboardingSteps = [
  {
    id: "verify-email",
    title: "Verify your email",
    description: "Confirm your email address to secure your account.",
    icon: IconEnvelop,
    duration: "2 minutes",
    completed: true,
  },
  {
    id: "verify-phone",
    title: "Verify phone number",
    description: "Add a phone number for account recovery.",
    icon: IconVerifyPhone,
    duration: "2 minutes",
    completed: false,
  },
  {
    id: "personal-info",
    title: "Update personal information",
    description: "Complete your profile with personal details.",
    icon: IconCustomer,
    duration: "2 minutes",
    completed: false,
  },
  {
    id: "upgrade-kyc",
    title: "Upgrade KYC",
    description: "Verify your identity to increase transaction limits.",
    icon: IconCustomerUpgrade,
    duration: "2 minutes",
    completed: false,
  },
  {
    id: "enable-2fa",
    title: "Enable 2FA",
    description: "Add an extra layer of security to your account.",
    icon: Icon2fa,
    duration: "2 minutes",
    completed: false,
  },
  {
    id: "first-transaction",
    title: "Make your first transaction",
    description: "Start trading to experience our platform.",
    icon: IconPaperPlane,
    duration: "2 minutes",
    completed: false,
  },
];

export {
  currencies,
  tradedAssets,
  paymentMethods,
  transactions,
  navigationItems,
  exchangeRates,
  onboardingSteps,
};
