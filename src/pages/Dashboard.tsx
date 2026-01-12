import { Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navigation from "../components/Navigation";
import TopPanel from "../components/TopPanel";
import Home from "./Home";

function Dashboard() {
  const { sidebarOpen, setSidebarOpen } = useApp();

  return (
    <div className="flex h-screen bg-neutral-200">
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative md:w-64 w-64 h-screen bg-bg-card z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Main navigation"
      >
        <Navigation />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Panel */}
        <header className="sticky top-0 z-30 bg-bg-card panel-top-shadow">
          <TopPanel onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6" id="main-content">
          <Outlet context={{ Home }} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
