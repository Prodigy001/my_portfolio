import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import IconPerson from "../icons/IconPerson";
import IconCalendar from "../icons/IconCalendar";
import IconVerifyEmail from "../icons/IconVerifyEmail";
import IconVerify from "../icons/IconVerify";

interface PersonalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

// Animation styles for checkmark confirmation
const confirmationAnimationStyles = `
  @keyframes scaleIn {
    0% {
      transform: scale(0.4);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes ringPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.15);
      opacity: 0.5;
    }
  }

  .checkmark-container {
    animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .checkmark-ring {
    animation: ringPulse 2s ease-in-out infinite;
  }

  .checkmark-ring-2 {
    animation: ringPulse 2s ease-in-out 0.3s infinite;
  }

  .checkmark-ring-static {
    transform: scale(1);
    opacity: 1;
  }
`;

// Loading Animation Component
const LoadingAnimation = ({ isComplete }: { isComplete?: boolean }) => (
  <div className="flex items-center justify-center py-12">
    <style>{confirmationAnimationStyles}</style>
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Outer pulsing ring */}
      <div
        className={`absolute w-24 h-24 rounded-full border-2 border-[#D1F5E8] bg-[#F0FBF9] ${
          isComplete ? "checkmark-ring-static" : "checkmark-ring"
        }`}
      />
      {/* Inner pulsing ring */}
      <div
        className={`absolute w-16 h-16 rounded-full border-2 border-[#B8EFE4] ${
          isComplete ? "checkmark-ring-static" : "checkmark-ring-2"
        }`}
      />
      {/* Checkmark */}
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="checkmark-container relative z-10"
      >
        <path
          d="M16.3465 24.5196L21.5256 29.1807C22.4072 29.9742 23.7771 29.8527 24.5053 28.9164L32.6927 18.3898M24.5196 44.9523C35.8043 44.9523 44.9523 35.8043 44.9523 24.5196C44.9523 13.2349 35.8043 4.08691 24.5196 4.08691C13.2349 4.08691 4.08691 13.2349 4.08691 24.5196C4.08691 35.8043 13.2349 44.9523 24.5196 44.9523Z"
          stroke="#1DC660"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

