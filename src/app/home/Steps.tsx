// src/app/home/Steps.tsx
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

// Dynamic import for Lottie player
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), {
  ssr: false,
});

const STEPS = [
  {
    title: "Initiate Your Resume",
    text: "Seamlessly import existing documents or create a new resume with our enterprise-grade builder.",
    lottieSrc: "/assets/lottie/resume-start.json",
  },
  {
    title: "Tailor & Visualize",
    text: "Leverage intuitive editing tools and real-time previews to craft a professional resume.",
    lottieSrc: "/assets/lottie/resume-customize.json",
  },
  {
    title: "Export & Succeed",
    text: "Download your ATS-optimized resume and confidently apply to top-tier opportunities.",
    lottieSrc: "/assets/lottie/resume-download.json",
  },
];

export const Steps = () => {
  const sliderRef = useRef<Slider | null>(null);

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    prevArrow: <button className="slick-prev">←</button>,
    nextArrow: <button className="slick-next">→</button>,
  };

  return (
    <section className="bg-theme-navy py-[var(--spacing-xl)]">
      <motion.h1
        className="text-center text-4xl font-bold text-theme-light-gray lg:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Build Your Resume in 3 Seamless Steps
      </motion.h1>
      <div className="mt-[var(--spacing-lg)] max-w-4xl mx-auto px-[var(--spacing-md)]">
        <Slider ref={sliderRef} {...settings}>
          {STEPS.map(({ title, text, lottieSrc }, idx) => (
            <div key={idx} className="px-[var(--spacing-sm)]">
              <motion.div
                className="relative rounded-2xl border border-theme-dark-navy bg-theme-dark-navy/50 p-[var(--spacing-md)] shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-theme-emerald to-theme-gold" />
                <div className="relative z-10 text-center flex flex-col items-center">
                  <div className="h-32 w-32 mb-[var(--spacing-sm)]">
                    <Player
                      autoplay
                      loop
                      src={lottieSrc}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-theme-light-gray">{title}</h3>
                  <p className="mt-[var(--spacing-xs)] text-sm text-theme-light-gray/80 leading-relaxed max-w-md">
                    {text}
                  </p>
                  <div className="absolute -top-4 left-4 bg-theme-emerald rounded-full h-8 w-8 flex items-center justify-center text-theme-black font-bold text-lg">
                    {idx + 1}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-theme-emerald/10 to-theme-dark-navy/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};