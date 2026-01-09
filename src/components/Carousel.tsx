import { useState, useEffect } from "react";
import cryptoLight from "../assets/crypto-light.png";
import coins from "../assets/coins.svg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselItems = [
    {
      id: 1,
      text: "SELL & GAIN up to ₦50 on every $ Crypto Trade",
      gradient: "bg-gradient-green",
      image: cryptoLight,
      imageAlt: "Crypto currencies",
    },
    {
      id: 2,
      text: "Speed UP Your Crypto, Giftcard & Bill Payments",
      gradient: "bg-gradient-purple",
      image: null,
      imageAlt: null,
    },
    {
      id: 3,
      text: "Earn Rewards on Every Transaction You Make",
      gradient: "bg-gradient-to-r from-blue-600 to-blue-400",
      image: coins,
      imageAlt: "Rewards",
    },
    {
      id: 4,
      text: "Trade Bitcoin, Ethereum & 100+ Cryptocurrencies",
      gradient: "bg-gradient-to-r from-orange-500 to-orange-300",
      image: cryptoLight,
      imageAlt: "Bitcoin and Ethereum",
    },
    {
      id: 5,
      text: "Buy Gift Cards from Amazon, iTunes & More",
      gradient: "bg-gradient-to-r from-pink-600 to-pink-400",
      image: null,
      imageAlt: null,
    },
    {
      id: 6,
      text: "Pay Bills Instantly with Zero Fees",
      gradient: "bg-gradient-to-r from-green-600 to-green-400",
      image: null,
      imageAlt: null,
    },
    {
      id: 7,
      text: "24/7 Customer Support & Instant Withdrawals",
      gradient: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      image: null,
      imageAlt: null,
    },
    {
      id: 8,
      text: "Secure Your Money with Military-Grade Encryption",
      gradient: "bg-gradient-to-r from-red-600 to-red-400",
      image: null,
      imageAlt: null,
    },
  ];

  const itemsPerView = {
    mobile: 1,
    desktop: 2,
  };

  const totalSlidesDesktop = Math.ceil(
    carouselItems.length / itemsPerView.desktop
  );
  const totalSlidesMobile = Math.ceil(
    carouselItems.length / itemsPerView.mobile
  );

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlidesDesktop);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlidesDesktop]);

  const getTranslateValue = () => {
    return -currentIndex * 100;
  };

  return (
    <section className="mb-6">
      <div>
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <ul
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(${getTranslateValue()}%)`,
            }}
          >
            {carouselItems.map((item) => (
              <li
                key={item.id}
                className={`${item.gradient} bg-clip-padding p-6 border-[3px] overflow-hidden rounded-2xl border-white/18 flex gap-4 items-center justify-around w-full lg:w-1/2 shrink-0`}
              >
                {item.image && <img src={item.image} alt={item.imageAlt} />}
                <p className="text-zabira text-lg md:text-2xl font-semibold text-white flex-1">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Indicators */}
        <div className="flex gap-1 items-center justify-center mt-4">
          {Array.from({ length: totalSlidesDesktop }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setCurrentIndex(index);
              }}
              className={`transition-colors duration-300 w-4.5 h-1 rounded-xs ${
                index === currentIndex ? "bg-[#A1A1AA]" : "bg-[#E1E1E2]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
