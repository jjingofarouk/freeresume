"use client";
import { useState, useEffect, useCallback } from "react";
import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "components/ResumeDropzone";
import { Heading, Link, Paragraph } from "components/documentation";
import { ResumeTable } from "resume-parser/ResumeTable";
import { ResumeParserAlgorithmArticle } from "resume-parser/ResumeParserAlgorithmArticle";
import "./ResumeParser.css";

const RESUME_EXAMPLES = [
  {
    fileUrl: "resume-example/laverne-resume.pdf",
    description: (
      <span>
        Borrowed from University of La Verne Career Center -{" "}
        <Link href="https://laverne.edu/careers/wp-content/uploads/sites/15/2010/12/Undergraduate-Student-Resume-Examples.pdf">
          Link
        </Link>
      </span>
    ),
  },
  {
    fileUrl: "resume-example/freeresume-resume.pdf",
    description: (
      <span>
        Created with FreeResume resume builder -{" "}
        <Link href="/resume-builder">Link</Link>
      </span>
    ),
  },
];

const defaultFileUrl = RESUME_EXAMPLES[0]["fileUrl"];

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  const fetchPdfText = useCallback(async (url: string) => {
    setIsLoading(true);
    try {
      const items = await readPdf(url);
      setTextItems(items);
    } catch (error) {
      console.error("Error parsing PDF:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPdfText(fileUrl);
  }, [fileUrl, fetchPdfText]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleDownloadReport = () => {
    const report = JSON.stringify(resume, null, 2);
    const blob = new Blob([report], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-parsing-report.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`resume-parser ${theme === "dark" ? "resume-parser--dark" : ""}`}>
      <div className="resume-parser__container">
        {/* Sidebar */}
        <aside className="resume-parser__sidebar">
          <div className="resume-parser__sidebar-header">
            <h1 className="resume-parser__title">Resume Parser</h1>
            <button
              onClick={toggleTheme}
              className="resume-parser__theme-toggle"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
          <nav className="resume-parser__nav">
            <h2 className="resume-parser__subtitle">Example Resumes</h2>
            {RESUME_EXAMPLES.map((example, idx) => (
              <div
                key={idx}
                className={`resume-parser__example-card ${fileUrl === example.fileUrl ? "resume-parser__example-card--active" : ""}`}
                onClick={() => setFileUrl(example.fileUrl)}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key)) setFileUrl(example.fileUrl);
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select Resume Example ${idx + 1}`}
              >
                <h3 className="resume-parser__example-title">Resume Example {idx + 1}</h3>
                <p className="resume-parser__example-description">{example.description}</p>
              </div>
            ))}
            <div className="resume-parser__dropzone">
              <ResumeDropzone
                onFileUrlChange={(url) => setFileUrl(url || defaultFileUrl)}
                playgroundView={true}
              />
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="resume-parser__main">
          <div className="resume-parser__content">
            <div className="resume-parser__header">
              <Heading className="resume-parser__main-title">Resume Parser Playground</Heading>
              <button
                onClick={handleDownloadReport}
                className="resume-parser__download-btn"
                aria-label="Download parsing report"
              >
                Download Report
              </button>
            </div>

            <Paragraph className="resume-parser__description">
              Explore the FreeResume resume parser's capabilities by selecting an example resume or uploading your own. The parser extracts key information, helping you understand how well your resume is formatted for Application Tracking Systems (ATS).
            </Paragraph>

            {/* PDF Viewer */}
            <div className="resume-parser__pdf-container">
              {isLoading && (
                <div className="resume-parser__loading">
                  <div className="resume-parser__spinner"></div>
                </div>
              )}
              <div className="resume-parser__pdf-wrapper">
                <iframe
                  src={`${fileUrl}#navpanes=0`}
                  className="resume-parser__pdf"
                  title="Resume PDF Preview"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Parsing Results */}
            <Heading level={2} className="resume-parser__section-title">
              Parsing Results
            </Heading>
            <ResumeTable resume={resume} />

            {/* Algorithm Details */}
            <ResumeParserAlgorithmArticle
              textItems={textItems}
              lines={lines}
              sections={sections}
            />
          </div>
        </main>
      </div>
    </div>
  );
}