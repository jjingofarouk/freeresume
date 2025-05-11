
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

const INTERVAL_MS = 100; // Slower typing speed (10 intervals per second)
const CHARS_PER_INTERVAL = 5; // Fewer characters per interval for smoother effect
const RESET_INTERVAL_MS = 90 * 1000; // 90s pause for readability
const FADE_DURATION = 0.3; // Faster, smoother fade
const PAUSE_DURATION_MS = 5000; // 5s pause at end of typing

export const AutoTypingResume = () => {
  const [resume, setResume] = useState(deepClone(initialResumeState));
  const resumeCharIterator = useRef(
    makeObjectCharIterator(START_HOME_RESUME, END_HOME_RESUME)
  );
  const hasSetEndResume = useRef(false);
  const isPaused = useRef(false);
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
        setTimeout(() => {
          isPaused.current = false;
        }, PAUSE_DURATION_MS);
      }
    };

    const intervalId = setInterval(typeNext, INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [cursorControls]);

  useEffect(() => {
    const reset = async () => {
      resumeCharIterator.current = makeObjectCharIterator(
        START_HOME_RESUME,
        END_HOME_RESUME
      );
      hasSetEndResume.current = false;
      isPaused.current = true;
      await controls.start({ opacity: 0, y: 20, transition: { duration: FADE_DURATION } });
      setResume(deepClone(initialResumeState));
      await controls.start({ opacity: 1, y: 0, transition: { duration: FADE_DURATION } });
      isPaused.current = false;
    };

    const intervalId = setInterval(reset, RESET_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [controls]);

  return (
    <motion.div
      className="relative rounded-2xl bg-white shadow-xl ring-1 ring-theme-dark-navy/20"
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
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