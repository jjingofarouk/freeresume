"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:flex lg:min-h-[900px] lg:items-center lg:justify-center lg:py-24">
      <div className="absolute inset-0 bg-theme-dark-teal/10" />
      <FlexboxSpacer maxWidth={100} minWidth={0} className="hidden lg:block" />
      <motion.div
        className="mx-auto max-w-3xl text-center lg:mx-0 lg:grow lg:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-primary text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
          Create Your
          <br />
          Professional Resume
        </h1>
        <p className="mt-4 text-lg text-theme-light-gray sm:mt-6 sm:text-xl lg:text-2xl xl:text-3xl">
          Build an ATS-optimized, standout resume with our free, open-source platform.
        </p>
        <motion.div
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:mt-12 lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link
            href="/resume-import"
            className="btn-primary flex items-center gap-2 rounded-xl px-8 py-3 text-base sm:text-lg"
          >
            Start Now
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <Link
            href="/resume-parser"
            className="outline-theme-dark-teal inline-block rounded-xl px-8 py-3 text-base font-semibold text-theme-coral hover:bg-theme-coral/10 sm:text-lg"
          >
            Analyze Resume
          </Link>
        </motion.div>
        <p className="mt-4 text-sm text-theme-light-gray/80 sm:text-base lg:mt-6">
          No account needed. Begin instantly.
        </p>
      </motion.div>
      <FlexboxSpacer maxWidth={150} minWidth={80} className="hidden lg:block" />
      <motion.div
        className="mt-12 flex justify-center lg:mt-0 lg:grow"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="relative">
          <AutoTypingResume />
          <motion.div
            className="absolute inset-0 rounded-2xl bg-theme-coral/10 blur-2xl"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};