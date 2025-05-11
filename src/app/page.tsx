
"use client";
import { motion } from "framer-motion";
import { Hero } from "home/Hero";
import { Steps } from "home/Steps";
import { Features } from "home/Features";
import { Testimonials } from "home/Testimonials";

export default function Home() {
  return (
    <motion.main
      className="mx-auto max-w-screen-2xl bg-theme-navy px-xs py-xl text-theme-light-gray sm:px-sm md:px-md lg:px-lg xl:px-xl focus-visible:ring-2 focus-visible:ring-theme-emerald focus-visible:ring-offset-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      tabIndex={0}
    >
      <Hero />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Steps />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Features />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Testimonials />
      </motion.div>
    </motion.main>
  );
}