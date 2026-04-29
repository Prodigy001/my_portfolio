import React from "react";

const tabs = [
  { label: "Hypothesis", id: "hypothesis" },
  { label: "Validation", id: "validation" },
  { label: "Design", id: "design" },
  { label: "Test", id: "test" },
];

function ByClick() {
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 100; // adjust if needed for header height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className="bg-black900-004 text-white">
      {/* ─────────── HERO SECTION ─────────── */}
      <section className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto pt-32 space-y-10">
        <p className="text-body-sm text-black200-8A">UX Case Study</p>

        <h1 className="text-headline-lg text-black50-E6 max-w-4xl">
          Revitalizing Byclick Downloader: A Usability Test and Redesign to
          Improve User Experience
        </h1>

        {/* Before / After */}
        <div className="w-full rounded-lg overflow-hidden bg-white/5 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <figure className="w-1/2 space-y-2">
              <img
                src="../../images/byclick-case-before.png"
                className="w-full object-contain"
              />
              <p className="text-center text-body-sm text-black200-8A italic">
                Before
              </p>
            </figure>

            <div className="space-y-2">
              <img
                src="../../images/byclick-case-after.png"
                className="w-full object-contain"
              />
              <p className="text-center text-body-sm text-black200-8A italic">
                After
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── OVERVIEW ─────────── */}
      <section className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-24">
        <h2 className="text-center text-title-lg text-black50-E6 mb-16">
          Overview
        </h2>

        <div className="space-y-8">
          {[
            ["Product", "ByClick Downloader"],
            ["Scope", "UX Strategy, Research, UI Design,Redesign"],
            ["Industry", "SAAS"],
            ["Platform", "Desktop"],
            ["Design Methodology", "Lean"],
            ["Duration", "14 Days"],
            ["Role", "UX and UI designer"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between items-center border-b border-black400-33 pb-4"
            >
              <p className="text-body-sm text-black200-8A">{label}</p>
              <p className="text-body-md text-black50-E6">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── STICKY TABS ─────────── */}
      <section className="sticky top-24 z-10">
        <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto">
          <div className="flex justify-center">
            <div className="flex gap-2 bg-[#2A2A2A] rounded-full p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className="px-5 py-2 text-body-sm rounded-full text-black200-8A hover:text-yellow500-F0 transition"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── HYPOTHESIS SECTION ─────────── */}
      <section
        id="hypothesis"
        className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-24 space-y-12"
      >
        {/* Image + annotations */}
        <div className="w-full">
          <img
            src="../../images/byclick-analysis.png"
            className="w-full object-contain"
          />
        </div>

        {/* Issues card */}
        <div className="flex justify-end">
          <div className="bg-white text-black rounded-xl p-6 space-y-4 w-full max-w-sm">
            <ul className="space-y-2 text-body-sm">
              <li>• Poor Usability</li>
              <li>• Lack of visibility</li>
              <li>• Poor Information Architecture</li>
              <li>• Poor implementation of the usability heuristic</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────── PLACEHOLDERS FOR NEXT SECTIONS ─────────── */}
      <section
        id="validation"
        className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-32"
      >
        <p className="text-black200-8A">Validation section coming...</p>
      </section>

      <section
        id="design"
        className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-32"
      >
        <p className="text-black200-8A">Design section coming...</p>
      </section>

      <section
        id="test"
        className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-32"
      >
        <p className="text-black200-8A">Test section coming...</p>
      </section>
    </div>
  );
}

export default ByClick;
