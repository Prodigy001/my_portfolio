import { Link } from "react-router-dom";
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
    label: "End-to-end ownership , research to shipped(Live) Product",
    result: "10",
  },
];

const designProcess = [
  { step: "Define", description: "Identify the right problem and scope" },
  { step: "Design", description: "Create intuitive, scalable experiences" },
  {
    step: "Discover",
    description: "Understand users, market, and constraints",
  },
  { step: "Deliver", description: "Ship developer-ready solutions" },
];

const selectedWorks = [
  {
    image: "../../images/airbills.png",
    mainText: "Airbills Pay Mobile app",
    subText:
      "Designing a seamless crypto payment experience for everyday users",
    slug: "airbills-pay",
    tags: [
      {
        label: "Product Design",
        path: "/work/airbills-pay/product-design",
        color: "bg-yellow900-99/20 text-yellow900-99",
      },
      {
        label: "Case Study",
        path: "/work/airbills-pay/case-study",
        color: "bg-green50-008/20 text-green50-008",
      },
    ],
  },
  {
    image: "../../images/byClick.png",
    mainText: "By Click Downloader Redesign",
    subText:
      "Redesigning the ByClick Downloader experience through usability testing.",
    slug: "byclick-downloader",
    tags: [
      {
        label: "Product Design",
        path: "/work/byclick-downloader/product-design",
        color: "bg-yellow900-99/20 text-yellow900-99",
      },
      {
        label: "Case Study",
        path: "/work/byclick-downloader/case-study",
        color: "bg-green50-008/20 text-green50-008",
      },
    ],
  },
  {
    image: "../../images/kero.png",
    mainText: "Kero mobile app design",
    subText:
      "Simplifying ride-hailing in low trust, high-variabilty environments",
    slug: "kero-mobile",
    tags: [
      {
        label: "Product Design",
        path: "/work/kero-mobile/product-design",
        color: "bg-yellow900-99/20 text-yellow900-99",
      },
      {
        label: "Case Study",
        path: "/work/kero-mobile/case-study",
        color: "bg-green50-008/20 text-green50-008",
      },
    ],
  },
  {
    image: "../../images/airbills.png",
    mainText: "Airbills Pay Mobile app",
    subText:
      "Airbills pay is a web3 platform that allows you buy crypto from your wallet",
    slug: "airbills-pay-2",
    tags: [
      {
        label: "Product Design",
        path: "/work/airbills-pay-2/product-design",
        color: "bg-yellow900-99/20 text-yellow900-99",
      },
      {
        label: "Framer Build",
        path: "/work/airbills-pay-2/framer-build",
        color: "bg-blue50-000/20 text-blue50-000",
      },
    ],
  },
];

const liveProducts = [
  {
    image: "../../images/kero.png",
    mainText: "Kero mobile app design",
    subText:
      "Simplifying ride-hailing in low trust, high-variabilty environments",
  },
  {
    image: "../../images/airbills.png",
    mainText: "Airbills Pay Mobile app",
    subText:
      "Airbills pay is a web3 platform that allows you buy crypto from your wallet",
  },
  {
    image: "../../images/kero.png",
    mainText: "Kero mobile app design",
    subText:
      "Simplifying ride-hailing in low trust, high-variabilty environments",
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
    <div className="relative bg-black900-004 space-y-16 md:space-y-20">
      {/* Introduction */}
      <section className="min-h-screen w-[90%] md:w-[85%] lg:w-[80%] mx-auto flex items-center pt-10">
        <div className="flex flex-col pt-20 md:pt-20 space-y-8 md:space-y-10 lg:pt-40 lg:flex-row gap-10 lg:gap-20 w-full">
          <div className="w-full lg:w-1/2 space-y-6">
            <figure className="size-40 md:size-52 lg:size-60 rounded-3xl overflow-hidden">
              <img
                src="../../images/profile.png"
                className="size-full object-cover"
              />
            </figure>

            <p className="text-base md:text-lg lg:text-title-lg text-black50-E6">
              Product Designer with 5+ years of experience designing Fintech,
              SAAS, web3 and data-driven products , from concept to live systems
              used by real users.
            </p>

            <div className="flex flex-wrap items-center gap-3">
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

          <div className="w-full lg:w-1/2">
            <ul className="space-y-4">
              {metrics.map((data) => (
                <li
                  key={data.label}
                  className="py-2 space-y-2 md:space-y-4 border-b border-black400-33"
                >
                  <p className="text-sm md:text-body-md text-black300-54">
                    {data.label}
                  </p>
                  <p className="text-lg md:text-headline-lg text-yellow50-FE">
                    {data.result}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto">
        <div className="pt-10 md:pt-10 pb-10 md:pb-10 space-y-2 md:space-y-5">
          <div className="space-y-0 md:space-y-4">
            <h2 className="text-lg md:text-headline-lg text-black50-E6">
              SELECTED WORK
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {selectedWorks.map((work) => (
              <div key={work.slug} className="space-y-5">
                <figure className="w-full aspect-[1/0.7] rounded-lg overflow-hidden">
                  <img src={work.image} className="size-full object-contain" />
                </figure>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2 sm:w-[60%]">
                    <p className="text-title-md text-black50-E6">
                      {work.mainText}
                    </p>
                    <p className="text-body-sm text-black300-54">
                      {work.subText}
                    </p>
                  </div>

                  <Button
                    text="View Project"
                    color="text-white"
                    bgColor="bg-black400-33"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {work.tags.map((tag) => (
                    <Link
                      key={tag.label}
                      to={tag.path}
                      className={`px-3 py-1 rounded-full text-body-xs transition-all duration-200 hover:brightness-125 hover:scale-105 ${tag.color}`}
                    >
                      {tag.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10 flex items-center justify-center">
            <Button
              text="View More on Behance"
              bgColor="bg-yellow500-F0"
              color="text-black500-00A"
            />
          </div>
        </div>
      </section>

      {/* Live Products */}
      <section className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto">
        <div className="pt-10 md:pt-10 pb-10 md:pb-10 space-y-2 md:space-y-5">
          <div className="space-y-4">
            <h2 className="text-lg md:text-headline-lg text-black50-E6 font-light">
              Live Products I've Built With Framer
            </h2>
            <p className="text-body-sm text-black300-54">
              From design to live experiences - no handoff required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {liveProducts.map((prod, index) => (
              <div key={index} className="space-y-3">
                <figure className="w-full aspect-[1/0.7] rounded-lg overflow-hidden">
                  <img src={prod.image} className="size-full object-contain" />
                </figure>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2 sm:w-[60%]">
                    <p className="text-title-md text-black50-E6">
                      {prod.mainText}
                    </p>
                    <p className="text-body-sm text-black300-54">
                      {prod.subText}
                    </p>
                  </div>

                  <Button
                    text="View Live"
                    color="text-white"
                    bgColor="bg-black400-33"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto space-y-2">
        <div className="space-y-4">
          <h2 className="text-headline-lg md:text-headline-lg text-black50-E6 font-light">
            How I Design Products
          </h2>
          <p className="text-body-sm text-black300-54">
            I follow a simple, outcome-driven process:
          </p>
        </div>

        <div className="pt-10 space-y-10">
          {designProcess.map((item) => (
            <div
              key={item.step}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <p className="text-title-lg text-black50-E6 md:w-36 shrink-0">
                {item.step}
              </p>

              <div
                className="hidden md:block flex-1 mx-6 h-px"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #33373b 0px, #33373b 8px, transparent 8px, transparent 16px)",
                }}
              />

              <p className="text-body-sm text-black300-54 md:w-64 md:text-right">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Splash;
