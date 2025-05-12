"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import heartSrc from "public/assets/heart.svg";
import testimonialSpiegelSrc from "public/assets/testimonial-spiegel.jpg";
import testimonialSantiSrc from "public/assets/testimonial-santi.jpg";
import testimonialVivianSrc from "public/assets/testimonial-vivian.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTailwindBreakpoints } from "lib/hooks/useTailwindBreakpoints";
import "./carousel.css"

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

export const Testimonials = ({ children }: { children?: React.ReactNode }) => {
  const { isLg } = useTailwindBreakpoints();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: isLg,
    adaptiveHeight: true,
    prevArrow: <button className="slick-prev">←</button>,
    nextArrow: <button className="slick-next">→</button>,
  };

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
        <Slider {...settings}>
          {TESTIMONIALS.map(({ src, quote, name, title }, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6 lg:p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <figure className="flex flex-col sm:flex-row items-center gap-6 text-gray-900">
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
        </Slider>
      </div>
      {children}
    </section>
  );
};