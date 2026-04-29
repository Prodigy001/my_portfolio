import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
import TikTok from "./icons/TikTok";
import CallToAction from "./components/CallToAction";

const headerLinks = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/" },
  { label: "About", path: "/about" },
];

const footerSocials = [
  { Icon: LinkedIn, path: "https://www.linkedin.com/in/orimadegun-promise/" },
  { Icon: Twitter, path: "https://x.com/Extricator_UX" },
  { Icon: TikTok, path: "https://www.tiktok.com/@kyng_prodigy" },
];

const HEADER_OFFSET = 80;

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState("Hi");
  const [scrollToWork, setScrollToWork] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAboutPage = location.pathname.includes("about");

  // Scroll to top on route change (except when scrollToWork is queued)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // After navigating home, scroll to Selected Works
  useEffect(() => {
    if (!scrollToWork) return;
    if (location.pathname !== "/") return;

    let attempts = 0;

    const interval = setInterval(() => {
      const el = document.getElementById("selected-works");

      if (el) {
        const top =
          el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 16;

        window.scrollTo({ top, behavior: "smooth" });
        setScrollToWork(false);
        clearInterval(interval);
      }

      // safety stop (prevents infinite loop)
      attempts++;
      if (attempts > 20) {
        clearInterval(interval);
        setScrollToWork(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [scrollToWork, location.pathname]);

  // Section detection for About page
  function isElementInViewPort(el: HTMLElement) {
    const top = el.getBoundingClientRect().top;
    const height = window.innerHeight;
    return top > 0 && top < height;
  }

  const checkSectionPosition = React.useCallback(() => {
    const ids = [
      "Hi",
      "Stacks",
      "Experience",
      "BeyondTheScreen",
      "DesignPhilosophy",
    ];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && isElementInViewPort(el)) {
        setSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (!isAboutPage) return;

    let lastCall = 0;
    const THROTTLE = 100;

    function onScroll() {
      const now = Date.now();
      if (now - lastCall >= THROTTLE) {
        lastCall = now;
        checkSectionPosition();
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(() => {
      checkSectionPosition();
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isAboutPage, checkSectionPosition]);

  // Nav click handler
  function handleNavClick(label: string, path: string) {
    setCurrentPage(label);
    setMenuOpen(false);

    if (label === "Home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (label === "Work") {
      if (location.pathname === "/") {
        const el = document.getElementById("selected-works");
        if (el) {
          const top =
            el.getBoundingClientRect().top +
            window.scrollY -
            HEADER_OFFSET -
            16;

          window.scrollTo({ top, behavior: "smooth" });
        }
      } else {
        setScrollToWork(true);
        navigate("/");
      }
      return;
    }

    if (label !== "About") setSection("Hi");
  }

  return (
    <div className="min-h-screen w-full bg-black900-004 no-scrollbar">
      <header className="top-0 fixed z-20 w-full bg-black900-004">
        <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto flex items-center justify-between py-5">
          <div className="py-2 space-y-2">
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
                    onClick={() => handleNavClick(link.label, link.path)}
                    className="block p-2 size-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 rounded-lg border border-black400-33 bg-[#F0CB030D] backdrop-blur-sm"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-yellow50-FE transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-yellow50-FE transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-yellow50-FE transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="fixed top-20 w-[50%] right-5 z-20 text-center rounded-2xl md:hidden bg-transparent backdrop-blur-sm border border-black400-33">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {headerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  onClick={() => handleNavClick(link.label, link.path)}
                  className={`block py-3 px-4 rounded-lg text-label-md font-medium transition-colors ${
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

      {/* About page — mobile section indicator */}
      {isAboutPage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-black900-004/90 backdrop-blur-sm border-t border-black400-33">
          <ul className="flex items-center justify-around px-4 py-3">
            {[
              { label: "Hi!", id: "Hi" },
              { label: "Stacks", id: "Stacks" },
              { label: "Exp", id: "Experience" },
              { label: "Beyond", id: "BeyondTheScreen" },
              { label: "Philosophy", id: "DesignPhilosophy" },
            ].map((s) => (
              <li key={s.id}>
                <button
                  onClick={() =>
                    document
                      .getElementById(s.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    section === s.id ? "text-yellow500-F0" : "text-black200-8A"
                  }`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      section === s.id
                        ? "w-4 h-1.5 bg-yellow500-F0"
                        : "w-1.5 h-1.5 bg-black400-33"
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

      <footer className="pb-5">
        <CallToAction />
        <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="space-y-6">
            <h2 className="text-title-md font-medium text-yellow50-FE">
              PROMISE ORIMADEGUN
            </h2>
            <div className="space-y-2">
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
                  <a href={path} target="_blank" rel="noopener noreferrer">
                    <Icon />
                  </a>
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
                  <Link
                    to={link.path}
                    onClick={() => handleNavClick(link.label, link.path)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="text-body-md text-black200-8A text-center mt-10">
          Copyright &#169; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
