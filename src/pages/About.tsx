import React, { useEffect, useState } from "react";
import Location from "../icons/Location";
import Graduation from "../icons/Graduation";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  section: string;
};

const sections = [
  {
    label: "Hi!",
    path: "",
    id: "Hi",
  },
  {
    label: "Experience",
    path: "",
    id: "Experience",
  },
  {
    label: "Behind the Screen",
    path: "",
    id: "BehindTheScreen",
  },
  {
    label: "Design Philosophy",
    path: "",
    id: "DesignPhilosophy",
  },
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
    mainText: "Product Designer (Contract) — PayUrDues 2",
    subText:
      "Designed and collaborated with developers to build a dues‑collection platform for associations. The product processed ₦10M+ in transactions during beta and is preparing for public launch.",
  },
  {
    image: "../images/exp-2.png",
    mainText: "Product Designer (Contract) — PayUrDues 3",
    subText:
      "Designed and collaborated with developers to build a dues‑collection platform for associations. The product processed ₦10M+ in transactions during beta and is preparing for public launch.",
  },
  {
    image: "../images/exp-2.png",
    mainText: "Product Designer (Contract) — PayUrDues 4",
    subText:
      "Designed and collaborated with developers to build a dues‑collection platform for associations. The product processed ₦10M+ in transactions during beta and is preparing for public launch.",
  },
];

function isElementInViewPort(el: HTMLElement) {
  let elementTop = el.getBoundingClientRect().top;
  let screenHeight = window.innerHeight;
  return elementTop > 0 && elementTop < screenHeight;
}

function About() {
  // const [section, setSection] = useState("Hi");
  const { section } = useOutletContext<ContextType>();

  return (
    <div className="relative w-full flex bg-black900-004 space-y-20 py-40 px-5">
      <div className="w-[30%] max-w-80 h-40 sticky top-24 space-y-20  pr-10">
        <p className="text-black50-E6 text-headline-lg">ABOUT ME</p>
        <nav className="flex justify-end">
          <ul className="p-6 border-r border-black400-33 space-y-3">
            {sections.map((s) => {
              return (
                <li
                  key={s.label}
                  className={` ${s.id === section ? "text-yellow500-F0" : "text-black200-8A"} hover:text-yellow500-F0 text-label-md  `}
                >
                  {s.label}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mt-28 w-full space-y-28">
        <section id="Hi" className="flex gap-10">
          <figure className="size-40 min-w-40 overflow-hidden rounded-lg">
            <img
              src="../images/profile.png"
              className="size-full object-cover"
            />
          </figure>
          <div className="space-y-6">
            <h1
              className={`${section === "Hi" && "text-yellow500-F0 animate-pulse"} text-white`}
            >
              Hi! I am Promise Orimadegun
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="size-5 tw-all-center">
                  <Location />
                </div>
                <p className="text-body-sm  text-black200-8A">
                  Lagos Nigeria (Remote friendly)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-5">
                  <Graduation />
                </div>
                <p className="text-body-sm  text-black200-8A">
                  B.SC Physiology
                </p>
              </div>
            </div>
            <div>
              <p className="text-body-lg text-black200-8A font-light">
                I’m a Product Designer with 5+ years of experience designing
                fintech, SaaS, and Web3 products used by real people in
                high‑trust, high‑stakes environments.
              </p>
              <p className="text-body-lg text-black200-8A font-light">
                My strength lies in turning complex flows , payments,
                dashboards, wallets, and operational tools, into clear, calm,
                and usable experiences. I work closely with engineers, product
                managers, and founders to ship designs that don’t just look
                good, but actually work in production.
              </p>
            </div>
          </div>
        </section>

        <section id="Experience" className="flex gap-10">
          <div className="size-40 min-w-40">
            <h2
              className={` ${section === "Experience" && "text-yellow500-F0 animate-pulse"} text-title-lg text-black50-E6`}
            >
              Experience
            </h2>
          </div>
          <div className="space-y-6">
            {experiences.map((experience) => {
              return (
                <div key={experience.mainText} className="flex gap-6">
                  <figure className="w-[20%] max-w-96 aspect-1/0.5 rounded-lg overflow-hidden">
                    <img
                      src={experience.image}
                      className="sizze-full object-cover"
                    />
                  </figure>
                  <div className="space-y-2 w-[90%]">
                    <p className="font-medium text-title-md text-black50-E6">
                      {experience.mainText}
                    </p>
                    <p className="text-body-sm text-black300-54">
                      {experience.subText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="BehindTheScreen" className="space-y-20">
          <div className="space-y-2">
            <p
              className={`${section === "BehindTheScreen" && "text-yellow500-F0 animate-pulse"} text-title-lg text-black50-E6`}
            >
              Behind The Screen
            </p>
            <p className="text-body-lg text-black200-8A">
              Design, to me, is also about conversations, shared learning, and
              showing up where products are being built
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-[40%] max-w-80 space-y-5">
              <p className="text-title-lg text-black50-E6">
                Startup Village Nigeria;
                <br />
                Speaker & Attendee
              </p>
              <p className="text-body-lg text-black200-8A">
                Spoke on product design, usability, and building products for
                real users, while engaging with founders, builders, and
                operators across fintech, SaaS, and Web3.
              </p>
            </div>
            <div className="flex w-full gap-5">
              <div
                className="w-1/2 h-[70vh] rounded-lg overflow-hidden
              "
              >
                <img
                  src="../images/bts-1.png"
                  alt="Behind The Scene"
                  className="size-full object-contain"
                />
              </div>
              <div className="w-1/2 flex flex-col">
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
          <div className="flex flex-row-reverse items-center  gap-5">
            <div className="w-[40%] max-w-80 space-y-5">
              <p className="text-title-lg text-black50-E6">
                Design Bounties & Hackathons
              </p>
              <p className="text-body-lg text-black200-8A">
                I’ve won multiple Superteam design bounties, including a Hall of
                Fame design bounty, working on real product problems across
                payments, wallets, and user flows. These competitive
                environments strengthened my ability to design under
                constraints, communicate decisions clearly, and collaborate with
                founders and reviewers.
              </p>
            </div>
            <div className="flex w-full gap-5">
              <div
                className="w-1/2 h-[70vh] rounded-lg overflow-hidden
              "
              >
                <img
                  src="../images/bts-4.png"
                  alt="Behind The Scene"
                  className="size-full object-contain"
                />
              </div>
              <div className="w-1/2 flex flex-col">
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

        <section id="DesignPhilosophy" className="space-y-20">
          <div className="space-y-2">
            <p
              className={` ${section === "DesignPhilosophy" && "text-yellow500-F0 animate-pulse"} text-title-lg text-black50-E6`}
            >
              Design Philosophy
            </p>
            <p className="text-body-lg text-black200-8A">
              How I think about systems, responsibility, and product design.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="border border-black300-54 rounded-lg p-10 space-y-10 flex flex-col justify-between">
              <q className="block text-headline-md text-black50-E6">
                Power lives in systems, which is why designing them responsibly
                matters
              </q>
              <p className="text-body-lg text-black300-54">
                — Personal design principle
              </p>
            </div>
            <div className="border border-black300-54 rounded-lg p-10 space-y-10 flex flex-col justify-between">
              <q className="block text-headline-md text-black50-E6">
                Every interface teaches users how to behave. I design with that
                responsibility in mind
              </q>
              <p className="text-body-lg text-black300-54">
                — Personal design principle
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
