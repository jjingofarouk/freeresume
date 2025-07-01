import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeWorkExperience } from "lib/redux/types";

export const ResumePDFWorkExperience = ({
  heading,
  workExperiences,
  themeColor,
}: {
  heading: string;
  workExperiences: ResumeWorkExperience[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection 
      themeColor={themeColor} 
      heading={heading}
      style={{ 
        backgroundColor: '#f1f5f9',
        padding: spacing["2"],
        borderRadius: 4,
      }}
    >
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        const hideCompanyName =
          idx > 0 && company === workExperiences[idx - 1].company;

        return (
          <View 
            key={idx} 
            style={{ 
              marginTop: idx !== 0 ? spacing["2"] : 0,
              padding: spacing["1"],
              backgroundColor: hideCompanyName ? 'transparent' : '#ffffff',
              borderLeft: `2px solid ${themeColor}`,
              borderRadius: 2,
            }}
          >
            {!hideCompanyName && (
              <ResumePDFText 
                bold={true}
                style={{ 
                  color: '#1b263b',
                  fontSize: 12,
                  marginBottom: spacing["0.5"],
                }}
              >
                {company}
              </ResumePDFText>
            )}
            <View
              style={{
                ...styles.flexRowBetween,
                marginTop: hideCompanyName ? 0 : spacing["1"],
                paddingBottom: spacing["0.5"],
                borderBottom: `1px solid #e2e8f0`,
              }}
            >
              <ResumePDFText 
                style={{ 
                  color: '#2a9d8f',
                  fontSize: 10,
                  fontWeight: 'medium',
                }}
              >
                {jobTitle}
              </ResumePDFText>
              <ResumePDFText 
                style={{ 
                  color: '#0f172a',
                  fontSize: 9,
                  opacity: 0.8,
                }}
              >
                {date}
              </ResumePDFText>
            </View>
            <View style={{ ...styles.flexCol, marginTop: spacing["1"] }}>
              <ResumePDFBulletList 
                items={descriptions}
                showBulletPoints={true}
              />
            </View>
          </View>
        );
      })}
    </ResumePDFSection>
  );
};