import { isBold } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import {
  Badge,
  Heading,
  Link,
  Paragraph,
  Table,
} from "components/documentation";
import type {
  Line,
  Lines,
  ResumeSectionToLines,
  TextItem,
  TextItems,
  TextScores,
} from "lib/parse-resume-from-pdf/types";
import { extractProfile } from "lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile";
import "./ResumeParser.css";

export const ResumeParserAlgorithmArticle = ({
  textItems,
  lines,
  sections,
}: {
  textItems: TextItems;
  lines: Lines;
  sections: ResumeSectionToLines;
}) => {
  const getBadgeContent = (item: TextItem) => {
    const X1 = Math.round(item.x);
    const X2 = Math.round(item.x + item.width);
    const Y = Math.round(item.y);
    let content = `X₁=${X1} X₂=${X2} Y=${Y}`;
    if (X1 === X2) {
      content = `X=${X2} Y=${Y}`;
    }
    if (isBold(item)) {
      content = `${content} Bold`;
    }
    if (item.hasEOL) {
      content = `${content} NewLine`;
    }
    return content;
  };

  const step1TextItemsTable = [
    ["#", "Text Content", "Metadata"],
    ...textItems.map((item, idx) => [
      idx + 1,
      item.text,
      <Badge key={idx}>{getBadgeContent(item)}</Badge>,
    ]),
  ];

  const step2LinesTable = [
    ["Lines", "Line Content"],
    ...lines.map((line, idx) => [
      idx + 1,
      line.map((item, idx) => (
        <span key={idx}>
          {item.text}
          {idx !== line.length - 1 && (
            <span className="divider select-none font-extrabold">
                {"|"}  
            </span>
          )}
        </span>
      )),
    ]),
  ];

  const { profile, profileScores } = extractProfile(sections);
  const Scores = ({ scores }: { scores: TextScores }) => {
    return (
      <>
        {scores
          .sort((a, b) => b.score - a.score)
          .map((item, idx) => (
            <span key={idx} className="break-all">
              <Badge>{item.score}</Badge> {item.text}
              <br />
            </span>
          ))}
      </>
    );
  };

  const step4ProfileFeatureScoresTable = [
    [
      "Resume Attribute",
      "Text (Highest Feature Score)",
      "Feature Scores of Other Texts",
    ],
    ["Name", profile.name, <Scores key={"Name"} scores={profileScores.name} />],
    [
      "Email",
      profile.email,
      <Scores key={"Email"} scores={profileScores.email} />,
    ],
    [
      "Phone",
      profile.phone,
      <Scores key={"Phone"} scores={profileScores.phone} />,
    ],
  ];

  return (
    <article className="article">
      <Heading className="heading headingLevel1">
        Resume Parsing Algorithm: Technical Overview
      </Heading>
      <Paragraph className="paragraph" smallMarginTop={true}>
        This section provides a comprehensive exploration of the resume parsing algorithm developed by our organization. It outlines the four-step process designed to extract structured data from single-column English-language resumes.
      </Paragraph>
      {/* Step 1. Extract Text Items from PDF */}
      <Heading level={2} className="heading headingLevel2">
        Step 1: Extract Text Items from PDF
      </Heading>
      <Paragraph className="paragraph" smallMarginTop={true}>
        The PDF format, standardized under{" "}
        <Link href="https://www.iso.org/standard/51502.html" className="link">
          ISO 32000
        </Link>
        , encodes content in a complex structure. To process a resume, our parser decodes the PDF using Mozilla's open-source{" "}
        <Link href="https://github.com/mozilla/pdf.js" className="link">
          pdf.js
        </Link>{" "}
        library to extract text items, including their content and metadata such as x, y coordinates, bold formatting, and line breaks.
      </Paragraph>
      <Paragraph className="paragraph">
        The table below displays {textItems.length} text items extracted from the provided resume PDF. Each item includes metadata such as position (relative to the bottom-left corner at origin 0,0), boldness, and newline indicators.
      </Paragraph>
      <div className="tableContainer scrollbar">
        <Table
          table={step1TextItemsTable}
          className="table"
          tdClassNames={["", "", "md:whitespace-nowrap"]}
        />
      </div>
      {/* Step 2. Group Text Items into Lines */}
      <Heading level={2} className="heading headingLevel2">
        Step 2: Group Text Items into Lines
      </Heading>
      <Paragraph className="paragraph" smallMarginTop={true}>
        Extracted text items require further processing to address two challenges:
      </Paragraph>
      <Paragraph className="paragraph">
        <span className="block font-semibold">Challenge 1: Fragmentation</span>
        Text items, such as phone numbers (e.g., "(123) 456-7890"), may be split into multiple fragments. To resolve this, adjacent items are merged if their horizontal distance is less than the average character width, calculated as:
        <span
          className="math my-2 block text-left text-base"
          dangerouslySetInnerHTML={{
            __html: `<math display="block">
                        <mrow>
                            <mn>Distance </mn>
                            <mo>=</mo>
                            <mn>RightTextItemX₁</mn>
                            <mo>-</mo>
                            <mn>LeftTextItemX₂</mn>
                        </mrow>
                    </math>`,
          }}
        />
        The average character width excludes bolded text and newlines to ensure accuracy.
      </Paragraph>
      <Paragraph className="paragraph">
        <span className="block font-semibold">Challenge 2: Lack of Context</span>
        Raw text items lack the contextual associations humans infer from visual cues. Our parser groups items into lines, mimicking human reading patterns, to establish these relationships.
      </Paragraph>
      <Paragraph className="paragraph">
        The result is {lines.length} lines, displayed below. Multiple text items within a line are separated by a vertical divider.
      </Paragraph>
      <div className="tableContainer scrollbar">
        <Table table={step2LinesTable} className="table" />
      </div>
      {/* Step 3. Group Lines into Sections */}
      <Heading level={2} className="heading headingLevel2">
        Step 3: Group Lines into Sections
      </Heading>
      <Paragraph className="paragraph" smallMarginTop={true}>
        Building on line grouping, this step organizes lines into sections to enhance contextual understanding. Most sections begin with a title, a common convention in resumes.
      </Paragraph>
      <Paragraph className="paragraph">
        Section titles are identified using a primary heuristic requiring:
        <br />
        1. A single text item in the line
        <br />
        2. Bold formatting
        <br />
        3. All uppercase letters
        <br />
        A fallback heuristic uses keyword matching against common resume section titles if the primary criteria are not met.
      </Paragraph>
      <Paragraph className="paragraph">
        The table below shows identified sections, with titles in bold and associated lines highlighted in matching colors.
      </Paragraph>
      <div className="tableContainer scrollbar">
        <Step3SectionsTable sections={sections} />
      </div>
      {/* Step 4. Extract Resume Data from Sections */}
      <Heading level={2} className="heading headingLevel2">
        Step 4: Extract Resume Data from Sections
      </Heading>
      <Paragraph className="paragraph" smallMarginTop={true}>
        The final step extracts structured resume data using a feature-scoring system. Each resume attribute is evaluated against custom feature sets, which assign positive or negative scores based on matching criteria. The text item with the highest score is selected as the attribute value.
      </Paragraph>
      <Heading level={3} className="heading headingLevel3">
        Feature Scoring System
      </Heading>
      <Paragraph className="paragraph" smallMarginTop={true}>
        The table below illustrates three attributes extracted from the profile section of the provided resume, showing the highest-scoring text and scores for other candidates.
      </Paragraph>
      <Table table={step4ProfileFeatureScoresTable} className="table mt-4" />
      {(profileScores.name.find((item) => item.text === profile.name)?.score ||
        0) > 0 && (
        <Paragraph className="paragraph" smallMarginTop={true}>
          The name attribute is identified as "{profile.name}" with a feature score of{" "}
          {profileScores.name.find((item) => item.text === profile.name)?.score}, the highest in the profile section.
        </Paragraph>
      )}
      <Heading level={3} className="heading headingLevel3">
        Feature Sets
      </Heading>
      <Paragraph className="paragraph" smallMarginTop={true}>
        Feature sets are crafted based on two principles:
        <br />
        1. Relative comparison to other attributes in the same section
        <br />
        2. Manual design reflecting attribute characteristics
        <br />
        The table below details feature sets for the name attribute, including positive scores for matches and negative scores for non-matches.
      </Paragraph>
      <Table
        table={step4NameFeatureSetsTable}
        title="Name Feature Sets"
        className="table mt-4"
      />
      <Heading level={3} className="heading headingLevel3">
        Core Feature Functions
      </Heading>
      <Paragraph className="paragraph" smallMarginTop={true}>
        Each attribute relies on a core feature function for identification, as shown below.
      </Paragraph>
      <Table table={step4CoreFeatureFunctionTable} className="table mt-4" />
      <Heading level={3} className="heading headingLevel3">
        Handling Subsections
      </Heading>
      <Paragraph className="paragraph" smallMarginTop={true}>
        For sections like education or work experience, subsections are detected using a heuristic based on vertical line gaps (1.4x the typical gap) or bolded text. Each subsection is processed independently to extract attributes.
      </Paragraph>
      <Paragraph className="paragraph">
        Authored by <Link href="https://github.com/xitanggg" className="link">Xitang Zhao</Link>, June 2023
      </Paragraph>
    </article>
  );
};

