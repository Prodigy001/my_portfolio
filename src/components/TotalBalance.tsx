import { useState } from "react";
import IconEyeDisable from "../icons/IconEyeDisable";
import IconEye from "../icons/IconEye";
import { currencies, exchangeRates } from "../data";
import IconFile from "../icons/IconFile";
import IconArrow from "../icons/IconArrow";

const TotalBalance = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeCurrency, setActiveCurrency] = useState("USD");
  const baseAmount = 10254.02; // Base amount in USD

  const convertAmount = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    const amountInUSD = amount / (exchangeRates[fromCurrency] || 1);
    const convertedAmount = amountInUSD * (exchangeRates[toCurrency] || 1);
    return convertedAmount.toFixed(2);
  };

  const displayAmount = convertAmount(baseAmount, "USD", activeCurrency);

  return (
    <>
      <div className="px-6 max-md:hidden py-4 bg-[#EBF0FF] border border-[#D6E2FF] rounded-xl col-span-4 row-start-1">
        <div className="flex items-center gap-2 mb-3">
          <h4 className="font-semibold text-base text-[#1A1A1AB2] -tracking-[0.012em]">
            Total Balance
          </h4>
          <button
            onClick={() => setShowBalance(!showBalance)}
            type="button"
            title={showBalance ? "Hide balance" : "Show balance"}
            className="text-[#A1A1AA]"
          >
            {showBalance ? <IconEyeDisable /> : <IconEye />}
          </button>
        </div>

        <article className="flex gap-1.75 items-center mb-6">
          <div className="grid">
            <p
              className={`font-bold text-[2rem] text-zabira col-start-1 row-start-1 transition-opacity ${
                showBalance ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!showBalance}
            >
              {displayAmount}
            </p>
            <p
              className={`font-bold text-[2rem] text-zabira col-start-1 row-start-1 transition-opacity ${
                showBalance ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden={showBalance}
            >
              *****
            </p>
          </div>
          <div className="px-3 py-1 font-semibold text-base text-zabira text-zabira-blue bg-[#D6E2FF] border border-[#ADC5FF] rounded-[3.125rem]">
            {activeCurrency}
          </div>
        </article>

        <ul className="grid grid-flow-col bg-[#D6E2FF] p-1 rounded-md gap-0.5">
          {currencies.map((currency) => {
            const { code, flag: Flag } = currency;

            return (
              <li key={code} className="w-full items">
                <input
                  type="radio"
                  name="currency"
                  value={code}
                  id={code}
                  className="sr-only"
                  checked={code === activeCurrency}
                  onChange={(e) => setActiveCurrency(e.target.value)}
                />
                <label
                  htmlFor={code}
                  className={`flex cursor-pointer hover:bg-[#E1E1E2] rounded-md py-2 items-center justify-center gap-2 mx-auto font-semibold text-sm leading-5.5 ${
                    code === activeCurrency
                      ? "bg-white text-[#1A1A1A] shadow-[0px_1px_2px_0px_#1A1A1A14]"
                      : "text-[#1A1A1AB2]"
                  }`}
                >
                  {code}

                  <Flag />
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="md:hidden bg-[#EBF0FF] rounded-xl border border-zabira-dark/8">
        <div className="bg-[#0044EE] px-5 py-4 rounded-xl bg-[url('./assets/hero-bg.png')] text-white bg-cover bg-no-repeat">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-semibold text-base text-[#FFFFFFB2] -tracking-[0.012em]">
              Total Balance
            </h4>
            <button
              onClick={() => setShowBalance(!showBalance)}
              type="button"
              title={showBalance ? "Hide balance" : "Show balance"}
              className="text-white"
            >
              {showBalance ? <IconEyeDisable /> : <IconEye />}
            </button>

            <select
              value={activeCurrency}
              onChange={(e) => setActiveCurrency(e.target.value)}
              className="px-4 custom-select py-2 font-semibold text-base text-white bg-[#299BFF] border border-[#2084D6] rounded-full appearance-none cursor-pointer ml-auto bg-no-repeat pr-10"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>

          <article className="mb-2">
            <p
              className={`font-bold text-[2rem] text-white col-start-1 row-start-1 transition-opacity ${
                showBalance ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!showBalance}
            >
              {displayAmount}
            </p>
          </article>

          <div className="border-t border-white/26 pt-3 grid grid-cols-2 grid-flow-col">
            <button
              type="button"
              title="withdraw"
              className="custom-button__inverted text-white bg-transparent border-0 py-0 border-r border-white/26 rounded-none"
            >
              <span className="text-2xl rotate-180">
                <IconArrow />
              </span>
              Withdraw
            </button>
            <button
              type="button"
              title="withdraw"
              className="custom-button__inverted text-white bg-transparent border-0 py-0 rounded-none -ml-px"
            >
              <span className="text-2xl ">
                <IconArrow />
              </span>
              Deposit
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-1.5">
          <p className="flex items-center gap-1.5 text-zabira text-sm font-semibold text-zabira-dark/70">
            <IconFile />
            Transaction History
          </p>

          <button
            type="button"
            title="view transaction history"
            className="inline-flex"
          >
            <span className="-rotate-135 text-2xl text-[#1A1A1A7A]">
              <IconArrow />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TotalBalance;
