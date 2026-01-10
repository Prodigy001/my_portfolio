import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import IconLogoSingle from "../icons/IconLogoSingle";
import IconRings from "../icons/IconRings";

function Splash() {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/auth/sign-up");
      }
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate, isAuthenticated]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center animate-pulse">
      <div className="absolute">
        <IconRings />
      </div>
      <div className="absolute">
        <IconLogoSingle />
      </div>
    </div>
  );
}

export default Splash;
