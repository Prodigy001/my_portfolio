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
      <div className="px-6 max-md:hidden py-4 bg-primary-light border border-primary-lighter rounded-xl col-span-4 row-start-1">
        <div className="flex items-center gap-2 mb-3">
          <h4 className="font-semibold text-base text-text-secondary -tracking-[0.012em]">
            Total Balance
          </h4>
          <button
            onClick={() => setShowBalance(!showBalance)}
            type="button"
            aria-label={showBalance ? "Hide balance" : "Show balance"}
            className="text-neutral-500"
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
              aria-live="polite"
            >
              {Number(displayAmount).toLocaleString()}
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
          <div className="px-3 py-1 font-semibold text-base text-zabira text-zabira-blue bg-primary-lighter border border-primary-border rounded-[3.125rem]">
            {activeCurrency}
          </div>
        </article>

        <ul className="grid grid-flow-col bg-primary-lighter p-1 rounded-md gap-0.5" role="radiogroup" aria-label="Select currency">
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
                  className={`flex cursor-pointer hover:bg-bg-hover rounded-md py-2 items-center justify-center gap-2 mx-auto font-semibold text-sm leading-5.5 ${
                    code === activeCurrency
                      ? "bg-bg-card text-text-primary shadow-[0px_1px_2px_0px_#1A1A1A14]"
                      : "text-text-secondary"
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

      <div className="md:hidden bg-primary-light rounded-xl border border-zabira-dark/8">
        <div className="bg-primary px-5 py-4 rounded-xl bg-[url('./assets/hero-bg.png')] text-neutral-50 bg-cover bg-no-repeat">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-semibold text-base text-text-white-secondary -tracking-[0.012em]">
              Total Balance
            </h4>
            <button
              onClick={() => setShowBalance(!showBalance)}
              type="button"
              aria-label={showBalance ? "Hide balance" : "Show balance"}
              className="text-neutral-50"
            >
              {showBalance ? <IconEyeDisable /> : <IconEye />}
            </button>

            <label htmlFor="currency-select-mobile" className="sr-only">Select currency</label>
            <select
              id="currency-select-mobile"
              value={activeCurrency}
              onChange={(e) => setActiveCurrency(e.target.value)}
              className="px-4 custom-select py-2 font-semibold text-base text-neutral-50 bg-primary-blue-accent border border-primary-blue-accent-dark rounded-full appearance-none cursor-pointer ml-auto bg-no-repeat pr-10"
              aria-label="Currency selector"
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
              className={`font-bold text-[2rem] text-neutral-50 col-start-1 row-start-1 transition-opacity ${
                showBalance ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!showBalance}
              aria-live="polite"
            >
              {displayAmount}
            </p>
          </article>

          <div className="border-t border-white/26 pt-3 grid grid-cols-2 grid-flow-col">
            <button
              type="button"
              aria-label="Withdraw funds"
              className="custom-button__inverted text-neutral-50 bg-transparent border-0 py-0 border-r border-white/26 rounded-none"
            >
              <span className="text-2xl rotate-180" aria-hidden="true">
                <IconArrow />
              </span>
              Withdraw
            </button>
            <button
              type="button"
              aria-label="Deposit funds"
              className="custom-button__inverted text-neutral-50 bg-transparent border-0 py-0 rounded-none -ml-px"
            >
              <span className="text-2xl" aria-hidden="true">
                <IconArrow />
              </span>
              Deposit
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-1.5">
          <p className="flex items-center gap-1.5 text-zabira text-sm font-semibold text-zabira-dark/70">
            <span aria-hidden="true"><IconFile /></span>
            Transaction History
          </p>

          <button
            type="button"
            aria-label="View transaction history"
            className="inline-flex"
          >
            <span className="-rotate-135 text-2xl text-[#1A1A1A7A]" aria-hidden="true">
              <IconArrow />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TotalBalance;
