import { Item } from "./Item/Item";

import styles from "./Experience.module.scss";

export const Experience = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Experience</h1>
      <div className={styles.list}>
        <Item
          company="GOAT Group"
          title="Software Engineer II"
          date="Mar. 2024 - Sep. 2025"
          techStack={["next", "typescript", "react", "sass", "webpack"]}
        >
          <ul>
            <li>
              Developed a unified React checkout application serving 55K+ daily
              users across multiple company brands, implementing a dynamic
              theming system with CSS Modules & Sass to maintain distinct brand
              identities while sharing core functionalities such as Stripe /
              third-party payment provider integration.
            </li>
            <li>
              Led development of a Product Detail Page micro-frontend,
              optimizing SEO and performance with React Server Components and
              Redux (+ Redux Toolkit).
            </li>
            <li>
              Architected and integrated a Three.js-based responsive 3D product
              viewer, delivering a more immersive and performant shopping
              experience on both mobile and web.
            </li>
            <li>
              Increased code confidence by rolling out Jest unit tests and
              Cypress end-to-end tests, reducing logged production regressions
              by over 50% and increasing our production stability from 97% to
              &gt;99%.
            </li>
            <li>
              Documented areas of improvement to existing logging system and
              designed a cost-effective solution for monitoring using Bugsnag
              and Grafana.
            </li>
            <li>
              Collaborated with Head of SEO to align technical design decisions
              with SEO best practices, using Google Lighthouse to measure
              trade-offs and communicated with stakeholders.
            </li>
          </ul>
        </Item>
        <Item
          company="GOAT Group"
          title="Software Engineer I"
          date="Jul. 2022 - Mar. 2024"
          techStack={["next", "typescript", "react", "sass", "webpack"]}
        >
          <ul>
            <li>
              Owned end-to-end development of high-traffic profile features
              (“user wants” & “user offers”), balancing branding consistency
              with performance goals.
            </li>
            <li>
              Co-owner of a web-based Trivia game for Black Friday 2023,
              supporting 1M+ global users through Web-View authentication and
              ensuring stability during peak load.
            </li>
            <li>
              Analyzed and documented pain points and facilitated team-wide
              discussions to improve Styled Component usage, enhancing
              readability, maintainability, and performance while reducing the
              size of our bundled CSS by ~15%.
            </li>
          </ul>
        </Item>
        <Item
          company="Knowledge Based Systems Inc."
          title="Software Engineer Intern"
          date="Jun. 2018 - May 2022"
          techStack={["angular", "java", "csharp"]}
        >
          <ul>
            <li>
              Improved dashboard usability for a security analysis Angular app
              by implementing multi-tab navigation.
            </li>
            <li>
              Refactored backend code in Java/C#, enabling real-time parsing of
              100K+ lines of JSON data and visualization in 3D space for MR
              training application.
            </li>
          </ul>
        </Item>
        <Item
          company="NAC Image Technology"
          title="Software Engineer Intern"
          date="Jun. - Jul. 2022"
          techStack={["python"]}
        >
          <ul>
            <li>
              Accelerated existing image processing workflows by integrating
              Python multithreading and hashing, reducing run time by 50%+.
            </li>
            <li>
              Developed and pitched real-world use cases for the Programmable
              Annotation feature, expanding product applicability for enterprise
              clients.
            </li>
          </ul>
        </Item>
      </div>
    </div>
  );
};
