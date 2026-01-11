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
    navigate("/auth/login");
  };

  return (
    <>
      <section className="bg-bg-card rounded-2xl p-6 mb-6">
        <h1 className="font-bold text-2xl text-text-primary mb-2">Settings</h1>
        <p className="text-text-tertiary text-base">
          Manage your account and preferences
        </p>
      </section>

      <section className="bg-bg-card rounded-2xl p-6">
        <div className="space-y-6">
          {/* Account Information */}
          <div>
            <h3 className="font-semibold text-lg text-text-primary mb-4">
              Account Information
            </h3>
            <div className="bg-neutral-200 rounded-lg p-4">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-text-tertiary mb-1">Email Address</p>
                  <p className="font-semibold text-sm text-text-primary">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsPersonalDetailsModalOpen(true)}
              className="w-full mt-4 py-3 px-4 bg-zabira-dark text-neutral-50 rounded-lg text-sm font-semibold hover:bg-neutral-800 transition-colors"
              aria-label="Update your personal details"
            >
              Update Personal Details
            </button>
          </div>

          {/* Logout Section */}
          <div>
            <h3 className="font-semibold text-lg text-text-primary mb-4">
              Account Actions
            </h3>
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
              aria-label="Logout from your account"
            >
              Logout from Account
            </button>
          </div>

          {/* Placeholder for future settings */}
          <div className="pt-6 border-t border-border-light">
            <div className="text-center py-8">
              <p className="text-text-tertiary text-base mb-4">More settings</p>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-light rounded-full" aria-hidden="true">
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
          // In production, show a success toast notification
          setIsPersonalDetailsModalOpen(false);
        }}
      />
    </>
  );
}

export default Settings;
