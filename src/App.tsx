import { useState } from "react";
import Navigation from "./components/Navigation";
import TopPanel from "./components/TopPanel";
import Home from "./pages/Home";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative md:w-64 w-64 h-screen bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Navigation />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Panel */}
        <header className="sticky top-0 z-30 bg-white panel-top-shadow">
          <TopPanel onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Home />
        </main>
      </div>
    </div>
  );
}

export default App;
