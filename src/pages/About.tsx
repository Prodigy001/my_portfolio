import React from "react";
import Location from "../icons/Location";
import Graduation from "../icons/Graduation";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  section: string;
};

const sections = [
  { label: "Hi!", id: "Hi" },
  { label: "Experience", id: "Experience" },
  { label: "Behind the Screen", id: "BehindTheScreen" },
  { label: "Design Philosophy", id: "DesignPhilosophy" },
];

const experiences = [
  {
    image: "../images/exp-1.png",
    mainText: "Senior Product Designer — Revv Autocare",
    subText:
      "Led and redesigned critical operational and payment flows used by 1,000+ auto service businesses. Worked on discount and tax management, payout setup (including Stripe), and work‑bay redesign to remove friction from incomplete steps",
  },
  {
    image: "../images/exp-2.png",
    mainText: "Product Designer (Contract) — PayUrDues",
    subText:
      "Designed and collaborated with developers to build a dues‑collection platform for associations. The product processed ₦10M+ in transactions during beta and is preparing for public launch.",
  },
  {
    image: "../images/exp-2.png",
    mainText: "Product Designer (Contract) — PayUrDues",
    subText:
      "Designed and collaborated with developers to build a dues‑collection platform for associations. The product processed ₦10M+ in transactions during beta and is preparing for public launch.",
  },
  {
    image: "../images/exp-2.png",
    mainText: "Product Designer (Contract) — PayUrDues",
    subText:
      "Designed and collaborated with developers to build a dues‑collection platform for associations. The product processed ₦10M+ in transactions during beta and is preparing for public launch.",
  },
];

