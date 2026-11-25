import type { SectionId } from "@/constants/Site";

import type { Lang } from "./lang";

/**
 * Interface copy. The longer content (roles, projects) lives beside its data
 * in `constants/`, also keyed by language.
 */
const en = {
  meta: {
    title: "Reo Matsuda — Fullstack Engineer",
    description:
      "Reo Matsuda is a fullstack engineer working in React. Shared checkout for 55K+ daily users, and two Black Friday launches for 1M+ users.",
  },
  sections: {
    top: "Subject",
    experience: "Experience",
    work: "Work",
    lab: "Lab",
    contact: "Contact",
  } satisfies Record<SectionId, string>,
  topBar: {
    mark: "RM—Portfolio",
    lightRevision: "Light revision",
    sectionsNav: "Sections",
    place: "Jersey City, NJ",
    placeShort: "NJ",
  },
  hero: {
    sheet: "Sheet 01 — Subject",
    hintFine: "Hover or click the name",
    hintTouch: "Tap it or scroll",
    claim:
      "Howdy! I'm a fullstack engineer. I like building things that are fast, feel good to use, and are worth coming back to.",
    role: "Role",
    roleValue: "Software Engineer, Full Stack",
    base: "Base",
    baseValue: "Jersey City, NJ",
    stack: "Stack",
    main: "Main",
    mainValue: "Jigglypuff (SSBU)",
    pokeMe: "Poke me",
    poked: (n: number) => `Poked ×${n}`,
    contact: "Contact",
    email: "Email",
  },
  experience: {
    meta: (roles: number) => `${roles} roles · 2018—2026`,
  },
  work: {
    meta: (entries: number) => `Index · ${entries} entries`,
    figure: (no: string, title: string) => `Fig. ${no} — ${title}`,
    enlargeFine: "Click to enlarge",
    enlargeTouch: "Tap to enlarge",
    enlarge: (title: string) => `Enlarge the ${title} screenshot`,
    screenshot: (title: string) => `${title} screenshot`,
    prevShot: "Previous screenshot",
    nextShot: "Next screenshot",
    close: "Close",
  },
  lab: {
    meta: "Drag me around",
    loading: "Loading toys…",
  },
  contact: {
    title: "Say howdy.",
    email: "Email",
    blockTitle: "Title",
    endOfSheet: "End of sheet",
    drawnBy: "Drawn by",
    sheet: "Sheet",
    sheetValue: "1 of 1",
    printed: "Printed",
    builtWith: "Built with",
    approved: "Approved",
    stampAgain: "Stamp it again",
  },
};

export type Strings = typeof en;

const ja: Strings = {
  meta: {
    title: "Reo Matsuda — フルスタックエンジニア",
    description:
      "React を中心に開発するフルスタックエンジニア、Reo Matsuda のポートフォリオ。DAU 55K 超の共通チェックアウトや、100万人超が参加した Black Friday 施策を 2 年連続でリリース。",
  },
  sections: {
    top: "プロフィール",
    experience: "職務経歴",
    work: "個人開発",
    lab: "ラボ",
    contact: "連絡先",
  },
  topBar: {
    mark: "ＲＭ―ポートフォリオ",
    lightRevision: "ライト版",
    sectionsNav: "セクション",
    place: "ジャージーシティ",
    placeShort: "NJ",
  },
  hero: {
    sheet: "シート 01 — プロフィール",
    hintFine: "名前にホバーかクリック",
    hintTouch: "タップかスクロール",
    claim:
      "Howdy! フルスタックエンジニアです。速くて、触っていて気持ちよく、また使いたくなるプロダクトを作るのが好きです。",
    role: "職種",
    roleValue: "フルスタックエンジニア",
    base: "拠点",
    baseValue: "米国ニュージャージー州ジャージーシティ",
    stack: "スタック",
    main: "持ちキャラ",
    mainValue: "プリン（スマブラSP）",
    pokeMe: "つついて",
    poked: (n) => `つついた ×${n}`,
    contact: "連絡先",
    email: "メール",
  },
  experience: {
    meta: (roles) => `${roles} ポジション · 2018—2026`,
  },
  work: {
    meta: (entries) => `一覧 · ${entries} 件`,
    figure: (no, title) => `図 ${no} — ${title}`,
    enlargeFine: "クリックで拡大",
    enlargeTouch: "タップで拡大",
    enlarge: (title) => `${title} のスクリーンショットを拡大`,
    screenshot: (title) => `${title} のスクリーンショット`,
    prevShot: "前のスクリーンショット",
    nextShot: "次のスクリーンショット",
    close: "閉じる",
  },
  lab: {
    meta: "ドラッグで動かせます",
    loading: "読み込み中…",
  },
  contact: {
    title: "まずは Howdy から。",
    email: "メール",
    blockTitle: "題名",
    endOfSheet: "シート終わり",
    drawnBy: "作図",
    sheet: "シート",
    sheetValue: "1 / 1",
    printed: "印刷",
    builtWith: "技術スタック",
    approved: "承認",
    stampAgain: "もう一度押す",
  },
};

export const STRINGS: Record<Lang, Strings> = { en, ja };
