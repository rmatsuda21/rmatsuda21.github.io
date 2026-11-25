import type { Lang } from "@/i18n/lang";

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

const EN: readonly Role[] = [
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

// Same roles, initiatives and figures as above, in the same order. Written
// the way a Japanese engineer's 職務経歴書 is: noun-stop bullets, and the
// loanwords the industry actually uses (一気通貫, デグレ, DAU, Design Doc).
const JA: readonly Role[] = [
  {
    company: "Nextdoor",
    title: "ソフトウェアエンジニア III",
    period: "04.2026—11.2026",
    stack: "React · GraphQL · Django",
    initiatives: [
      {
        name: "イベント詳細ページのリニューアル",
        summary:
          "イベント詳細ページのリニューアルで Web 側を担当。Web・iOS・Android の 95% のユーザーにリリース。",
        figures: [
          { value: "2.2M", label: "月間訪問数" },
          { value: "500K+", label: "A/Bテスト対象ユーザー" },
        ],
        highlights: [
          "Web の実装をすべて担当し、参加者アバター表示のためのバックエンド改修も対応。",
          "段階ロールアウト中に見つかったバグ 3 件を同じサイクル内で修正し、リリースを止めずに完遂。",
        ],
      },
      {
        name: "ニュースリンクのリポスト埋め込み",
        summary:
          "シェアされた投稿やニュースリンクを、ネイティブのリポストとして表示する仕組みの Web 側を実装。",
        figures: [
          { value: "+2.89%", label: "ニュース記事のクリック数" },
          { value: "25M", label: "Nextdoor の WAU" },
        ],
        highlights: [
          "クリック数の統計的に有意な向上を確認し、全ユーザーにリリース。",
          "仕様のすり合わせを主導し、Web・iOS・Android で挙動を統一。",
        ],
      },
      {
        name: "ジャーナリスト向けフィード・検索",
        summary:
          "自ら企画を立ち上げ、ジャーナリスト向けのフィード・検索・トレンドで使える地域選択機能をリリース。",
        figures: [
          { value: "2週間", label: "企画からリリースまで" },
          { value: "30K", label: "招待ジャーナリスト数" },
        ],
        highlights: [
          "モックを自作し、プリンシパルデザイナーと合意形成。",
          "バックエンドチームと調整し、改修をエンドポイント 1 本に抑制。",
        ],
      },
      {
        name: "グループ内イベント",
        summary:
          "グループ内の新しい「イベント」タブの Web 側を、要件定義から実装・リリースまで一気通貫で担当。",
        figures: [
          { value: "100%", label: "Web でリリース済み" },
          { value: "65-100K", label: "開催予定のイベント数" },
        ],
        highlights: [
          "バグバッシュで出た指摘 5 件を、終了から 30 分以内に修正。",
          "Web 版イベントハブの刷新も実装。イベント写真のクロップ機能では Design Doc を執筆。",
        ],
      },
    ],
  },
  {
    company: "GOAT Group",
    title: "ソフトウェアエンジニア II",
    period: "03.2024—09.2025",
    stack: "Next · TS · Sass",
    initiatives: [
      {
        name: "共通チェックアウトのマイクロフロントエンド化",
        summary:
          "複数ブランドで共通利用する React 製チェックアウトを構築。テーマの動的切り替えで、ブランドごとの世界観を維持。",
        figures: [
          { value: "55K+", label: "DAU" },
          { value: "+1%", label: "CVR" },
          { value: ">99%", label: "安定稼働率" },
        ],
        highlights: [
          "マイクロフロントエンドのアーキテクチャが全社標準として採用。",
          "ユニットテストのカバレッジ 95% を達成し、本番でのデグレを 50% 以上削減。",
          "グローバル対応の外部決済サービスを導入。",
        ],
      },
      {
        name: "商品詳細ページ（PDP）のマイクロフロントエンド化",
        summary:
          "SEO・表示速度・保守性を重視した商品詳細ページ（PDP）のマイクロフロントエンド開発をリード。",
        figures: [
          { value: "RSC", label: "SEO 改善" },
          { value: "3D", label: "商品ビューア" },
        ],
        highlights: [
          "開発をリードし、関係者との要件調整も担当。",
          "Lighthouse の計測結果をもとにパフォーマンスを改善。",
        ],
      },
      {
        name: "Black Friday 2024",
        summary:
          "同時接続数とゲームの進行状況をリアルタイム表示する Canvas ベースのロビーを、短納期でリリース。",
        figures: [
          { value: "1M+", label: "グローバルユーザー" },
          { value: "99.99%", label: "安定稼働率" },
        ],
        highlights: [
          "ピーク時の障害を想定し、認証・セッション・リトライ・タイムアウトまで設計。",
        ],
      },
    ],
  },
  {
    company: "GOAT Group",
    title: "ソフトウェアエンジニア I",
    period: "07.2022—03.2024",
    stack: "Next · TS · React",
    initiatives: [
      {
        name: "高トラフィックなプロフィール機能",
        summary:
          "プロフィールの「user wants」「user offers」機能を、設計からリリースまで一気通貫で担当。",
        figures: [
          { value: "E2E", label: "一気通貫で担当" },
          { value: "2", label: "プロフィール画面" },
        ],
        highlights: [
          "大規模な本番コードベースで、ブランド要件とパフォーマンスを両立。",
        ],
      },
      {
        name: "Black Friday 2023 クイズゲーム",
        summary:
          "Black Friday 向けの Web クイズゲームを共同オーナーとして開発。WebView 認証を実装し、ピーク時も安定稼働。",
        figures: [
          { value: "1M+", label: "グローバルユーザー" },
          { value: "PEAK", label: "ピーク時も安定稼働" },
        ],
        highlights: [
          "アクセス急増時の認証・セッションまわりのエッジケースに対応。",
        ],
      },
      {
        name: "Styled Components ガイドライン策定",
        summary:
          "スタイリングのアンチパターンをドキュメント化し、チームで議論しながら改善を推進。",
        figures: [{ value: "-15%", label: "CSS バンドルサイズ" }],
        highlights: ["バンドルサイズを削減し、スタイルの一貫性と可読性も向上。"],
      },
    ],
  },
  {
    company: "NAC Image Technology",
    title: "ソフトウェアエンジニア インターン",
    period: "06.2022—07.2022",
    stack: "Python",
    initiatives: [
      {
        name: "画像処理パイプラインの高速化",
        summary:
          "社内の画像処理ワークフローを高速化し、大量のバッチ処理にもスケールするよう改善。",
        figures: [
          { value: "50%+", label: "処理時間を短縮" },
          { value: "BATCH", label: "大量処理に対応" },
        ],
        highlights: [
          "I/O 負荷の高い処理をスレッドセーフにマルチスレッド化。",
          "ハッシュベースのキャッシュを導入し、変更のないアセットをスキップ。",
        ],
      },
      {
        name: "Programmable Annotation の法人向けユースケース",
        summary:
          "Programmable Annotation を既存顧客以外にも展開するため、活用ワークフローを検証・提案。",
        figures: [{ value: "B2B", label: "法人向け提案" }],
        highlights: ["顧客の課題とプロダクトの機能を結びつけるデモを作成。"],
      },
    ],
  },
  {
    company: "Knowledge Based Systems Inc.",
    title: "ソフトウェアエンジニア インターン",
    period: "06.2018—05.2022",
    stack: "Angular · Java · C# · Unity",
    initiatives: [
      {
        name: "Angular ダッシュボードのマルチタブ化",
        summary:
          "セキュリティ分析ダッシュボードにマルチタブのナビゲーションを実装し、画面の行き来をスムーズに。",
        figures: [{ value: "TABS", label: "マルチタブ対応" }],
        highlights: ["作業の文脈を保ったまま、複数のビューを比較可能に。"],
      },
      {
        name: "JSON のリアルタイム解析と 3D MR 可視化",
        summary:
          "MR（複合現実）トレーニングシステム向けに、大規模な JSON データをリアルタイムで処理・可視化できるようパーサーをリファクタリング。",
        figures: [
          { value: "100K+", label: "行をリアルタイム処理" },
          { value: "3D", label: "MR 可視化" },
        ],
        highlights: ["解析結果を Unity の 3D 可視化に連携。"],
      },
    ],
  },
];

export const ROLES: Record<Lang, readonly Role[]> = { en: EN, ja: JA };