function About() {
  const { section } = useOutletContext<ContextType>();

  return (
    <div className="relative w-full bg-black900-004 pt-24 pb-40">
      <div className="lg:hidden sticky top-20 z-10 bg-transparent backdrop-blur-sm border-b border-black400-33 px-4 py-3 flex items-center justify-between">
        <h1 className="text-black50-E6 text-title-lg font-medium">ABOUT ME</h1>
        {/* Section dot indicators */}
        <div className="flex items-center gap-3">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() =>
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex flex-col items-center gap-1"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  section === s.id
                    ? "w-4 h-1.5 bg-yellow500-F0"
                    : "w-1.5 h-1.5 bg-black400-33"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Main layout ─────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row w-full px-4 lg:px-5">
        {/* ── Desktop: sticky sidebar ──────────────────────────────── */}
        <div className="hidden lg:flex w-[30%] max-w-80 shrink-0">
          <div className="sticky top-24 h-fit space-y-20 pr-10 w-full">
            <p className="text-black50-E6 text-headline-lg">ABOUT ME</p>
            <nav className="flex justify-end">
              <ul className="p-6 border-r border-black400-33 space-y-3">
                {sections.map((s) => (
                  <li
                    key={s.label}
                    className={`${
                      s.id === section
                        ? "text-yellow500-F0"
                        : "text-black200-8A"
                    } hover:text-yellow500-F0 text-label-md cursor-pointer transition-colors`}
                    onClick={() =>
                      document
                        .getElementById(s.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {s.label}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="space-y-20 lg:space-y-28 mt-10 lg:mt-28">
          {/* Hi section */}
          <section
            id="Hi"
            className="flex flex-col sm:flex-row gap-6 lg:gap-10"
          >
            <figure className="size-28 sm:size-40 min-w-28 sm:min-w-40 overflow-hidden rounded-lg shrink-0">
              <img
                src="../images/profile.png"
                className="size-full object-cover"
              />
            </figure>
            <div className="space-y-4 items-center lg:space-y-6">
              <h1
                className={`${
                  section === "Hi"
                    ? "text-yellow500-F0 animate-pulse"
                    : "text-white"
                } text-title-lg lg:text-headline-sm font-medium`}
              >
                Hi! I am Promise Orimadegun
              </h1>
              <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                <div className="flex items-center gap-1">
                  <div className="size-5 tw-all-center shrink-0">
                    <Location />
                  </div>
                  <p className="text-body-sm text-black200-8A">
                    Lagos Nigeria (Remote friendly)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-5 shrink-0">
                    <Graduation />
                  </div>
                  <p className="text-body-sm text-black200-8A">
                    B.SC Physiology
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-body-md lg:text-body-lg text-black200-8A font-light">
                  I'm a Product Designer with 5+ years of experience designing
                  fintech, SaaS, and Web3 products used by real people in
                  high‑trust, high‑stakes environments.
                </p>
                <p className="text-body-md lg:text-body-lg text-black200-8A font-light">
                  My strength lies in turning complex flows — payments,
                  dashboards, wallets, and operational tools — into clear, calm,
                  and usable experiences. I work closely with engineers, product
                  managers, and founders to ship designs that don't just look
                  good, but actually work in production.
                </p>
              </div>
            </div>
          </section>

          {/* Experience section */}
          <section
            id="Experience"
            className="flex flex-col sm:flex-row gap-6 lg:gap-10"
          >
            <div className="sm:w-40 sm:min-w-40 shrink-0">
              <h2
                className={`${
                  section === "Experience"
                    ? "text-yellow500-F0 animate-pulse"
                    : "text-black50-E6"
                } text-title-lg`}
              >
                Experience
              </h2>
            </div>
            <div className="space-y-6">
              {experiences.map((experience) => (
                <div
                  key={experience.mainText}
                  className="flex flex-col sm:flex-row gap-4 lg:gap-6"
                >
                  <figure className="w-full sm:w-[20%] max-w-full sm:max-w-96 aspect-video sm:aspect-1/0.5 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={experience.image}
                      className="size-full object-cover"
                    />
                  </figure>
                  <div className="space-y-2 flex-1">
                    <p className="font-medium text-title-md text-black50-E6">
                      {experience.mainText}
                    </p>
                    <p className="text-body-sm text-black300-54">
                      {experience.subText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Behind The Screen section */}
          <section
            id="BehindTheScreen"
            className="space-y-10 items-center lg:space-y-20"
          >
            <div className="space-y-2">
              <p
                className={`${
                  section === "BehindTheScreen"
                    ? "text-yellow500-F0 animate-pulse"
                    : "text-black50-E6"
                } text-title-lg`}
              >
                Behind The Screen
              </p>
              <p className="text-body-md lg:text-body-lg text-black200-8A">
                Design, to me, is also about conversations, shared learning, and
                showing up where products are being built
              </p>
            </div>

            {/* Startup Village */}
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-5">
              <div className="w-full lg:w-[40%] lg:max-w-80 space-y-4 lg:space-y-5">
                <p className="text-title-lg text-black50-E6">
                  Startup Village Nigeria;
                  <br />
                  Speaker & Attendee
                </p>
                <p className="text-body-md lg:text-body-lg text-black200-8A">
                  Spoke on product design, usability, and building products for
                  real users, while engaging with founders, builders, and
                  operators across fintech, SaaS, and Web3.
                </p>
              </div>
              <div className="flex w-full gap-3 lg:gap-5">
                <div className="w-1/2 h-64 sm:h-[50vh] lg:h-[70vh] rounded-lg overflow-hidden">
                  <img
                    src="../images/bts-1.png"
                    alt="Behind The Scene"
                    className="size-full object-contain"
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-3 lg:gap-0">
                  <div className="w-full h-1/2 rounded-lg overflow-hidden">
                    <img
                      src="../images/bts-2.png"
                      alt="Behind The Scene"
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="w-full h-1/2 rounded-lg overflow-hidden">
                    <img
                      src="../images/bts-3.png"
                      alt="Behind The Scene"
                      className="size-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Design Bounties */}
            <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-6 lg:gap-5">
              <div className="w-full lg:w-[40%] lg:max-w-80 space-y-4 lg:space-y-5">
                <p className="text-title-lg text-black50-E6">
                  Design Bounties & Hackathons
                </p>
                <p className="text-body-md lg:text-body-lg text-black200-8A">
                  I've won multiple Superteam design bounties, including a Hall
                  of Fame design bounty, working on real product problems across
                  payments, wallets, and user flows. These competitive
                  environments strengthened my ability to design under
                  constraints, communicate decisions clearly, and collaborate
                  with founders and reviewers.
                </p>
              </div>
              <div className="flex w-full gap-3 lg:gap-5">
                <div className="w-1/2 h-64 sm:h-[50vh] lg:h-[70vh] rounded-lg overflow-hidden">
                  <img
                    src="../images/bts-4.png"
                    alt="Behind The Scene"
                    className="size-full object-contain"
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-3 lg:gap-0">
                  <div className="w-full h-1/2 rounded-lg overflow-hidden">
                    <img
                      src="../images/bts-5.png"
                      alt="Behind The Scene"
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="w-full h-1/2 rounded-lg overflow-hidden">
                    <img
                      src="../images/bts-6.png"
                      alt="Behind The Scene"
                      className="size-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Design Philosophy section */}
          <section id="DesignPhilosophy" className="space-y-10 lg:space-y-20">
            <div className="space-y-2">
              <p
                className={`${
                  section === "DesignPhilosophy"
                    ? "text-yellow500-F0 animate-pulse"
                    : "text-black50-E6"
                } text-title-lg`}
              >
                Design Philosophy
              </p>
              <p className="text-body-md lg:text-body-lg text-black200-8A">
                How I think about systems, responsibility, and product design.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
              <div className="border border-black300-54 rounded-lg p-6 lg:p-10 space-y-6 lg:space-y-10 flex flex-col justify-between">
                <q className="block text-headline-sm lg:text-headline-md text-black50-E6">
                  Power lives in systems, which is why designing them
                  responsibly matters
                </q>
                <p className="text-body-md lg:text-body-lg text-black300-54">
                  — Personal design principle
                </p>
              </div>
              <div className="border border-black300-54 rounded-lg p-6 lg:p-10 space-y-6 lg:space-y-10 flex flex-col justify-between">
                <q className="block text-headline-sm lg:text-headline-md text-black50-E6">
                  Every interface teaches users how to behave. I design with
                  that responsibility in mind
                </q>
                <p className="text-body-md lg:text-body-lg text-black300-54">
                  — Personal design principle
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
