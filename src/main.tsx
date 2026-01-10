import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import Splash from "./pages/Splash.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Home from "./pages/Home.tsx";
import Giftcard from "./pages/Giftcard.tsx";
import BillPayment from "./pages/BillPayment.tsx";
import Wallet from "./pages/Wallet.tsx";
import Transactions from "./pages/Transactions.tsx";
import Rewards from "./pages/Rewards.tsx";
import Settings from "./pages/Settings.tsx";
import AuthLayout from "./pages/AuthLayout.tsx";
import ChangeEmail from "./pages/ChangeEmail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Splash />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "sign-up",
            element: <Signup />,
          },
          {
            path: "change-email",
            element: <ChangeEmail />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "verify-email",
            element: <VerifyEmail />,
          },
        ],
      },

      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "giftcard",
            element: <Giftcard />,
          },
          {
            path: "bill-payment",
            element: <BillPayment />,
          },
          {
            path: "wallet",
            element: <Wallet />,
          },
          {
            path: "transactions",
            element: <Transactions />,
          },
          {
            path: "rewards",
            element: <Rewards />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
