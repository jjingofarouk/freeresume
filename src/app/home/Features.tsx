import Image from "next/image";
import { motion } from "framer-motion";
import featureFreeSrc from "public/assets/feature-free.svg";
import featureUSSrc from "public/assets/feature-us.svg";
import featurePrivacySrc from "public/assets/feature-privacy.svg";
import featureOpenSourceSrc from "public/assets/feature-open-source.svg";
import { Link } from "components/documentation";

const FEATURES = [
  {
    src: featureFreeSrc,
    title: "Free Forever",
    text: "Access professional resume designs at no cost, ensuring everyone can create a standout resume without financial barriers.",
  },
  {
    src: featureUSSrc,
    title: "U.S. Optimized",
    text: "Crafted with U.S. job market best practices, seamlessly compatible with leading ATS platforms like Greenhouse and Lever.",
  },
  {
    src: featurePrivacySrc,
    title: "Privacy First",
    text: "Your data stays secure, stored locally in your browser, giving you full control and peace of mind.",
  },
  {
    src: featureOpenSourceSrc,
    title: "Open-Source",
    text: (
      <>
        Explore and contribute to our open-source project on its{" "}
        <Link href="https://github.com/xitanggg/open-resume" className="text-primary hover:underline">
          GitHub repository
        </Link>
      </>
    ),
  },
];

export const Features = () => {
  return (
    <section className="py-20 lg:py-40 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">Why Choose OpenResume</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the powerful features that make OpenResume the ideal choice for your professional journey.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ src, title, text }, index) => (
            <motion.div
              key={title}
              className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={src}
                  className="h-10 w-10 text-primary"
                  alt={`${title} icon`}
                />
                <h3 className="ml-3 text-xl font-semibold text-gray-900">{title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[color:var(--theme-purple)]/5 to-[color:var(--theme-blue)]/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};