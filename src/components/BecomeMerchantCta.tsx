import { Link } from "react-router-dom";
import merchant from "../assets/merchant.png";
import IconArrow from "../icons/IconArrow";

const BecomeMerchantCta = () => {
  return (
    <div className="bg-gradient-blue p-6 pb-0 overflow-hidden flex items-center gap-7.5 rounded-[1.125rem] border-[3px] border-white/18">
      <img src={merchant} alt="merchant" className="mt-6" />

      <article className="space-y-3 text-white mb-2">
        <h4 className="font-bold text-base  md:text-xl text-zabira text-white">
          Become a Merchant
        </h4>
        <p className="text-white/70 text-sm md:text-lg font-medium">
          Get access to APIs and assets for your merchant profile
        </p>
        <Link
          to="#"
          className="custom-button bg-[#FCFCFC] max-md:rounded-[50px] border border-[#E1E1E2] text-sm text-[#1A1A1A] leading-5.5 inline-flex items-center justify-center gap-2 max-md:py-0.5 max-md:px-3"
        >
          Apply Now
          <span className="text-[1.25rem] -rotate-135">
            <IconArrow />
          </span>
        </Link>
      </article>
    </div>
  );
};

export default BecomeMerchantCta;
