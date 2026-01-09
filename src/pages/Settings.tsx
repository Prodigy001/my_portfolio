import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PersonalDetailsModal from "../components/PersonalDetailsModal";

function Settings() {
  const navigate = useNavigate();
  const { logout, user } = useApp();
  const [isPersonalDetailsModalOpen, setIsPersonalDetailsModalOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main>
      <section className="bg-white rounded-2xl p-6 mb-6">
        <h1 className="font-bold text-2xl text-[#1A1A1A] mb-2">Settings</h1>
        <p className="text-[#1A1A1A5C] text-base">
          Manage your account and preferences
        </p>
      </section>

      <section className="bg-white rounded-2xl p-6">
        <div className="space-y-6">
          {/* Account Information */}
          <div>
            <h3 className="font-semibold text-lg text-[#1A1A1A] mb-4">
              Account Information
            </h3>
            <div className="bg-[#F4F4F5] rounded-lg p-4">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-[#1A1A1A5C] mb-1">Email Address</p>
                  <p className="font-semibold text-sm text-[#1A1A1A]">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsPersonalDetailsModalOpen(true)}
              className="w-full mt-4 py-3 px-4 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-[#2A2A2A] transition-colors"
            >
              Update Personal Details
            </button>
          </div>

          {/* Logout Section */}
          <div>
            <h3 className="font-semibold text-lg text-[#1A1A1A] mb-4">
              Account Actions
            </h3>
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
            >
              Logout from Account
            </button>
          </div>

          {/* Placeholder for future settings */}
          <div className="pt-6 border-t border-[#EDEDED]">
            <div className="text-center py-8">
              <p className="text-[#1A1A1A5C] text-base mb-4">More settings</p>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#EBF0FF] rounded-full">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Details Modal */}
      <PersonalDetailsModal
        isOpen={isPersonalDetailsModalOpen}
        onClose={() => setIsPersonalDetailsModalOpen(false)}
        onSaved={() => {
          // Optionally show a success message or update UI
          console.log("Personal details saved successfully");
        }}
      />
    </main>
  );
}

export default Settings;
