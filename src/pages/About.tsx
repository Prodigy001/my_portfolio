import React from "react";
import Location from "../icons/Location";
import Graduation from "../icons/Graduation";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  section: string;
};

const sections = [
  { label: "Hi!", id: "Hi" },
  { label: "Stacks", id: "Stacks" },
  { label: "Experience", id: "Experience" },
  { label: "Beyond the Screen", id: "BeyondTheScreen" },
  { label: "Design Philosophy", id: "DesignPhilosophy" },
];

const stacks = [
  {
    name: "Figma",
    icon: "../images/figma.png",
    bg: "bg-black900-004",
  },
  {
    name: "Framer",
    icon: "../images/framer.png",
    bg: "bg-black900-004",
  },
  {
    name: "Adobe XD",
    icon: "../images/adobexd.png",
    bg: "bg-black900-004",
  },
  {
    name: "Photoshop",
    icon: "../images/photoshop.png",
    bg: "bg-black900-004",
  },
  {
    name: "Sketch",
    icon: "../images/sketch.png",
    bg: "bg-black900-004",
  },
  {
    name: "Google Meet",
    icon: "../images/googlemeet.png",
    bg: "bg-black900-004",
  },
  {
    name: "Protopie",
    icon: "../images/protopie.png",
    bg: "bg-black900-004",
  },
  {
    name: "Maze",
    icon: "../images/maze.png",
    bg: "bg-black900-004",
  },
  {
    name: "Forms",
    icon: "../images/forms.png",
    bg: "bg-black900-004",
  },
  {
    name: "Rive",
    icon: "../images/rive.png",
    bg: "bg-black900-004",
  },
  {
    name: "Notion",
    icon: "../images/notion.png",
    bg: "bg-black900-004",
  },
  {
    name: "Slack",
    icon: "../images/slack.png",
    bg: "bg-black900-004",
  },
];

const experiences = [
  {
    image: "../images/exp-1.png",
    mainText: "Senior Product Designer — Revv Autocare",
    subText:
      "Led the redesign of critical operational and payment workflows for a 1,000+ auto service business. Improved task completion rates, streamlined Stripe-based payments, and reduced friction across key user journeys.",
    link: "https://revvauto.care/",
  },
  {
    image: "../images/exp-2.png",
    mainText: "Product Designer (Contract) — PayUrDues",
    subText:
      "Designed a dues-collection platform for associations, working closely with engineers to ship a scalable product that processed over ₦10M in beta and prepared for public launch.",
    link: "https://www.payurdues.com.ng/",
  },
  {
    image: "../images/exp-3.png",
    mainText: "Product Designer (Contract) — Sprinten",
    subText:
      "Designed Sprinten's agency website and a multi-role product experience. Structured flows, built scalable UI systems, and improved clarity across different user types.",
    link: "https://www.sprinten.io/",
  },
  {
    image: "../images/exp-4.png",
    mainText: "Lead UI/UX Designer (Contract) — Kero technology",
    subText:
      "Led the design of a ride-hailing platform across rider, driver, and admin flows. Simplified booking, improved decision clarity, and built a scalable marketplace system.",
    link: "https://play.google.com/store/apps/details?id=com.user.Kero",
  },
  {
    image: "../images/exp-5.png",
    mainText: "UI/UX designer — Milantiawebs",
    subText:
      "Designed e-commerce experiences focused on usability and conversion. Delivered clean, responsive interfaces that improved engagement and reduced drop-off.",
    link: "https://milantiawebs.com/",
  },
];

