import { Suspense, lazy } from "react";

import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

import styles from "./Lab.module.scss";

const CSSGallery = lazy(() =>
  import("@/components/Lab/CSSGallery/CSSGallery").then((m) => ({
    default: m.CSSGallery,
  }))
);

export const Lab = () => (
  <section id="lab" className={styles.section}>
    <SectionHeader no="04" title="Lab" meta="Drag me around" />
    <div className={styles.window}>
      <Suspense fallback={<p className={styles.loading}>Loading toys…</p>}>
        <CSSGallery />
      </Suspense>
    </div>
  </section>
);
