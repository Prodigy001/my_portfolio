import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
import TikTok from "./icons/TikTok";
import CallToAction from "./components/CallToAction";

const headerLinks = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/" },
  { label: "Playground", path: "/" },
  { label: "About", path: "/about" },
];

const footerSocials = [
  { Icon: LinkedIn, path: "/linkedIn" },
  { Icon: Twitter, path: "/twitter" },
  { Icon: TikTok, path: "/tiktok" },
];

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [section, setSection] = useState("Hi");

  function isElementInViewPort(el: HTMLElement) {
    const elementTop = el.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    return elementTop > 0 && elementTop < screenHeight;
  }

  function changePage(page: string) {
    setCurrentPage(page);
    setMenuOpen(false);
  }

  function useThrottledScroll(limit = 10000) {
    const pathname = location.pathname;
    if (!pathname.includes("about")) return;
    let lastCall = 0;
    return function onScroll() {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        checkSectionPosition();
      }
    };
  }

  function checkSectionPosition() {
    const sections = [
      "Hi",
      "Experience",
      "BehindTheScreen",
      "DesignPhilosophy",
    ];
    for (const _section of sections) {
      const element = document.getElementById(_section);
      if (element && isElementInViewPort(element)) {
        setSection(_section);
        break;
      }
    }
  }

  function onScrollCb() {
    const callback = useThrottledScroll();
    if (callback) callback();
  }

  const isAboutPage = location.pathname.includes("about");

  return (
    <section
      onScroll={onScrollCb}
      className="min-h-screen w-full no-scrollbar bg-black900-004"
    >
      <header className="top-0 fixed z-20 backdrop-blur-sm lg:backdrop-blur-none w-full p-5 flex items-center justify-between md:bg-transparent lg:bg-transparent">
        <div className="py-2 px-4 lg:border lg:border-black400-33 lg:backdrop-blur-sm lg:rounded-lg">
          <h1 className="font-medium text-title-md text-yellow50-FE">
            PROMISE ORIMADEGUN
          </h1>
          <h2 className="text-body-sm text-black700-A3">
            Product designer & UX Strategist
          </h2>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="border border-black400-33 bg-[#F0CB030D] backdrop-blur-sm py-2 px-4 rounded-lg flex gap-8">
            {headerLinks.map((link) => (
              <li
                key={link.label}
                className={`${
                  link.label === currentPage
                    ? "bg-yellow500-F0 border-black300-54 text-black500-00A"
                    : "border-transparent text-yellow50-FE hover:bg-yellow500-F0/10"
                } rounded-sm border font-medium text-label-md`}
              >
                <Link
                  to={link.path}
                  onClick={() => changePage(link.label)}
                  className="block p-2 size-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 rounded-lg border border-black400-33 bg-[#F0CB030D] backdrop-blur-sm"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-yellow50-FE transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-yellow50-FE transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-yellow50-FE transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="fixed top-30 w-[50%] right-5 z-20 border border-black400-33 bg-[#F0CB030D] backdrop-blur-sm py-2 px-4 rounded-lg md:hidden">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {headerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  onClick={() => changePage(link.label)}
                  className={`block py-3 px-4 text-center rounded-lg text-label-md font-medium transition-colors ${
                    link.label === currentPage
                      ? "bg-yellow500-F0 text-black500-00A"
                      : "text-yellow50-FE hover:bg-yellow500-F0/10"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* About page (mobile section indicator strip) */}
      {isAboutPage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-black900-004/90 backdrop-blur-sm border-t border-black400-33">
          <ul className="flex items-center justify-around px-4 py-3">
            {[
              { label: "Hi!", id: "Hi" },
              { label: "Exp", id: "Experience" },
              { label: "Behind", id: "BehindTheScreen" },
              { label: "Philosophy", id: "DesignPhilosophy" },
            ].map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => {
                    document
                      .getElementById(s.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    setSection(s.id);
                  }}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    section === s.id ? "text-yellow500-F0" : "text-black200-8A"
                  }`}
                >
                  <span
                    className={`block w-1 h-1 rounded-full transition-all ${
                      section === s.id
                        ? "bg-yellow500-F0 scale-150"
                        : "bg-black400-33"
                    }`}
                  />
                  <span className="text-body-xs">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Outlet context={{ section }} />

      <footer className="pb-10">
        <CallToAction />
        <div className="w-[80%] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="space-y-6">
            <h2 className="text-title-md font-medium text-yellow50-FE">
              PROMISE ORIMADEGUN
            </h2>
            <div>
              <p className="text-body-sm text-black200-8A">
                Let's work together!
              </p>
              <p className="text-title-md font-medium text-black50-E6">
                OrimadegunAdebanjo@gmail.com
              </p>
            </div>
            <nav className="flex items-center gap-6">
              {footerSocials.map(({ Icon, path }) => (
                <figure key={path} className="size-5">
                  <Link to={path}>
                    <Icon />
                  </Link>
                </figure>
              ))}
            </nav>
          </div>

          <nav>
            <ul className="flex flex-row md:flex-col gap-6 md:gap-10">
              {headerLinks.map((link) => (
                <li
                  key={link.label}
                  className="text-title-md text-black50-E6 hover:text-yellow500-F0"
                >
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="text-body-md text-black200-8A text-center mt-10">
          Copyright &#169; {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}

export default App;
