"use client";
import { getHasUsedAppBefore } from "lib/redux/local-storage";
import { ResumeDropzone } from "components/ResumeDropzone";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./ImportResume.css";

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
    <main className="main">
      <div className="container">
        {!hasUsedAppBefore ? (
          <>
            <h1 className="title">
              Kickstart Your Resume with an Existing File
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="dropzone"
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
            <h1 className="title">
              Update Your Profile with a New Resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="dropzone"
            />
          </>
        )}
      </div>
    </main>
  );
}

const OrDivider = () => (
  <div className="or-divider" aria-hidden="true">
    <div className="or-divider-line" />
    <span className="or-divider-text">or</span>
    <div className="or-divider-line" />
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
    <div className="action-section">
      <p className="subtitle">{heading}</p>
      <Link href="/resume-builder" className="action-button">
        {buttonText}
      </Link>
    </div>
  );
};