"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ResumePDF } from "components/Resume/ResumePDF";
import { initialResumeState } from "lib/redux/resumeSlice";
import { initialSettings } from "lib/redux/settingsSlice";
import { ResumeIframeCSR } from "components/Resume/ResumeIFrame";
import { START_HOME_RESUME, END_HOME_RESUME } from "home/constants";
import { makeObjectCharIterator } from "lib/make-object-char-iterator";
import { useTailwindBreakpoints } from "lib/hooks/useTailwindBreakpoints";
import { deepClone } from "lib/deep-clone";

const INTERVAL_MS = 100; // Typing speed (10 intervals per second)
const CHARS_PER_INTERVAL = 5; // Characters per interval
const RESET_INTERVAL_MS = 90 * 1000; // 90s reset cycle
const FADE_DURATION = 0.3; // Smooth fade duration
const PAUSE_DURATION_MS = 5000; // 5s pause after typing
const SCROLL_DURATION = 5000; // 5s scroll animation

export const AutoTypingResume = () => {
  const [resume, setResume] = useState(deepClone(initialResumeState));
  const resumeCharIterator = useRef(
    makeObjectCharIterator(START_HOME_RESUME, END_HOME_RESUME)
  );
  const hasSetEndResume = useRef(false);
  const hasScrolled = useRef(false);
  const isPaused = useRef(false);
  const scrollContainerRef = useRef(null);
  const { isSm, isMd, isLg, isXl } = useTailwindBreakpoints();
  const controls = useAnimation();
  const cursorControls = useAnimation();

  // Calculate dynamic scale based on breakpoint
  const getScale = () => {
    if (isXl) return 0.85;
    if (isLg) return 0.75;
    if (isMd) return 0.65;
    if (isSm) return 0.55;
    return 0.45;
  };

  // Auto-scroll animation
  const triggerScroll = async () => {
    if (scrollContainerRef.current && !hasScrolled.current) {
      const container = scrollContainerRef.current;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      await controls.start({
        scrollTop: scrollHeight,
        transition: { duration: SCROLL_DURATION / 1000, ease: "easeInOut" },
      });
      hasScrolled.current = true;
    }
  };

  useEffect(() => {
    const typeNext = async () => {
      if (isPaused.current) return;

      let next = resumeCharIterator.current.next();
      for (let i = 0; i < CHARS_PER_INTERVAL - 1; i++) {
        next = resumeCharIterator.current.next();
      }

      if (!next.done) {
        setResume(next.value);
        await cursorControls.start({ opacity: [1, 0, 1], transition: { duration: 0.5, repeat: 1 } });
      } else if (!hasSetEndResume.current) {
        setResume(END_HOME_RESUME);
        hasSetEndResume.current = true;
        isPaused.current = true;
        setTimeout(async () => {
          await triggerScroll();
          isPaused.current = false;
        }, PAUSE_DURATION_MS);
      }
    };

    const intervalId = setInterval(typeNext, INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [controls, cursorControls]);

  useEffect(() => {
    const reset = async () => {
      resumeCharIterator.current = makeObjectCharIterator(
        START_HOME_RESUME,
        END_HOME_RESUME
      );
      hasSetEndResume.current = false;
      hasScrolled.current = false;
      isPaused.current = true;
      await controls.start({ opacity: 0, y: 20, transition: { duration: FADE_DURATION } });
      setResume(deepClone(initialResumeState));
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0; // Reset scroll position
      }
      await controls.start({ opacity: 1, y: 0, transition: { duration: FADE_DURATION } });
      isPaused.current = false;
    };

    const intervalId = setInterval(reset, RESET_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [controls]);

  return (
    <motion.div
      className="relative rounded-2xl bg-white shadow-xl ring-1 ring-theme-dark-navy/20 overflow-hidden"
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
      style={{ scrollBehavior: "smooth" }}
    >
      <div
        ref={scrollContainerRef}
        className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-theme-gold/50 scrollbar-track-theme-navy/10"
      >
        <ResumeIframeCSR documentSize="Letter" scale={getScale()}>
          <ResumePDF
            resume={resume}
            settings={{
              ...initialSettings,
              fontFamily: "Inter",
              fontSize: "12",
              themeColor: "#2a9d8f", // Emerald green for resume accents
              formToHeading: {
                workExperiences: resume.workExperiences[0].company
                  ? "Work Experience"
                  : "",
                educations: resume.educations[0].school ? "Education" : "",
                projects: resume.projects[0].project ? "Projects" : "",
                skills: resume.skills.featuredSkills[0].skill ? "Skills" : "",
                custom: "Custom Section",
              },
            }}
          />
        </ResumeIframeCSR>
      </div>
      <motion.div
        className="absolute right-4 top-4 h-2 w-2 rounded-full bg-theme-emerald"
        animate={cursorControls}
        initial={{ opacity: 1 }}
      />
      <div className="absolute inset-0 rounded-2xl bg-theme-emerald/5 pointer-events-none" />
      <div className="absolute -inset-1 rounded-2xl bg-theme-gold/10 blur-xl opacity-20" />
    </motion.div>
  );
};