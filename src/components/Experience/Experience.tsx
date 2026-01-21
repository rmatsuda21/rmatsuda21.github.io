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
          initiatives={[
            {
              name: "Unified checkout micro-frontend",
              summary:
                "Built a shared React checkout used across multiple brands, with a dyanmic theming system to keep each brand distinct while reusing core flows.",
              impact: ["55K+ daily active users", "1% increase in conversion rate", "97% → >99% stability"],
              wins: [
                "Foundational micro-frontend architecture with company-wide buy-in and adoption.",
                "Scalable dynamic theming with CSS Modules + Sass to quickly integrate new brands.",
                "Global third-party payment provider integration",
                "95% unit test coverage via Jest",
                "Over 50% reduction in logged production regressions",
              ],
              learnings: [
                "Effectively construct a TDD & present in front of stakeholders to get buy-in for new features.",
                "Writing a fail-safe application to handle complex edge cases and improve reliability and monitoring.",
                "Approaches for integrating multiple payment providers while keeping UX and error handling consistent.",
              ],
              tech: ["react", "typescript", "sass", "next", "webpack", "jest"],
            },
            {
              name: "PDP micro-frontend",
              summary:
                "Led development of a Product Detail Page micro-frontend with an emphasis on SEO, load performance, and long-term maintainability. Complete with a 3D product viewer and responsive design.",
              impact: ["Improved SEO w/ RSC", "Performance-oriented architecture"],
              wins: [
                "Integrated modern React patterns to build a performant and maintainable micro-frontend.",
                "Owned delivery of the PDP micro-frontend and coordinated requirements with stakeholders.",
                "Applied performance best practices and measured trade-offs with Lighthouse to guide implementation decisions.",
              ],
              learnings: [
                "Align product/SEO goals with technical constraints and present trade-offs clearly to stakeholders.",
                "Patterns for composing micro-frontends without sacrificing core web vitals.",
              ],
              tech: ["react", "typescript", "next", "webpack"],
            },
            {
              name: "Black Friday 2024",
              summary:
                "Integrated a canvas-based lobby screen with real-time user count and game status updates within a tight deadline.",
              impact: ["1M+ global users", "99.99% stability"],
              wins: [
                "Delivered a tight deadline with clear reliability requirements and minimal tolerance for downtime.",
                "Created a custom canvas-based lobby screen with multiple design feedback loops.",
              ],
              learnings: [
                "High performance canvas-based UI development with real-time updates.",
                "Prioritize reliability and safe rollout strategies for short-lived, high-traffic launches.",
                "Designing for failure modes (auth/session, retries, timeouts) in peak events.",
              ],
              tech: ["react", "typescript", "webpack"],
            }
          ]}
        />
        <Item
          company="GOAT Group"
          title="Software Engineer I"
          date="Jul. 2022 - Mar. 2024"
          techStack={["next", "typescript", "react", "sass", "webpack"]}
          initiatives={[
            {
              name: "High-traffic profile features",
              summary:
                "Owned end-to-end delivery of profile experiences (“user wants” and “user offers”), balancing branding consistency with performance goals.",
              impact: ["High-traffic surfaces", "Performance-conscious UI"],
              wins: [
                "Delivered features end-to-end, from requirements to implementation and iteration, with a focus on responsiveness and UX polish.",
                "Balanced product/branding requirements with performance constraints in a large production codebase.",
              ],
              learnings: [
                "How to ship iteratively on high-visibility surfaces while maintaining quality and performance.",
                "Techniques for keeping UI changes maintainable under evolving design requirements.",
              ],
              tech: ["next", "react", "typescript", "webpack"],
            },
            {
              name: "Black Friday 2023 Trivia Game",
              summary:
                "Co-owned a web-based Trivia game for Black Friday, supporting users globally with WebView authentication and stability under peak load.",
              impact: ["1M+ global users", "Stable during peak traffic"],
              wins: [
                "Shipped a time-sensitive experience with clear reliability requirements and minimal tolerance for downtime.",
                "Integrated WebView authentication and ensured graceful handling of auth/session edge cases during traffic spikes.",
              ],
              learnings: [
                "How to prioritize reliability and safe rollout strategies for short-lived, high-traffic launches.",
                "Designing for failure modes (auth/session, retries, timeouts) in peak events.",
              ],
              tech: ["react", "typescript", "webpack"],
            },
            {
              name: "Styled Component guidelines",
              summary:
                "Identified pain points in Styled Components usage and facilitated team discussions to improve maintainability and performance.",
              impact: ["15% smaller bundled CSS", "Improved maintainability"],
              wins: [
                "Documented anti-patterns and proposed concrete improvements to make styling more consistent and readable.",
                "Drove adoption of changes that reduced bundle size and improved performance characteristics.",
              ],
              learnings: [
                "Influence technical direction through clear documentation and collaborative discussions.",
                "Measuring and communicating performance impact to align the team on changes.",
              ],
              tech: ["react", "typescript"],
            },
          ]}
        />
        <Item
          company="Knowledge Based Systems Inc."
          title="Software Engineer Intern"
          date="Jun. 2018 - May 2022"
          techStack={["angular", "java", "csharp", "unity"]}
          initiatives={[
            {
              name: "Angular multi-tab navigation dashboard",
              summary:
                "Improved usability in a security analysis Angular dashboard by introducing multi-tab navigation for faster context switching.",
              impact: ["Improved dashboard usability", "Faster user workflows"],
              wins: [
                "Designed and implemented multi-tab navigation to help users compare views and keep context while working.",
                "Ensured the solution was maintainable and consistent with the existing Angular architecture.",
              ],
              learnings: [
                "Designing navigation patterns that reduce cognitive load for power users.",
                "Balancing new UI features with existing component patterns and constraints.",
              ],
              tech: ["angular", "typescript"],
            },
            {
              name: "Real-time JSON parsing + 3D MR visualization",
              summary:
                "Refactored backend parsing logic to support real-time processing and visualization of large JSON datasets in a mixed reality training app.",
              impact: ["100K+ lines parsed in real-time", "3D visualization pipeline"],
              wins: [
                "Refactored Java/C# code paths to handle large JSON streams more efficiently and reliably.",
                "Integrated parsing output into a Unity 3D visualization flow to support MR training scenarios.",
              ],
              learnings: [
                "How to optimize parsing pipelines for throughput and reliability at scale.",
                "Bridging backend data processing with real-time 3D visualization constraints.",
              ],
              tech: ["java", "csharp", "unity"],
            },
          ]}
        />
        <Item
          company="NAC Image Technology"
          title="Software Engineer Intern"
          date="Jun. - Jul. 2022"
          techStack={["python"]}
          initiatives={[
            {
              name: "High-throughput image processing pipeline",
              summary:
                "Improved an existing internal image-processing workflow to be substantially faster and more scalable for large batch workloads.",
              impact: ["50%+ faster runtime", "Batch processing at scale"],
              wins: [
                "Introduced safe Python multithreading for I/O-heavy steps to increase throughput without sacrificing correctness.",
                "Added hashing-based caching/deduplication to avoid re-processing unchanged assets and reduce wasted compute.",
                "Benchmarked before/after performance and documented the bottlenecks, fixes, and trade-offs for the team.",
              ],
              learnings: [
                "How to profile Python workloads to distinguish CPU vs I/O bottlenecks and choose the right concurrency strategy.",
                "Designing cache keys and invalidation rules so speedups remain correct and maintainable over time.",
              ],
              tech: ["python"],
            },
            {
              name: "Enterprise use-cases for Programmable Annotation",
              summary:
                "Explored and pitched practical workflows to expand the Programmable Annotation feature beyond core customers.",
              impact: ["Expanded product applicability", "Clearer story for enterprise"],
              wins: [
                "Developed concrete real-world use cases and demos that mapped customer pain points to specific product capabilities.",
                "Partnered with stakeholders to validate the value proposition and refine the pitch based on feedback.",
              ],
              learnings: [
                "How to translate technical capabilities into outcomes that resonate with non-technical stakeholders.",
                "Rapidly iterating on a feature narrative by testing assumptions with real feedback loops.",
              ],
              tech: ["python"],
            },
          ]}
        />
      </div>
    </div>
  );
};
