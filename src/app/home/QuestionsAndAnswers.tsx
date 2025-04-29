import { motion } from "framer-motion";
import { Link } from "components/documentation";

const QAS = [
  {
    question: "What is a resume builder, and why is it better than a resume template?",
    answer: (
      <>
        <p className="text-gray-600">
          A resume builder is an online tool that simplifies the process of creating a resume by allowing you to input your information and automatically generating a polished, professional document. Unlike traditional resume templates (e.g., Google Docs or Word), which require manual formatting, copying, pasting, and adjusting layouts, a resume builder like FreeResume handles all formatting automatically.
        </p>
        <p className="mt-3 text-gray-600">
          Templates often lead to inconsistencies, such as mismatched fonts or bullet styles, and can be time-consuming to customize. FreeResume saves time, prevents errors, and offers easy customization options, like changing fonts or layouts with a single click, making it a more efficient and user-friendly choice.
        </p>
      </>
    ),
  },
  {
    question: "What makes FreeResume unique compared to other resume builders?",
    answer: (
      <>
        <p className="text-gray-600">
          FreeResume stands out among other resume builders like{" "}
          <Link href="https://rxresu.me/" className="text-primary hover:underline">
            Reactive Resume
          </Link>{" "}
          and{" "}
          <Link href="https://flowcv.com/" className="text-primary hover:underline">
            FlowCV
          </Link>{" "}
          with two key features:
        </p>
        <p className="mt-3">
          <span className="font-semibold text-gray-800">
            1. Tailored for the U.S. Job Market
          </span>
          <br />
          FreeResume is designed specifically for U.S. hiring practices, offering only options that align with best practices. It excludes features like profile pictures to avoid bias, includes only essential sections (e.g., profile, work experience, education, skills), and uses a single-column layout optimized for Applicant Tracking Systems (ATS).
        </p>
        <p className="mt-3">
          <span className="font-semibold text-gray-800">2. Privacy-Centric</span>
          <br />
          Unlike many resume builders that require email sign-ups and store data on servers, FreeResume prioritizes privacy. It requires no account creation, and all data is stored locally in your browser, ensuring only you have access.
        </p>
      </>
    ),
  },
  {
    question: "Who created FreeResume, and what inspired its development?",
    answer: (
      <p className="text-gray-600">
        FreeResume was created by{" "}
        <Link href="https://github.com/xitanggg" className="text-primary hover:underline">
          Xitang Zhao
        </Link>{" "}
        and designed by{" "}
        <Link href="https://www.linkedin.com/in/imzhi" className="text-primary hover:underline">
          Zhigang Wen
        </Link>{" "}
        as a passion project. As U.S. immigrants, they faced challenges crafting effective resumes for the U.S. job market. While mentoring first-generation students, they noticed similar struggles. This inspired them to build FreeResume, embedding U.S. best practices to help anyone create a professional resume with ease and confidence.
      </p>
    ),
  },
  {
    question: "How can I support FreeResume?",
    answer: (
      <>
        <p className="text-gray-600">
          Your feedback is invaluable! Share your thoughts by emailing{" "}
          <Link href="mailto:hello@open-resume.com" className="text-primary hover:underline">
            hello@open-resume.com
          </Link>{" "}
          or{" "}
          <Link href="https://github.com/xitanggg/open-resume/issues/new" className="text-primary hover:underline">
            opening an issue
          </Link>{" "}
          on our GitHub repository. Whether positive or critical, we want to hear from you.
        </p>
        <p className="mt-3 text-gray-600">
          You can also support us by spreading the word. Share FreeResume with friends, on social media, or with your school’s career center. If you’re on GitHub, give our project a{" "}
          <Link href="https://github.com/xitanggg/open-resume" className="text-primary hover:underline">
            star
          </Link>{" "}
          to boost its visibility and help more people discover it.
        </p>
      </>
    ),
  },
];

export const QuestionsAndAnswers = () => {
  return (
    <section className="mx-auto max-w-4xl py-16 lg:py-24">
      <motion.h2
        className="text-center text-4xl font-bold text-gray-900 lg:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="mt-12 space-y-8">
        {QAS.map(({ question, answer }, index) => (
          <motion.div
            key={question}
            className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{question}</h3>
            <div className="text-base leading-relaxed">{answer}</div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[color:var(--theme-purple)]/5 to-[color:var(--theme-blue)]/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};