const step4NameFeatureSetsTable = [
  ["Feature Function", "Feature Matching Score"],
  ["Contains only letters, spaces, or periods", "+3"],
  ["Is bolded", "+2"],
  ["Contains all uppercase letters", "+2"],
  ["Contains @", "-4 (email match)"],
  ["Contains number", "-4 (phone match)"],
  ["Contains ,", "-4 (address match)"],
  ["Contains /", "-4 (URL match)"],
];

const step4CoreFeatureFunctionTable = [
  ["Resume Attribute", "Core Feature Function", "Regex"],
  ["Name", "Contains only letters, spaces, or periods", "/^[a-zA-Z\\s\\.]+$/"],
  [
    "Email",
    <>
      Matches email format xxx@xxx.xxx
      <br />
      xxx can be any non-space character
    </>,
    "/\\S+@\\S+\\.\\S+/",
  ],
  [
    "Phone",
    <>
      Matches phone format (xxx)-xxx-xxxx <br /> Optional parentheses and dashes
    </>,
    "/\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4}/",
  ],
  [
    "Location",
    <>Matches city and state format {"City, ST"}</>,
    "/[A-Z][a-zA-Z\\s]+, [A-Z]{2}/",
  ],
  ["URL", "Matches URL format xxx.xxx/xxx", "/\\S+\\.[a-z]+\\/\\S+/"],
  ["School", "Contains keywords like College, University, School", ""],
  ["Degree", "Contains keywords like Associate, Bachelor, Master", ""],
  ["GPA", "Matches GPA format x.xx", "/[0-4]\\.\\d{1,2}/"],
  [
    "Date",
    "Contains year, month, season, or 'Present' keywords",
    "Year: /(?:19|20)\\d{2}/",
  ],
  [
    "Job Title",
    "Contains keywords like Analyst, Engineer, Intern",
    "",
  ],
  ["Company", "Is bolded or excludes job title/date patterns", ""],
  ["Project", "Is bolded or excludes date patterns", ""],
];

