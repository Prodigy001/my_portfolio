import { useNavigate } from "react-router-dom";
import IconArrow from "../icons/IconArrow";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#F4F4F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <section className="bg-white rounded-2xl p-8 text-center space-y-6">
          {/* 404 Display */}
          <div className="space-y-2">
            <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zabira-blue to-[#22A0FC]">
              404
            </h1>
            <p className="text-sm tracking-widest uppercase text-[#52525B] font-semibold">
              Page Not Found
            </p>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-zabira-dark">
              Oops! We couldn't find that page.
            </h2>
            <p className="text-sm text-[#1A1A1A5C] leading-relaxed">
              The page you're looking for might have been moved or no longer
              exists. Let's get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="custom-button w-full"
            >
              Go to Dashboard
              <span className="-rotate-135 text-xl">
                <IconArrow />
              </span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full inline-flex hover:bg-[#E1E1E2] items-center justify-center gap-2 bg-white border border-[#1A1A1A1F] text-zabira-dark rounded-md py-2.5 px-4 font-semibold text-base transition-colors"
            >
              Go Home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full text-zabira-blue hover:underline font-medium text-sm py-2"
            >
              Go Back
            </button>
          </div>

          {/* Decorative Element */}
          <div className="pt-6 border-t border-[#1A1A1A0F]">
            <p className="text-xs text-[#52525B]">
              Error Code: 404 | Page Not Found
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default NotFound;
