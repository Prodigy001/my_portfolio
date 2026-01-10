import { tradedAssets } from "../data";
import IconArrow from "../icons/IconArrow";
import IconLighting from "../icons/IconLighting";
import IconTrend from "../icons/IconTrend";

const TopTraded = () => {
  return (
    <div className="col-span-6 row-start-1">
      <div className="flex items-center justify-between mb-6">
        <h4 className="flex items-center gap-1.5 font-bold text-base text-[#1A1A1A]">
          <span className="text-zabira-green text-[1.25rem]">
            <IconLighting />
          </span>
          Top traded assets this week
        </h4>

        <button
          type="button"
          className="py-0.5 pl-3 pr-2.5 rounded-[50px]  text-sm leading-5.5   gap-1 border-[#FFFFFF1F] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] custom-button"
        >
          Trade Now{" "}
          <span className="text-white -rotate-135 text-2xl">
            <IconArrow />
          </span>
        </button>
      </div>

      <ul className="flex items-center  gap-3 w-full overflow-scroll no-scrollbar ">
        {tradedAssets.map(({ id, name, icon, code, change, isPositive }) => (
          <li key={id} className="p-4 rounded-xl bg-[#F4F4F5] flex-none w-[25%]">
            <img
              src={icon}
              alt={name}
              className="aspect-square rounded-full w-9"
            />

            <h6 className="mt-3 text-sm font-semibold truncate max-w-28">
              {name} ({code})
            </h6>

            <div className={`flex items-center gap-1 mt-1.5`}>
              <p className="text-[.75rem] font-semibold leading-4.5 text-[#1A1A1AB2]">
                {isPositive && "+"}
                {change}%
              </p>
              <span
                className={`text-base ${
                  isPositive ? "text-[#1AC057]" : "text-[#EF4343] rotate-45"
                }`}
              >
                <IconTrend />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTraded;