const Step3SectionsTable = ({
  sections,
}: {
  sections: ResumeSectionToLines;
}) => {
  const table: React.ReactNode[][] = [["Lines", "Line Content"]];
  const trClassNames = [];
  let lineCounter = 0;
  const BACKGROUND_COLORS = [
    "tableRowRed",
    "tableRowYellow",
    "tableRowOrange",
    "tableRowGreen",
    "tableRowBlue",
    "tableRowPurple",
  ] as const;
  const sectionsEntries = Object.entries(sections);

  const Line = ({ line }: { line: Line }) => {
    return (
      <>
        {line.map((item, idx) => (
          <span key={idx}>
            {item.text}
            {idx !== line.length - 1 && (
              <span className="divider select-none font-extrabold">
                  {"|"}  
              </span>
            )}
          </span>
        ))}
      </>
    );
  };

  for (let i = 0; i < sectionsEntries.length; i++) {
    const sectionBackgroundColor = BACKGROUND_COLORS[i % 6];
    const [sectionTitle, lines] = sectionsEntries[i];
    table.push([
      sectionTitle === "profile" ? "" : lineCounter,
      sectionTitle === "profile" ? "PROFILE" : sectionTitle,
    ]);
    trClassNames.push(`${sectionBackgroundColor} font-bold`);
    lineCounter += 1;
    for (let j = 0; j < lines.length; j++) {
      table.push([lineCounter, <Line key={lineCounter} line={lines[j]} />]);
      trClassNames.push(sectionBackgroundColor);
      lineCounter += 1;
    }
  }

  return (
    <div className="tableContainer scrollbar">
      <Table
        table={table}
        className="table"
        trClassNames={trClassNames}
      />
    </div>
  );
};