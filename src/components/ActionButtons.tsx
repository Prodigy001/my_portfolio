import IconArrow from "../icons/IconArrow";
import IconSwap from "../icons/IconSwap";

const ActionButtons = () => {
  return (
    <div className="grid grid-flow-col auto-cols-fr gap-6 col-span-4 col-start-1 row-start-2">
      <button
        type="button"
        title="withdraw"
        className="custom-button__inverted"
      >
        <span className="text-2xl rotate-180">
          <IconArrow />
        </span>
        Withdraw
      </button>
      <button
        type="button"
        title="withdraw"
        className="custom-button__inverted"
      >
        <span className="text-2xl ">
          <IconArrow />
        </span>
        Deposit
      </button>
      <button
        type="button"
        title="withdraw"
        className="custom-button__inverted"
      >
        <span className="text-2xl">
          <IconSwap />
        </span>
        Swap
      </button>
    </div>
  );
};

export default ActionButtons;
