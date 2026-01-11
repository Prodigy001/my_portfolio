import { useState } from "react";
import { Link } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import BecomeMerchantCta from "../components/BecomeMerchantCta";
import Carousel from "../components/Carousel";
import PaymentMethods from "../components/PaymentMethods";
import ProgressCircle from "../components/ProgressCircle";
import Referral from "../components/Referral";
import TopTraded from "../components/TopTraded";
import TotalBalance from "../components/TotalBalance";
import TransactionsTable from "../components/TransactionsTable";
import WelcomeModal from "../components/WelcomeModal";
import VerifyPhoneModal from "../components/VerifyPhoneModal";
import PersonalDetailsModal from "../components/PersonalDetailsModal";
import IconArrow from "../icons/IconArrow";
import IconCaret from "../icons/IconCaret";
import IconCoins from "../icons/IconCoins";
import IconLighting from "../icons/IconLighting";
import { onboardingSteps } from "../data";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isPersonalDetailsModalOpen, setIsPersonalDetailsModalOpen] =
    useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(onboardingSteps);

  // Calculate completed steps for progress circle
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);

    // Close welcome modal
    setIsModalOpen(false);

    // Open specific modal based on step
    const step = steps[stepIndex];
    if (step.id === "verify-phone") {
      setIsPhoneModalOpen(true);
    } else if (step.id === "personal-info") {
      setIsPersonalDetailsModalOpen(true);
    }
    // Add more conditions for other steps as needed
  };

  const handlePhoneVerified = () => {
    // Update the verify-phone step as completed
    const updatedSteps = [...steps];
    const phoneStepIndex = updatedSteps.findIndex(
      (step) => step.id === "verify-phone"
    );
    if (phoneStepIndex !== -1) {
      updatedSteps[phoneStepIndex].completed = true;
      setSteps(updatedSteps);
    }
  };

  const handlePersonalDetailsSaved = () => {
    // Update the personal-info step as completed
    const updatedSteps = [...steps];
    const detailsStepIndex = updatedSteps.findIndex(
      (step) => step.id === "personal-info"
    );
    if (detailsStepIndex !== -1) {
      updatedSteps[detailsStepIndex].completed = true;
      setSteps(updatedSteps);
    }
  };

  const handleCompleteProfile = () => {
    setIsModalOpen(true);
  };

  return (
    <main>
      <section className="bg-bg-card max-md:hidden max-xl:space-y-6 xl:grid p-6 rounded-2xl gap-6  grid-flow-col grid-cols-10 grid-rows-[auto_auto]" aria-label="Dashboard overview">
        <TotalBalance />

        <ActionButtons />
        <TopTraded />

        <div className=" self-end col-span-6 flex justify-end">
          <Link
            to="/dashboard/rewards"
            className="hover:bg-bg-hover  rounded-md inline-flex items-center justify-center gap-2"
            aria-label="Navigate to rewards page to earn rewards"
          >
            <span className="text-primary text-2xl" aria-hidden="true">
              <IconCoins />
            </span>{" "}
            Earn Rewards{" "}
            <span className="-rotate-135 text-2xl text-neutral-700" aria-hidden="true">
              <IconArrow />
            </span>
          </Link>
        </div>
      </section>
      <div className="md:hidden">
        <TotalBalance />
      </div>

      <section className="bg-primary-blue-light border-2 border-primary-blue-border p-4 rounded-xl my-6 flex gap-6 justify-between items-start lg:items-center" aria-label="Profile completion">
        <div className="flex gap-6 items-center">
          <ProgressCircle
            current={completedSteps}
            total={totalSteps}
            size={60}
            strokeWidth={7}
          />

          <article>
            <h4 className="text-primary-blue-dark font-bold text-xl text-zabira mb-1.5">
              You’re almost done!
            </h4>
            <p className="text-zabira-dark/36 text-zabira font-medium text-base">
              Finish setting up your account to enjoy benefits
            </p>
          </article>
        </div>

        <button
          type="button"
          className="custom-button max-lg:hidden"
          onClick={handleCompleteProfile}
          aria-label="Complete your profile setup"
        >
          Complete Profile Setup
          <span className="-rotate-135 text-2xl" aria-hidden="true">
            <IconArrow />
          </span>
        </button>
        <button
          type="button"
          className="text-base text-text-tertiary lg:hidden"
          onClick={handleCompleteProfile}
          aria-label="Complete your profile setup"
        >
          <IconCaret />
        </button>
      </section>

      <PaymentMethods />

      <Carousel />
      <div className="md:hidden mb-6">
        <TopTraded />
      </div>

      <TransactionsTable />

      <section className="md:bg-bg-card md:p-6 md:rounded-2xl" aria-label="Additional features">
        <h4 className="flex max-md:hidden items-center gap-2 font-semibold text-lg text-zabira text-text-primary mb-6">
          <span className="text-zabira-green text-[1.25rem]" aria-hidden="true">
            <IconLighting />
          </span>
          Do more on Zabira!
        </h4>

        <div className="xl:flex max-xl:space-y-6 gap-6">
          <BecomeMerchantCta />
          <Referral />
        </div>
      </section>

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {/* Phone Verification Modal */}
      <VerifyPhoneModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onVerified={handlePhoneVerified}
      />

      {/* Personal Details Modal */}
      <PersonalDetailsModal
        isOpen={isPersonalDetailsModalOpen}
        onClose={() => setIsPersonalDetailsModalOpen(false)}
        onSaved={handlePersonalDetailsSaved}
      />
    </main>
  );
};

export default Home;
