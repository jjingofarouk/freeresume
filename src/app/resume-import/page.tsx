"use client";
import { getHasUsedAppBefore } from "lib/redux/local-storage";
import { ResumeDropzone } from "components/ResumeDropzone";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ImportResume.css";

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);

  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {!hasUsedAppBefore ? (
          <>
            <h1 className={styles.title}>
              Kickstart Your Resume with an Existing File
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className={styles.dropzone}
            />
            {!hasAddedResume && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Starting from scratch?"
                  buttonText="Build a New Resume"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedResume && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="Pick Up Where You Left Off"
                  buttonText="Resume My Progress"
                />
                <OrDivider />
              </>
            )}
            <h1 className={styles.title}>
              Update Your Profile with a New Resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className={styles.dropzone}
            />
          </>
        )}
      </div>
    </main>
  );
}

const OrDivider = () => (
  <div className={styles.orDivider} aria-hidden="true">
    <div className={styles.orDividerLine} />
    <span className={styles.orDividerText}>or</span>
    <div className={styles.orDividerLine} />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <div className={styles.actionSection}>
      <p className={styles.subtitle}>{heading}</p>
      <Link href="/resume-builder" className={styles.actionButton}>
        {buttonText}
      </Link>
    </div>
  );
};