const PersonalDetailsModal = ({
  isOpen,
  onClose,
  onSaved,
}: PersonalDetailsModalProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
  });

  const validateUsername = (username: string) => {
    if (!username) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";

    const hasLetter = /[a-zA-Z]/.test(username);
    const hasNumber = /[0-9]/.test(username);

    if (!hasLetter || !hasNumber) {
      return "Username must contain letter and number";
    }

    return "";
  };

  const validateName = (name: string, field: string) => {
    if (!name) return `${field} is required`;
    if (name.length < 2) return `${field} must be at least 2 characters`;
    if (!/^[a-zA-Z\s]+$/.test(name))
      return `${field} must contain only letters`;
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user types
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSave = async () => {
    // Validate all fields
    const usernameError = validateUsername(formData.username);
    const firstnameError = validateName(formData.firstname, "Firstname");
    const lastnameError = validateName(formData.lastname, "Lastname");

    if (usernameError || firstnameError || lastnameError) {
      setErrors({
        username: usernameError,
        firstname: firstnameError,
        lastname: lastnameError,
        dateOfBirth: "",
      });
      return;
    }

    // Simulate API call
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
    }, 1500);
  };

  const handleDone = () => {
    // Save to localStorage or context
    const savedUser = localStorage.getItem("zabira_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const updatedUser = {
        ...user,
        ...formData,
      };
      localStorage.setItem("zabira_user", JSON.stringify(updatedUser));
    }

    // Reset and close
    setIsSaved(false);
    setIsSaving(false);
    setFormData({
      username: "",
      firstname: "",
      lastname: "",
      dateOfBirth: "",
    });
    setErrors({
      username: "",
      firstname: "",
      lastname: "",
      dateOfBirth: "",
    });

    if (onSaved) onSaved();
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {isSaving || isSaved ? (
        // Confirmation Screen copied from Email Verification style
        <div className=" text-black p-9 rounded-2xl bg-white shadow-[0px_2px_4px_-1px_#FFFFFF14,0px_1px_0px_0px_#FFFFFF14] space-y-6">
          <div className="w-full flex justify-center items-center">
            <IconVerifyEmail />
          </div>
          <div className="space-y-2">
            <h1 className="text-center font-bold leading-[124%] -tracking-[1.2%] text-2xl text-[#1A1A1A]">
              {isSaved ? "Personal Details Saved!" : "Saving..."}
            </h1>
            <p className="text-center text-base leading-[140%] -tracking-[1%] text-[#1A1A1AB2]">
              {isSaved
                ? "Your personal information has been updated successfully."
                : "Please wait while we save your information."}
            </p>
          </div>
          {isSaved && (
            <div>
              <button
                type="button"
                onClick={handleDone}
                className="h-11 w-full flex items-center gap-2 justify-center custom-button text-white rounded-md font-medium  transition-colors disabled:bg-[#F4F4F5] disabled:text-[#1A1A1A2E] disabled:cursor-not-allowed "
              >
                Done
              </button>
            </div>
          )}
        </div>
      ) : (
        // Form Screen
        <div className="p-6">
          <h2 className="text-2xl font-bold text-zabira-dark mb-2">
            Add personal information
          </h2>
          <p className="text-sm text-zabira-dark/60 mb-6">
            Add your personal information to begin transacting.
          </p>

          <div className="space-y-4">
            {/* Username */}
            <div>
              <div className="border border-[#E1E1E2] focus-within:border-zabira-blue rounded-lg p-4">
                <label
                  htmlFor="personal-username"
                  className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]"
                >
                  Username
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-6 min-w-6 flex items-center justify-center">
                    <IconPerson
                      stroke={formData.username ? "#0044EE" : "#819099"}
                    />
                  </div>
                  <input
                    id="personal-username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
                  />
                </div>
              </div>
              {!errors.username && (
                <p className="text-xs text-[#1A1A1A5C] mt-2 flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="16"
                      height="16"
                      rx="8"
                      fill={
                        formData.username &&
                        /[a-zA-Z]/.test(formData.username) &&
                        /[0-9]/.test(formData.username)
                          ? "#1DC660"
                          : "#C7CDD1"
                      }
                    />
                    <path
                      d="M4.26666 8.53301L6.14742 10.0376C6.58866 10.3906 7.22861 10.3383 7.60661 9.91825L11.7333 5.33301"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Username must contain letter and number
                </p>
              )}
              {errors.username && (
                <p className="text-xs text-red-600 mt-2">{errors.username}</p>
              )}
            </div>

            {/* Firstname */}
            <div>
              <div className="border border-[#E1E1E2]  focus-within:border-zabira-blue rounded-lg p-4">
                <label
                  htmlFor="personal-firstname"
                  className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]"
                >
                  Firstname
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-6 min-w-6 flex items-center justify-center">
                    <IconPerson
                      stroke={formData.firstname ? "#0044EE" : "#819099"}
                    />
                  </div>
                  <input
                    id="personal-firstname"
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    placeholder="Enter firstname"
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
                  />
                </div>
              </div>
              {errors.firstname && (
                <p className="text-xs text-red-600 mt-2">{errors.firstname}</p>
              )}
            </div>

            {/* Lastname */}
            <div>
              <div className="border border-[#E1E1E2] focus-within:border-zabira-blue rounded-lg p-4">
                <label
                  htmlFor="personal-lastname"
                  className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]"
                >
                  Lastname
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-6 min-w-6 flex items-center justify-center">
                    <IconPerson
                      stroke={formData.lastname ? "#0044EE" : "#819099"}
                    />
                  </div>
                  <input
                    id="personal-lastname"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    placeholder="Enter lastname"
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
                  />
                </div>
              </div>
              {errors.lastname && (
                <p className="text-xs text-red-600 mt-2">{errors.lastname}</p>
              )}
            </div>

            {/* Date of Birth (Optional) */}
            <div>
              <div className="border border-[#E1E1E2] focus-within:border-zabira-blue rounded-lg p-4">
                <label
                  htmlFor="personal-dob"
                  className="font-semibold leading-[124%] -tracking-[1.2%] text-sm text-[#1A1A1AB2]"
                >
                  Date of Birth (Optional)
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-6 min-w-6 flex items-center justify-center">
                    <IconCalendar
                      stroke={formData.dateOfBirth ? "#0044EE" : "#819099"}
                    />
                  </div>
                  <input
                    id="personal-dob"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    placeholder="Choose date of birth"
                    className="outline-none placeholder:leading-[140%] placeholder:-tracking-[1%] placeholder:text-[#1A1A1A5C] w-full"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              className="w-full custom-button "
            >
              <span className="text-2xl">
                <IconVerify />
              </span>
              Save
            </button>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};

export default PersonalDetailsModal;
