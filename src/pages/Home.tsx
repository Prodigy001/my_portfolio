// className="relative h-screen w-full  items-center justify-center bg-black900-004 p-5 space-y-5"

import Button from "../components/Button";
import Chat from "../icons/Chat";

const metrics = [
  {
    label: "Processed through beta payment platforms",
    result: "₦100M+",
  },
  {
    label: "Users impacted across Fintech & SAAS products",
    result: "10,000",
  },
  {
    label: "Product Design Bounty Winner (Web3)",
    result: "3x",
  },
  {
    label: "End‑to‑end ownership , research to shipped(Live) Product",
    result: "10",
  },
];

const selectedWorks = [
  {
    image: "../../images/airbills.png",
    mainText: "Airbills Pay Mobile app",
    subText:
      "Airbills pay is a web3 platform that allows you buy crypto from your wallet",
  },
  {
        image: "../../images/byClick.png",
    mainText: "By Click Downloader Redesign",
    subText:
      "Revitalizing Byclick Downloader: A Usability Test and Redesign to Improve User Experience",
  },
  {
        image: "../../images/kero.png",
    mainText: "Kero mobile app design",
    subText:
      "Airbills pay is a web3 platform that allows you buy crypto from your wallet",
  },
  {
        image: "../../images/airbills.png",
    mainText: "Airbills Pay Mobile app",
    subText:
      "Airbills pay is a web3 platform that allows you buy crypto from your wallet",
  },
];
function Splash() {
  
  return (
    <div className="relative bg-black900-004 space-y-20">
      {/* Introduction */}
      <section className="h-svh w-[80%] mx-auto tw-all-center pt-10">
        <div className="flex gap-20">
          <div className=" w-1/2  space-y-6">
            <figure className="size-60  rounded-3xl overflow-hidden">
              <img src="../../images/profile.png" className="size-full object-cover" />
            </figure>
            <p className="text-title-lg text-black50-E6">
              Product Designer with 5+ years of experience designing Fintech,
              SAAS, web3 and data‑driven products , from concept to live systems
              used by real users.
            </p>
            <div className="flex items-center gap-2">
              <Button
                text="Let's Talk"
                bgColor="bg-yellow500-F0"
                color="text-black500-00A"
                Icon={Chat}
              />
              <Button
                text="Download Resume"
                bgColor="bg-black400-33"
                color="text-white"
              />
            </div>
          </div>
          <div className=" h-full w-1/2">
            <ul className="space-y-4">
              {metrics.map((data) => {
                return (
                  <li
                    key={data.label}
                    className="py-2  space-y-4 border-b border-black400-33"
                  >
                    <p className="text-body-md text-black300-54">
                      {data.label}
                    </p>
                    <p className="text-headline-lg text-yellow50-FE">
                      {data.result}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className=" w-[80%] mx-auto">
        <div className="size-full pt-20 pb-40 space-y-10">
          <h2 className="text-headline-lg text-black50-E6">SELECTED WORK</h2>
          <div className="grid grid-cols-2 gap-10">
            {selectedWorks.map((work) => {
              return (
                <div className="space-y-6">
                  <figure className="w-full aspect-[1/0.7] max-h-120 rounded-lg  overflow-hidden">
                   <img src={work.image} className="size-full object-contain" />
                  </figure>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 w-[60%]">
                      <p className="text-title-md text-black50-E6">
                        {work.mainText}
                      </p>
                      <p className="text-body-sm text-black300-54">
                        {work.subText}
                      </p>
                    </div>
                    <Button
                      text="View"
                      color="text-white"
                      bgColor="bg-black400-33"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-5 ">
            <Button
              text="View More"
              bgColor="bg-yellow500-F0"
              color="text-black500-00A"
            />
            <Button
              text="See Behance"
              bgColor="bg-black400-33"
              color="text-white"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Splash;
