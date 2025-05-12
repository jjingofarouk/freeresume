"use client";
import { motion } from "framer-motion";
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
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: isLg,
    adaptiveHeight: true,
    fade: true,
    prevArrow: <button className="slick-prev">←</button>,
    nextArrow: <button className="slick-next">→</button>,
  };

  return (
    <section className="mx-auto py-16 lg:py-24 bg-gray-50">
      <motion.h2
        className="text-center text-4xl font-bold text-gray-900 lg:text-5xl flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Loved by Our Community
        <Image src={heartSrc} alt="love" className="w-8 h-8 text-[color:var(--theme-purple)]" />
      </motion.h2>
      <div className="mx-auto mt-12 max-w-4xl px-6">
        <Slider {...settings}>
          {TESTIMONIALS.map(({ src, quote, name, title }, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-2xl bg-white shadow-md border border-gray-100 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-[color:var(--theme-purple)]/5 rounded-2xl -z-10" />
              <figure className="flex flex-col sm:flex-row items-center gap-6 text-gray-900">
                <motion.div
                  className="relative"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    className="h-24 w-24 lg:h-28 lg:w-28 rounded-full object-cover border-2 border-[color:var(--theme-purple)]/30 transition-all duration-300"
                    src={src}
                    alt={`${name}'s profile`}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-[color:var(--theme-purple)]/10 animate-pulse" />
                </motion.div>
                <div className="text-center sm:text-left">
                  <blockquote className="text-lg lg:text-xl text-gray-700 font-medium">
                    <p className="before:content-['“'] after:content-['”']">{quote}</p>
                  </blockquote>
                  <figcaption className="mt-4">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <div className="font-bold text-xl text-gray-900">{name}</div>
                      <div className="text-gray-500" aria-hidden="true">
                        •
                      </div>
                      <div className="text-gray-600 text-base">{title}</div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            </motion.div>
          ))}
        </Slider>
      </div>
      {children}
    </section>
  );
};