import React from "react";
import Button from "./Button";
import Chat from "../icons/Chat";

const CallToAction: React.FC = () => {
  return (
    <section className="w-full mx-auto py-20 space-y-2 tw-all-center">
      <div className="w-[90%] lg:w-[80%] rounded-2xl bg-linear-to-r from-yellow500-F0 to-[#FEF8D7] px-8 py-14 text-center">
        <h2 className="text-headline-lg md:text-3xl text-black">
          Let’s build something meaningful.
        </h2>
        <p className="mt-4 text-body-lg md:text-base text-black300-54 max-w-2xl mx-auto leading-relaxed">
          Got a product idea, redesign, or need a designer who can actually
          ship? I’m open to working with founders and teams building impactful
          products.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Button
            text="Let's Talk"
            bgColor="bg-yellow100-FA"
            color="text-black400-33"
            Icon={Chat}
            href="https://calendly.com/promise-orimadegun/30min"
            target="_blank"
          />
          <Button
            text="View My Work"
            bgColor="bg-black400-33"
            color="text-white"
            href="https://docs.google.com/document/d/1IVAdEew4oZp-9LthlHcyu6W6LTcG_fPz7EY-EGAZBN4/edit?usp=sharing"
            target="_blank"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
