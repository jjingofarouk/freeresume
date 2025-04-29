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

const INTERVAL_MS = 50; // 20 Intervals Per Second
const CHARS_PER_INTERVAL = 10;
const RESET_INTERVAL_MS = 60 * 1000; // 60s
const FADE_DURATION = 0.5;

export const AutoTypingResume = () => {
  const [resume, setResume] = useState(deepClone(initialResumeState));
  const resumeCharIterator = useRef(
    makeObjectCharIterator(START_HOME_RESUME, END_HOME_RESUME)
  );
  const hasSetEndResume = useRef(false);
  const { isLg } = useTailwindBreakpoints();
  const controls = useAnimation();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      let next = resumeCharIterator.current.next();
      for (let i = 0; i < CHARS_PER_INTERVAL - 1; i++) {
        next = resumeCharIterator.current.next();
      }
      if (!next.done) {
        await controls.start({ opacity: 0.7, transition: { duration: FADE_DURATION } });
        setResume(next.value);
        await controls.start({ opacity: 1, transition: { duration: FADE_DURATION } });
      } else if (!hasSetEndResume.current) {
        await controls.start({ opacity: 0.7, transition: { duration: FADE_DURATION } });
        setResume(END_HOME_RESUME);
        await controls.start({ opacity: 1, transition: { duration: FADE_DURATION } });
        hasSetEndResume.current = true;
      }
    }, INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [controls]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      resumeCharIterator.current = makeObjectCharIterator(
        START_HOME_RESUME,
        END_HOME_RESUME
      );
      hasSetEndResume.current = false;
      controls.start({ opacity: 0, y: 20 }).then(() => {
        setResume(deepClone(initialResumeState));
        controls.start({ opacity: 1, y: 0, transition: { duration: FADE_DURATION } });
      });
    }, RESET_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [controls]);

  return (
    <motion.div
      className="relative rounded-xl bg-white shadow-lg ring-1 ring-gray-100/50"
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
    >
      <ResumeIframeCSR documentSize="Letter" scale={isLg ? 0.75 : 0.55}>
        <ResumePDF
          resume={resume}
          settings={{
            ...initialSettings,
            fontFamily: "Inter",
            fontSize: "12",
            themeColor: "#6b46c1",
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
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-[color:var(--theme-purple)]/10 to-[color:var(--theme-blue)]/10 opacity-30" />
    </motion.div>
  );
};