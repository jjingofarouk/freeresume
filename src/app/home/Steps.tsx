import { motion } from "framer-motion";

const STEPS = [
  {
    title: "Start Your Resume",
    text: "Upload an existing PDF or build a new one from scratch.",
  },
  {
    title: "Customize & Preview",
    text: "Easily edit and see your professional design come to life.",
  },
  {
    title: "Download & Apply",
    text: "Export your polished resume and apply with confidence.",
  },
];

export const Steps = () => {
  return (
    <section className="mx-auto mt-12 py-16 lg:mt-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <motion.h1
        className="text-center text-4xl font-bold text-gray-900 lg:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Create Your Resume in 3 Easy Steps
      </motion.h1>
      <div className="mt-12 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {STEPS.map(({ title, text }, idx) => (
            <motion.div
              key={idx}
              className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary rounded-full h-10 w-10 flex items-center justify-center text-white font-bold text-xl">
                {idx + 1}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{text}</p>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[color:var(--theme-purple)]/5 to-[color:var(--theme-blue)]/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};