import { Fragment } from "react";
import type { Resume } from "lib/redux/types";
import { initialEducation, initialWorkExperience } from "lib/redux/resumeSlice";
import { deepClone } from "lib/deep-clone";
import "./ResumeTable.css";

const TableRowHeader = ({ children }: { children: React.ReactNode }) => (
  <tr className="tableRowHeader">
    <th scope="colgroup" colSpan={2}>
      {children}
    </th>
  </tr>
);

const TableRow = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | string[];
  className?: string;
}) => (
  <tr className={`tableRow ${className || ""}`}>
    <th scope="row">{label}</th>
    <td>
      {typeof value === "string" ? (
        value
      ) : (
        value.map((x, idx) => (
          <div key={idx} className="listItem">
            {x}
          </div>
        ))
      )}
    </td>
  </tr>
);

export const ResumeTable = ({ resume }: { resume: Resume }) => {
  const educations =
    resume.educations.length === 0
      ? [deepClone(initialEducation)]
      : resume.educations;
  const workExperiences =
    resume.workExperiences.length === 0
      ? [deepClone(initialWorkExperience)]
      : resume.workExperiences;
  const skills = [...resume.skills.descriptions];
  const featuredSkills = resume.skills.featuredSkills
    .filter((item) => item.skill.trim())
    .map((item) => item.skill)
    .join(", ")
    .trim();
  if (featuredSkills) {
    skills.unshift(featuredSkills);
  }

  return (
    <div className="tableContainer">
      <table className="table">
        <tbody className="tableBody">
          <TableRowHeader>Candidate Profile</TableRowHeader>
          <TableRow label="Full Name" value={resume.profile.name} />
          <TableRow label="Email Address" value={resume.profile.email} />
          <TableRow label="Phone Number" value={resume.profile.phone} />
          <TableRow label="Location" value={resume.profile.location} />
          <TableRow label="Website/Portfolio" value={resume.profile.url} />
          <TableRow label="Professional Summary" value={resume.profile.summary} />
          <TableRowHeader>Educational Background</TableRowHeader>
          {educations.map((education, idx) => (
            <Fragment key={idx}>
              <TableRow label="Institution" value={education.school} />
              <TableRow label="Degree" value={education.degree} />
              <TableRow label="GPA" value={education.gpa} />
              <TableRow label="Dates Attended" value={education.date} />
              <TableRow
                label="Key Achievements"
                value={education.descriptions}
                className={
                  educations.length > 1 && idx !== educations.length - 1
                    ? "tableRowDivider"
                    : ""
                }
              />
            </Fragment>
          ))}
          <TableRowHeader>Professional Experience</TableRowHeader>
          {workExperiences.map((workExperience, idx) => (
            <Fragment key={idx}>
              <TableRow label="Organization" value={workExperience.company} />
              <TableRow label="Position" value={workExperience.jobTitle} />
              <TableRow label="Tenure" value={workExperience.date} />
              <TableRow
                label="Responsibilities & Achievements"
                value={workExperience.descriptions}
                className={
                  workExperiences.length > 1 && idx !== workExperiences.length - 1
                    ? "tableRowDivider"
                    : ""
                }
              />
            </Fragment>
          ))}
          {resume.projects.length > 0 && (
            <TableRowHeader>Key Projects</TableRowHeader>
          )}
          {resume.projects.map((project, idx) => (
            <Fragment key={idx}>
              <TableRow label="Project Name" value={project.project} />
              <TableRow label="Completion Date" value={project.date} />
              <TableRow
                label="Project Details"
                value={project.descriptions}
                className={
                  resume.projects.length > 1 && idx !== resume.projects.length - 1
                    ? "tableRowDivider"
                    : ""
                }
              />
            </Fragment>
          ))}
          <TableRowHeader>Technical & Professional Skills</TableRowHeader>
          <TableRow label="Skills Overview" value={skills} />
        </tbody>
      </table>
    </div>
  );
};