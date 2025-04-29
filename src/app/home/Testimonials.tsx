"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import heartSrc from "public/assets/heart.svg";
import testimonialSpiegelSrc from "public/assets/testimonial-spiegel.jpg";
import testimonialSantiSrc from "public/assets/testimonial-santi.jpg";
import testimonialVivianSrc from "public/assets/testimonial-vivian.jpg";
import React, { useEffect, useRef, useState } from "react";
import { useTailwindBreakpoints } from "lib/hooks/useTailwindBreakpoints";

const TESTIMONIALS = [
  {
    src: testimonialSpiegelSrc,
    quote:
      "FreeResume’s auto-format feature ensures consistent styling, saving students from common resume mistakes like mismatched fonts or bullet points.",
    name: "Ms. Spiegel",
    title: "Educator",
  },
  {
    src: testimonialSantiSrc,
    quote:
      "Thanks to FreeResume’s sleek, professional design, I landed interviews at top tech companies like Google and Amazon during my job search.",
    name: "Santi",
    title: "Software Engineer",
  },
  {
    src: testimonialVivianSrc,
    quote:
      "FreeResume made creating a professional resume effortless, saving me time and stress compared to wrestling with Google Docs templates.",
    name: "Vivian",
    title: "College Student",
  },
];

const ROTATION_INTERVAL_MS = 8 * 1000; // 8s

export const Testimonials = ({ children }: { children?: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isHoveredOnTestimonial = useRef(false);
  const controls = useAnimation();
  const { isLg } = useTailwindBreakpoints();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHoveredOnTestimonial.current) {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        });
      }
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [controls]);

  return (
    <section className="mx-auto py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <motion.h2
        className="text-center text-4xl font-bold text-gray-900 lg:text-5xl flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Loved by Our Community
        <Image src={heartSrc} alt="love" className="w-8 h-8 text-primary" />
      </motion.h2>
      <div className="mx-auto mt-12 max-w-4xl px-6">
        <div className="relative">
          {TESTIMONIALS.map(({ src, quote, name, title }, idx) => (
            <motion.div
              key={idx}
              className={`absolute inset-0 rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-500 ${
                idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              animate={controls}
              onMouseEnter={() => (isHoveredOnTestimonial.current = true)}
              onMouseLeave={() => (isHoveredOnTestimonial.current = false)}
            >
              <figure className="flex flex-col sm:flex-row items-center gap-6 p-6 lg:p-8 text-gray-900">
                <Image
                  className="h-20 w-20 rounded-full object-cover border-2 border-[color:var(--theme-purple)]/20"
                  src={src}
                  alt={`${name}'s profile`}
                />
                <div className="text-center sm:text-left">
                  <blockquote className="text-lg text-gray-700 italic">
                    <p className="before:content-['“'] after:content-['”']">{quote}</p>
                  </blockquote>
                  <figcaption className="mt-4">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <div className="font-semibold text-gray-900">{name}</div>
                      <div className="text-gray-500" aria-hidden="true">
                        •
                      </div>
                      <div className="text-gray-600">{title}</div>
                    </div>
                  </figcaption>
                </div>
              </figure>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[color:var(--theme-purple)]/5 to-[color:var(--theme-blue)]/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
        {isLg && (
          <div className="flex justify-center mt-8 gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "bg-primary w-4" : "bg-gray-300"
                }`}
                onClick={() => {
                  setActiveIndex(idx);
                  controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
                }}
              />
            ))}
          </div>
        )}
      </div>
      {children}
    </section>
  );
};