function About() {
  const { section } = useOutletContext<ContextType>();

  const MOBILE_OFFSET = 132;
  const DESKTOP_OFFSET = 130;

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const isMobile = window.innerWidth < 1024;
    const offset = isMobile ? MOBILE_OFFSET : DESKTOP_OFFSET;
    const top = el.getBoundingClientRect().top + window.scrollY - offset - 16;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className="relative w-full bg-black900-004 pb-30">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto">
        {/*  (Mobile + tablet) : sticky "ABOUT ME" + dots  */}
        <div className="lg:hidden sticky top-20 z-10 bg-transparent backdrop-blur-sm border-b border-black400-33 px-4 py-3 flex items-center justify-between">
          <h1 className="text-black50-E6 text-title-lg font-medium">
            ABOUT ME
          </h1>
          <div className="flex items-center gap-3">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="flex flex-col items-center gap-1"
                aria-label={s.label}
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

        <div className="flex flex-col lg:flex-row w-full px-4 lg:px-5 pt-37 lg:pt-24">
          {/* Desktop sticky sidebar */}
          <div className="hidden lg:flex w-[20%] max-w-80 shrink-0">
            <div className="sticky top-40 h-fit space-y-20 pr-10 w-full">
              <p className="text-black50-E6 pr-2 text-headline-lg">ABOUT ME</p>
              <nav className="flex justify-end">
                <ul className="p-8 border-r border-black400-33 space-y-6">
                  {sections.map((s) => (
                    <li
                      key={s.label}
                      className={`${
                        s.id === section
                          ? "text-yellow500-F0"
                          : "text-black200-8A"
                      } hover:text-yellow500-F0 text-label-md cursor-pointer transition-colors`}
                      onClick={() => scrollToSection(s.id)}
                    >
                      {s.label}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="flex-1 pl-0 lg:pl-2 space-y-20 lg:space-y-28">
            <section
              id="Hi"
              className="flex flex-col sm:flex-row pt-0 lg:pt-46 gap-6 lg:gap-10 scroll-mt-33 lg:scroll-mt-24"
            >
              <figure className="size-28 sm:size-40 min-w-28 sm:min-w-40 overflow-hidden rounded-xl shrink-0">
                <img
                  src="../images/profile.png"
                  className="size-full object-cover"
                />
              </figure>
              <div className="space-y-4 lg:space-y-6">
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
                    dashboards, wallets, and operational tools — into clear,
                    calm, and usable experiences. I work closely with engineers,
                    product managers, and founders to ship designs that don't
                    just look good, but actually work in production.
                  </p>
                </div>
              </div>
            </section>

            <section id="Stacks" className="scroll-mt-33 lg:scroll-mt-24">
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-10">
                <div className="sm:w-40 sm:min-w-40 shrink-0">
                  <p
                    className={`${
                      section === "Stacks"
                        ? "text-yellow500-F0 animate-pulse"
                        : "text-white"
                    } text-title-lg lg:text-title-lg`}
                  >
                    My Stacks
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 flex-1">
                  {stacks.map((stack) => (
                    <div key={stack.name} className="flex items-center gap-4">
                      <div
                        className={`size-12 rounded-xl shrink-0 flex items-center justify-center overflow-hidden ${stack.bg}`}
                      >
                        <img
                          src={stack.icon}
                          alt={stack.name}
                          className="size-12 object-contain"
                        />
                      </div>

                      <p className="text-title-lg font-light text-black50-E6">
                        {stack.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section
              id="Experience"
              className="flex flex-col sm:flex-row gap-6 lg:gap-10 scroll-mt-33 lg:scroll-mt-24"
            >
              <div className="sm:w-40 sm:min-w-40 space-y-3 lg:space-y-3 shrink-0">
                <h2
                  className={`${
                    section === "Experience"
                      ? "text-yellow500-F0 animate-pulse"
                      : "text-black50-E6"
                  } text-title-lg`}
                >
                  Experience
                </h2>
                <a
                  href="https://docs.google.com/document/d/1IVAdEew4oZp-9LthlHcyu6W6LTcG_fPz7EY-EGAZBN4/edit?usp=sharing"
                  className="flex items-center cursor-pointer hover:brightness-75 gap-2"
                >
                  <p className="text-label-md lg:text-label-md text-yellow500-F0">
                    See Resume
                  </p>
                  <img
                    src="../images/ArrowUpRight.png"
                    alt="resume icon"
                    className="size-4 object-contain"
                  />
                </a>
              </div>
              <div className="space-y-6 flex-1">
                {experiences.map((experience) => (
                  <a
                    key={experience.mainText}
                    href={experience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col lg:items-center sm:flex-row gap-4 md:gap-5 lg:gap-6 group"
                  >
                    <figure className="rounded-lg overflow-hidden shrink-0 w-fit">
                      <img
                        src={experience.image}
                        alt={experience.mainText}
                        className="w-36 h-20 object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                      />
                    </figure>
                    <div className="space-y-2 flex-1">
                      <p className="group-hover:text-yellow500-F0 active:text-yellow500-F0 text-title-md text-black50-E6">
                        {experience.mainText}
                      </p>
                      <p className="text-body-sm text-black300-54">
                        {experience.subText}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section
              id="BeyondTheScreen"
              className="space-y-10 lg:space-y-20 scroll-mt-33 lg:scroll-mt-24"
            >
              <div className="space-y-4">
                <p
                  className={`${
                    section === "BeyondTheScreen"
                      ? "text-yellow500-F0 animate-pulse"
                      : "text-black50-E6"
                  } text-title-lg`}
                >
                  Beyond The Screen
                </p>
                <p className="text-body-md lg:text-body-lg text-black200-8A">
                  Design, to me, is also about conversations, shared learning,
                  and showing up where products are being built
                </p>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-row items-start md:items-center gap-6 md:gap-8 lg:gap-8">
                <div className="w-full md:w-[35%] lg:w-[40%] lg:max-w-80 space-y-4 lg:space-y-5">
                  <p className="text-title-lg text-black50-E6">
                    Startup Village Nigeria;
                    <br />
                    Speaker & Attendee
                  </p>
                  <p className="text-body-md lg:text-body-lg text-black200-8A">
                    Spoke on product design, usability, and building products
                    for real users, while engaging with founders, builders, and
                    operators across fintech, SaaS, and Web3.
                  </p>
                </div>
                <div className="flex w-full md:flex-1 gap-4 lg:gap-4">
                  <div className="w-1/2 rounded-xl overflow-hidden">
                    <img
                      src="../images/bts-1.png"
                      alt="Behind The Scene"
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-4 lg:gap-4">
                    <div className="w-full h-1/2 rounded-xl overflow-hidden">
                      <img
                        src="../images/bts-2.png"
                        alt="Behind The Scene"
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="w-full h-1/2 rounded-xl overflow-hidden">
                      <img
                        src="../images/bts-3.png"
                        alt="Behind The Scene"
                        className="size-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row-reverse items-start md:items-center gap-6 md:gap-8 lg:gap-8">
                <div className="w-full md:w-[35%] lg:w-[40%] lg:max-w-80 space-y-4 lg:space-y-5">
                  <p className="text-title-lg text-black50-E6">
                    Design Bounties & Hackathons
                  </p>
                  <p className="text-body-md lg:text-body-lg text-black200-8A">
                    I've won multiple Superteam design bounties, including a
                    Hall of Fame design bounty, working on real product problems
                    across payments, wallets, and user flows. These competitive
                    environments strengthened my ability to design under
                    constraints, communicate decisions clearly, and collaborate
                    with founders and reviewers.
                  </p>
                </div>
                <div className="flex w-full md:flex-1 gap-4 lg:gap-4">
                  <div className="w-1/2 rounded-xl overflow-hidden">
                    <img
                      src="../images/bts-4.png"
                      alt="Behind The Scene"
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-4 lg:gap-4">
                    <div className="w-full h-1/2 rounded-xl overflow-hidden">
                      <img
                        src="../images/bts-5.png"
                        alt="Behind The Scene"
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="w-full h-1/2 rounded-xl overflow-hidden">
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

            <section
              id="DesignPhilosophy"
              className="space-y-10 lg:space-y-20 scroll-mt-33 lg:scroll-mt-24"
            >
              <div className="space-y-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
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
    </div>
  );
}

export default About;
