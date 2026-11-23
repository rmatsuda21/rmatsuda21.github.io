export type Figure = {
  /** Short value set in the pixel face, e.g. "55K+". */
  value: string;
  label: string;
};

export type Initiative = {
  name: string;
  /** One sentence. */
  summary: string;
  figures: readonly Figure[];
  /** Two or three short points at most. */
  highlights: readonly string[];
};

export type Role = {
  company: string;
  title: string;
  /** Shown in the ledger, e.g. "03.2024—09.2025". */
  period: string;
  stack: string;
  initiatives: readonly Initiative[];
};

export const ROLES: readonly Role[] = [
  {
    company: "Nextdoor",
    title: "Software Engineer III",
    period: "04.2026—11.2026",
    stack: "React · GraphQL · Django",
    initiatives: [
      {
        name: "Event detail redesign",
        summary:
          "Owned the web side of the redesigned event page, launched to 95% of users on web, iOS and Android.",
        figures: [
          { value: "2.2M", label: "Page visits a month" },
          { value: "500K+", label: "Users in the A/B test" },
        ],
        highlights: [
          "Built the full web implementation, plus the backend change behind the attendee facepile.",
          "Fixed three ramp bugs in the same cycle, so the rollout was never blocked.",
        ],
      },
      {
        name: "News link repost embeds",
        summary:
          "Built the web side of a pipeline that renders shared posts and news links as native reposts.",
        figures: [
          { value: "+2.89%", label: "News article clicks" },
          { value: "25M", label: "Weekly users on Nextdoor" },
        ],
        highlights: [
          "Shipped to all users with a statistically significant lift in clicks.",
          "Pushed ambiguities in the spec to one rule shared by web, iOS and Android.",
        ],
      },
      {
        name: "Journalist feed and search",
        summary:
          "Started the project myself and shipped a location picker for journalists' feed, search and trending topics.",
        figures: [
          { value: "2 WKS", label: "Idea to launch" },
          { value: "30K", label: "Journalist invite list" },
        ],
        highlights: [
          "Built the mockups myself and got sign-off from a principal designer.",
          "Negotiated the backend down to one endpoint change.",
        ],
      },
      {
        name: "Events in groups",
        summary:
          "Scoped, built and rolled out the web side of a new Events tab inside Groups.",
        figures: [
          { value: "100%", label: "Web rollout" },
          { value: "65-100K", label: "Active upcoming events" },
        ],
        highlights: [
          "Landed five bug-bash fixes within half an hour of the session.",
          "Also built the web event hub refresh and wrote the design doc for event photo cropping.",
        ],
      },
    ],
  },
  {
    company: "GOAT Group",
    title: "Software Engineer II",
    period: "03.2024—09.2025",
    stack: "Next · TS · Sass",
    initiatives: [
      {
        name: "Unified checkout micro-frontend",
        summary:
          "Built a shared React checkout used across multiple brands, with dynamic theming to keep each brand distinct.",
        figures: [
          { value: "55K+", label: "Daily users" },
          { value: "+1%", label: "Conversion" },
          { value: ">99%", label: "Stability" },
        ],
        highlights: [
          "Micro-frontend architecture adopted company-wide.",
          "95% unit test coverage and over 50% fewer production regressions.",
          "Integrated a global third-party payment provider.",
        ],
      },
      {
        name: "PDP micro-frontend",
        summary:
          "Led a Product Detail Page micro-frontend built for SEO, load performance and maintainability.",
        figures: [
          { value: "RSC", label: "SEO gains" },
          { value: "3D", label: "Product viewer" },
        ],
        highlights: [
          "Owned delivery and coordinated requirements with stakeholders.",
          "Used Lighthouse measurements to guide performance trade-offs.",
        ],
      },
      {
        name: "Black Friday 2024",
        summary:
          "Shipped a canvas-based lobby with real-time user counts and game status on a tight deadline.",
        figures: [
          { value: "1M+", label: "Global users" },
          { value: "99.99%", label: "Stability" },
        ],
        highlights: [
          "Built for failure modes: auth, sessions, retries and timeouts at peak.",
        ],
      },
    ],
  },
  {
    company: "GOAT Group",
    title: "Software Engineer I",
    period: "07.2022—03.2024",
    stack: "Next · TS · React",
    initiatives: [
      {
        name: "High-traffic profile features",
        summary:
          "Owned end-to-end delivery of the “user wants” and “user offers” profile experiences.",
        figures: [
          { value: "E2E", label: "Ownership" },
          { value: "2", label: "Profile surfaces" },
        ],
        highlights: [
          "Balanced brand requirements with performance in a large production codebase.",
        ],
      },
      {
        name: "Black Friday 2023 Trivia Game",
        summary:
          "Co-owned a web trivia game for Black Friday, with WebView authentication and stability under peak load.",
        figures: [
          { value: "1M+", label: "Global users" },
          { value: "PEAK", label: "Traffic, stable" },
        ],
        highlights: [
          "Handled auth and session edge cases gracefully during traffic spikes.",
        ],
      },
      {
        name: "Styled Component guidelines",
        summary:
          "Documented styling anti-patterns and drove the fixes through team discussion.",
        figures: [{ value: "-15%", label: "Bundled CSS" }],
        highlights: ["Smaller bundles and more consistent, readable styles."],
      },
    ],
  },
  {
    company: "NAC Image Technology",
    title: "Software Engineer Intern",
    period: "06.2022—07.2022",
    stack: "Python",
    initiatives: [
      {
        name: "High-throughput image processing pipeline",
        summary:
          "Made an internal image-processing workflow faster and more scalable for large batches.",
        figures: [
          { value: "50%+", label: "Faster runtime" },
          { value: "BATCH", label: "At scale" },
        ],
        highlights: [
          "Added safe multithreading for I/O-heavy steps.",
          "Added hash-based caching so unchanged assets are skipped.",
        ],
      },
      {
        name: "Enterprise use-cases for Programmable Annotation",
        summary:
          "Explored and pitched workflows to take Programmable Annotation beyond core customers.",
        figures: [{ value: "B2B", label: "Enterprise story" }],
        highlights: [
          "Built demos that mapped customer pain points to product capabilities.",
        ],
      },
    ],
  },
  {
    company: "Knowledge Based Systems Inc.",
    title: "Software Engineer Intern",
    period: "06.2018—05.2022",
    stack: "Angular · Java · C# · Unity",
    initiatives: [
      {
        name: "Angular multi-tab navigation dashboard",
        summary:
          "Added multi-tab navigation to a security analysis dashboard for faster context switching.",
        figures: [{ value: "TABS", label: "Multi-view nav" }],
        highlights: [
          "Let users compare views and keep context while working.",
        ],
      },
      {
        name: "Real-time JSON parsing + 3D MR visualization",
        summary:
          "Refactored parsing to process and visualize large JSON datasets in real time for a mixed reality trainer.",
        figures: [
          { value: "100K+", label: "Lines, real time" },
          { value: "3D", label: "MR visuals" },
        ],
        highlights: [
          "Fed the parsed output into a Unity 3D visualization flow.",
        ],
      },
    ],
  },
];
