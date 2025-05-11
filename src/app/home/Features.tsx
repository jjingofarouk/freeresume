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
        <Link
          href="https://github.com/jjingofarouk/freeresume"
          className="text-primary hover:underline"
        >
          GitHub repository
        </Link>
      </>
    ),
  },
];

export const Features = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Why Choose FreeResume
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Discover the powerful features that make FreeResume the ideal choice
            for your professional journey.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ src, title, text }, index) => (
            <motion.div
              key={title}
              className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex items-center">
                <Image
                  src={src}
                  className="text-primary h-10 w-10"
                  alt={`${title} icon`}
                />
                <h3 className="ml-3 text-xl font-semibold text-gray-900">
                  {title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{text}</p>
              <div className="from-[color:var(--theme-purple)]/5 to-[color:var(--theme-blue)]/5 absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
