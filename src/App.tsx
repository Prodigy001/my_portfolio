import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import LinkedIn from "./icons/LinkedIn";
import Twitter from "./icons/Twitter";
import TikTok from "./icons/TikTok";

const headerLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Work",
    path: "/",
  },
  {
    label: "Playground",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
];

const footerSocials = [
  {
    Icon: LinkedIn,
    path: "/linkedIn",
  },
  {
    Icon: Twitter,
    path: "/twitter",
  },
  {
    Icon: TikTok,
    path: "/tiktok",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const location = useLocation();
  const [section, setSection] = useState("Hi");

  function isElementInViewPort(el: HTMLElement) {
    let elementTop = el.getBoundingClientRect().top;
    let screenHeight = window.innerHeight;
    return elementTop > 0 && elementTop < screenHeight;
  }

  function changePage(page: string) {
    setCurrentPage(page);
  }

  function useThrottledScroll(limit = 10000) {
    const pathname = location.pathname;
    if (!pathname.includes("about")) {
      return;
    }
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
    if (callback) {
      callback();
    }
  }

  return (
    <section
      onScroll={onScrollCb}
      className="h-screen w-full overflow-auto no-scrollbar bg-black900-004"
    >
      <header className="top-0 fixed z-10 w-full  p-5 flex items-center justify-between">
        <div className="bg-black900-004 p-1">
          <h1 className="font-medium text-title-md  text-yellow50-FE">
            PROMISE ORIMADEGUN
          </h1>
          <h2 className="text-body-sm text-black700-A3">
            Product designer & UX Strategist
          </h2>
        </div>
        <nav>
          <ul className="border border-black400-33 bg-[#F0CB030D] backdrop-blur-sm py-2 px-4 rounded-lg flex  gap-8">
            {headerLinks.map((link) => (
              <li
                key={link.label}
                className={` ${link.label === currentPage ? "bg-yellow500-F0 border-black300-54 text-black500-00A" : "border-transparent text-yellow50-FE hover:bg-yellow500-F0/10"} rounded-sm   border  font-medium  text-label-md`}
              >
                <Link
                  to={link.path}
                  onClick={() => changePage(link.label)}
                  className=" block p-2 size-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <p>{location.pathname}</p>
      <Outlet context={{ section }} />;
      <footer className="pb-10">
        <div className="w-[80%] mx-auto flex items-center justify-between">
          <div className="space-y-6">
            <h2 className="text-title-md font-medium  text-yellow50-FE">
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
            <div>
              <nav className="flex items-center gap-6">
                {footerSocials.map(({ Icon, path }) => {
                  return (
                    <figure
                      key={path}
                      className="size-5 bg-black50-E bg-black900-004"
                    >
                      <Link to={path}>
                        <Icon />
                      </Link>
                    </figure>
                  );
                })}
              </nav>
            </div>
          </div>
          <nav>
            <ul className="space-y-10">
              {headerLinks.map((link) => {
                return (
                  <li
                    key={link.label}
                    className="text-title-md text-black50-E6  hover:text-yellow500-F0"
                  >
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <p className="text-body-md text-black200-8A text-center">
          Copyright &#169; {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}

export default App;
