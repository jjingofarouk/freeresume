// src/components/Features.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { LucideIcon, Lock, Globe, FileText, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CSS_VARIABLES } from "globals-css";

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

const FEATURES: Feature[] = [
  {
    icon: FileText,
    title: "Enterprise-Grade Templates",
    text: "Access professionally designed resume templates optimized for global job markets, ensuring ATS compatibility with platforms like Workday and Taleo.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    text: "Crafted to meet international hiring standards, supporting multi-language and region-specific resume formats for seamless global applications.",
  },
  {
    icon: Shield,
    title: "Data Security",
    text: "Enterprise-level encryption and secure cloud storage ensure your data remains protected, with compliance to GDPR and CCPA standards.",
  },
  {
    icon: Lock,
    title: "Access Control",
    text: "Granular permission settings allow secure collaboration with HR teams while maintaining strict confidentiality and audit trails.",
  },
];

export const Features = () => {
  const [scrollX, setScrollX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      const totalWidth = carouselRef.current.scrollWidth;
      const visibleWidth = carouselRef.current.offsetWidth;
      setCarouselWidth(totalWidth);
      setContainerWidth(visibleWidth);
    }

    const scrollInterval = setInterval(() => {
      setScrollX((prev) => {
        const maxScroll = carouselWidth - containerWidth;
        if (prev >= maxScroll) return 0;
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(scrollInterval);
  }, [carouselWidth, containerWidth]);

  return (
    <section
      className="bg-theme-navy py-[var(--spacing-xl)]"
      style={{ backgroundImage: "var(--background-dot)" }}
    >
      <div className="mx-auto max-w-7xl px-[var(--spacing-md)]">
        <motion.div
          className="mb-[var(--spacing-lg)] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-theme-light-gray lg:text-4xl">
            Enterprise Resume Solutions
          </h2>
          <p className="mx-auto mt-[var(--spacing-sm)] max-w-2xl text-lg text-theme-light-gray/80">
            Empower your workforce with cutting-edge tools for professional resume creation.
          </p>
        </motion.div>
        <div className="relative overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex gap-[var(--spacing-md)]"
            animate={{ x: -scrollX }}
            transition={{ type: "tween", ease: "linear" }}
          >
            {FEATURES.map(({ icon: Icon, title, text }, index) => (
              <motion.div
                key={title}
                className="min-w-[280px] rounded-2xl border border-theme-dark-navy bg-theme-dark-navy/50 p-[var(--spacing-md)] shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-[var(--spacing-sm)] flex items-center">
                  <Icon className="h-8 w-8 text-theme-emerald" />
                  <h3 className="ml-[var(--spacing-sm)] text-xl font-semibold text-theme-light-gray">
                    {title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-theme-light-gray/80">{text}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-theme-navy to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-theme-navy to-transparent" />
        </div>
      </div>
    </section>
  );
};