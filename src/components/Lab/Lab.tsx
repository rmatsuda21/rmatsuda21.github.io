import { Suspense, lazy } from "react";

import { useStrings } from "@/i18n/LanguageContext";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

import styles from "./Lab.module.scss";

const CSSGallery = lazy(() =>
  import("@/components/Lab/CSSGallery/CSSGallery").then((m) => ({
    default: m.CSSGallery,
  }))
);

export const Lab = () => {
  const t = useStrings();

  return (
    <section id="lab" className={styles.section}>
      <SectionHeader no="04" title={t.sections.lab} meta={t.lab.meta} />
      <div className={styles.window}>
        <Suspense fallback={<p className={styles.loading}>{t.lab.loading}</p>}>
          <CSSGallery />
        </Suspense>
      </div>
    </section>
  );
};
