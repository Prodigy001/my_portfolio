import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconLogoSingle from "../icons/IconLogoSingle";
import IconRings from "../icons/IconRings";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/sign-up");
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

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
