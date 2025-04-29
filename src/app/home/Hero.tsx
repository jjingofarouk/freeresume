import Link from "next/link";
import { motion } from "framer-motion";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:flex lg:min-h-[850px] lg:items-center lg:justify-center lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--theme-purple)]/10 to-[color:var(--theme-blue)]/10" />
      <FlexboxSpacer maxWidth={80} minWidth={0} className="hidden lg:block" />
      <motion.div
        className="mx-auto max-w-2xl text-center lg:mx-0 lg:grow lg:text-left lg:pt-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-primary text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Build Your
          <br />
          Professional Resume
        </h1>
        <p className="mt-4 text-lg text-gray-700 sm:mt-6 sm:text-xl lg:text-2xl">
          Craft a standout resume with our free, open-source, and intuitive builder.
        </p>
        <motion.div
          className="mt-8 flex justify-center lg:mt-12 lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link
            href="/resume-import"
            className="btn-primary flex items-center gap-2 text-base sm:text-lg"
          >
            Create Resume
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
        </motion.div>
        <p className="mt-4 text-sm text-gray-500 sm:text-base lg:mt-6">
          No account needed to get started.
        </p>
        <motion.p
          className="mt-6 text-sm text-gray-500 sm:mt-8 sm:text-base lg:mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Have a resume? Check its ATS compatibility with our{" "}
          <Link
            href="/resume-parser"
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            Resume Parser
          </Link>
        </motion.p>
      </motion.div>
      <FlexboxSpacer maxWidth={120} minWidth={60} className="hidden lg:block" />
      <motion.div
        className="mt-12 flex justify-center lg:mt-0 lg:grow"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative">
          <AutoTypingResume />
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-[color:var(--theme-purple)]/20 to-[color:var(--theme-blue)]/20 blur-xl"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </div>
      </motion.div>
    </section>
  );
};