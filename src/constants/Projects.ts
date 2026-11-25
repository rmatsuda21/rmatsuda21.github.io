import type { Lang } from "@/i18n/lang";
import type { ProjectImage, ProjectType } from "@/types/ProjectType";
import cstatGachaComImg from "@/assets/projects/cstat-gacha-com.webp";
import pitchIoImg from "@/assets/projects/pitch-io.webp";
import pitchIoRelativePitchImg from "@/assets/projects/pitch-io-relative-pitch.webp";
import pitchIoSandboxImg from "@/assets/projects/pitch-io-sandbox.webp";
import smashRankerImg from "@/assets/projects/smash-ranker.webp";
import smashRankerHomeImg from "@/assets/projects/smash-ranker-home.webp";
import smashRankerTierImg from "@/assets/projects/smash-ranker-tier.webp";
import taisenMuraImg from "@/assets/projects/taisen-mura.webp";
import taisenMuraProfileImg from "@/assets/projects/taisen-mura-profile.webp";
import taisenMuraRankingImg from "@/assets/projects/taisen-mura-ranking.webp";

/** The parts of a project that are written out, once per language. */
type Copy = Pick<ProjectType, "tagline" | "description"> & {
  /** One per image, in the same order as `images`. */
  alts: readonly string[];
  /** One per link, in the same order as `links`. */
  linkLabels: readonly string[];
};

type Entry = Omit<ProjectType, keyof Copy | "links" | "images"> & {
  /** Screenshots in the order they are paged through; the first is the cover. */
  images: readonly Omit<ProjectImage, "alt">[];
  links: readonly string[];
  copy: Record<Lang, Copy>;
};

const ENTRIES: readonly Entry[] = [
  {
    no: "001",
    title: "Smash Ranker",
    stack: "React · TS · GraphQL",
    images: [
      { src: smashRankerImg, width: 1600, height: 1000 },
      { src: smashRankerTierImg, width: 1600, height: 1000 },
      { src: smashRankerHomeImg, width: 1600, height: 1000 },
    ],
    links: [
      "https://smash-ranker.vercel.app/",
      "https://github.com/rmatsuda21/smash-ranker",
    ],
    copy: {
      en: {
        tagline: "Custom graphics for Smash Bros. tournaments",
        alts: [
          "Smash Ranker editor showing a tournament top 8 graphic",
          "Smash Ranker tier list maker with characters sorted into tiers",
          "Smash Ranker home screen listing its tools",
        ],
        linkLabels: ["Visit project", "GitHub"],
        description: [
          "Smash Ranker is a one-stop site for making Smash Bros. graphics right in your browser: top 8 cards, tier lists, and prediction graphics!",
          "As a tournament organizer myself, this has been a passion project of mine for years and I'm excited to share it with the community!",
          "For a top 8, just throw your tournament URL into the application and it'll pull the results from start.gg, Challonge, or Tonamel and fill in a graphic for you! Pick a template, then customize the colors, fonts, text, characters, and images, and export the finished design as a PNG, JPEG, or WEBP file.",
          "The tier list maker lets you drag the Ultimate or Melee roster into tiers, with several layouts, image styles, and color palettes to choose from. The predictions tool loads a tournament's entrants so you can drag them into your predicted order and share your picks.",
          "There's also a tournament recap that lays out your run set by set, and you can log in with start.gg to jump straight to your own tournaments.",
          "Don't worry about your creation getting lost: your designs and uploaded assets are saved in your browser, so they'll still be there after you close the tab! The whole site is available in English and Japanese.",
        ],
      },
      ja: {
        tagline: "スマブラ大会のグラフィックジェネレーター",
        alts: [
          "大会トップ8のグラフィックを表示した Smash Ranker のエディタ",
          "キャラクターをランクごとに並べた Smash Ranker のティアリストメーカー",
          "ツールが並ぶ Smash Ranker のホーム画面",
        ],
        linkLabels: ["プロジェクトを見る", "GitHub"],
        description: [
          "Smash Ranker は、スマブラのグラフィックをブラウザだけで作れるサイトです。トップ8、ティアリスト、順位予想のグラフィックがここひとつで作れます！",
          "自分自身も大会を主催しているので、何年も温めてきた思い入れのあるプロジェクトです。コミュニティに届けられてうれしいです！",
          "トップ8は、大会の URL を入れるだけで start.gg・Challonge・Tonamel から結果を取得してグラフィックを自動で埋めます。テンプレートを選んで、色・フォント・テキスト・キャラクター・画像を自由にカスタマイズし、完成したデザインは PNG・JPEG・WEBP で書き出せます。",
          "ティアリストメーカーでは、スマブラSP や DX のキャラクターをドラッグしてランク分けでき、レイアウト、画像スタイル、カラーパレットも選べます。順位予想ツールでは、大会の参加者を読み込んで予想順に並べ替え、自分の予想を共有できます。",
          "ほかにも、自分の戦績を 1 試合ずつ振り返れる大会リキャップがあり、start.gg でログインすれば自分の大会にすぐアクセスできます。",
          "デザインやアップロードした素材はブラウザに保存されるので、タブを閉じても消える心配はありません。サイト全体が英語と日本語に対応しています。",
        ],
      },
    },
  },
  {
    no: "002",
    title: "CSTAT Gacha Com",
    stack: "Next · TS · Sass",
    images: [{ src: cstatGachaComImg, width: 1600, height: 1044 }],
    links: [
      "https://cstat-gacha-com.vercel.app/",
      "https://github.com/rmatsuda21/cstat-gacha-com",
    ],
    copy: {
      en: {
        tagline: "Web viewer with a full codex, card search and offers",
        alts: ["CSTAT Gacha Com card codex"],
        linkLabels: ["Visit project", "GitHub"],
        description: [
          "CSTAT Gacha Com is a web viewer for the CSTAT Gacha project.",
          "Data is pulled from the CSTAT Gacha database and displayed in a user-friendly interface complete with a full codex, card searching, and offer viewing!",
        ],
      },
      ja: {
        tagline: "図鑑・カード検索・オファー閲覧ができる Web ビューア",
        alts: ["CSTAT Gacha Com のカード図鑑"],
        linkLabels: ["プロジェクトを見る", "GitHub"],
        description: [
          "CSTAT Gacha Com は、CSTAT Gacha プロジェクトの Web ビューアです。",
          "CSTAT Gacha の DB からデータを取得し、図鑑・カード検索・オファー閲覧を備えた使いやすい UI で表示します。",
        ],
      },
    },
  },
  {
    no: "003",
    title: "Pitch.io",
    stack: "Svelte · React",
    images: [
      { src: pitchIoImg, width: 1600, height: 1000 },
      { src: pitchIoRelativePitchImg, width: 1600, height: 1000 },
      { src: pitchIoSandboxImg, width: 1600, height: 1000 },
    ],
    links: [
      "https://pitch-io-svelte.vercel.app/",
      "https://github.com/rmatsuda21/pitch-io-svelte",
      "https://pitch-io.vercel.app/",
      "https://github.com/rmatsuda21/pitch-io",
    ],
    copy: {
      en: {
        tagline: "Relative pitch and chord trainer",
        alts: [
          "Pitch.io home screen with its three training modes",
          "Pitch.io relative pitch trainer with reference and mystery notes above a piano",
          "Pitch.io sandbox with a playable piano",
        ],
        linkLabels: [
          "Svelte version",
          "Svelte GitHub",
          "React original",
          "React GitHub",
        ],
        description: [
          "Pitch.io is a web based relative pitch and chord identification trainer. It has three modes: Relative Pitch Training, Chord Identification Training, and Freeplay.",
          "This application was created during the 2021 HowdyHack @ Texas A&M University.",
          "Awarded “Best Music Related”!",
          "The original was built with React and Webpack. In 2026 I rebuilt it with SvelteKit and TypeScript, keeping the look and making the layout responsive. Both versions are linked below.",
        ],
      },
      ja: {
        tagline: "相対音感・コード聴音のトレーニングアプリ",
        alts: [
          "3 つのトレーニングモードが並ぶ Pitch.io のホーム画面",
          "基準音と出題音のボタンがピアノの上に並ぶ Pitch.io の相対音感トレーナー",
          "自由に弾けるピアノがある Pitch.io のサンドボックス",
        ],
        linkLabels: [
          "Svelte 版",
          "Svelte GitHub",
          "React 版（オリジナル）",
          "React GitHub",
        ],
        description: [
          "Pitch.io は、相対音感とコードの聴き取りを鍛える Web アプリです。相対音感トレーニング、コード判別トレーニング、フリープレイの 3 モードがあります。",
          "2021 年、テキサス A&M 大学のハッカソン「HowdyHack」で開発しました。",
          "「Best Music Related」賞を受賞！",
          "オリジナルは React + Webpack 製。2026 年に SvelteKit + TypeScript へリプレイスし、デザインはそのままにレスポンシブ対応しました。どちらのバージョンも下のリンクから見られます。",
        ],
      },
    },
  },
  {
    no: "004",
    title: "Taisen Mura",
    stack: "React · TS · Supabase",
    images: [
      { src: taisenMuraImg, width: 1600, height: 1000 },
      { src: taisenMuraProfileImg, width: 1600, height: 1000 },
      { src: taisenMuraRankingImg, width: 1600, height: 1000 },
    ],
    // The repository is private, so only the live site is linked.
    links: ["https://taisen-mura.reo-matsuda-bfa.workers.dev/"],
    copy: {
      en: {
        tagline: "Elo-based matchmaking for Smash Bros. Ultimate",
        alts: [
          "Taisen Mura play screen with casual and ranked queues beside the season top 10",
          "Taisen Mura player profile with rating, badges, recent ranked matches and reviews",
          "Taisen Mura season ranking listing players by rating",
        ],
        linkLabels: ["Visit project"],
        description: [
          "Taisen Mura (対戦村, “battle village”) is a mobile-first site where Smash Bros. Ultimate players find 1-on-1 opponents, built for the Japanese community and written entirely in Japanese.",
          "Queue for a casual match, or play ranked and get paired with someone near your Elo rating. Once you're matched you get a room to chat with your opponent, share an arena ID, and report the result.",
          "Every player has a profile with their rating history, fighter usage, recent matches, badges, and reviews from past opponents. Seasonal rankings can be viewed overall or per fighter.",
          "The frontend is React 19 with TanStack Router and Query, and the backend is Supabase: Postgres, Auth, Realtime, and a Hono Edge Function. The browser can only read, under Row Level Security. Every write goes through the Edge Function, and ratings only change inside a single Postgres function, so nobody can edit their own stats.",
        ],
      },
      ja: {
        tagline: "スマブラSP の Elo レート制マッチングサイト",
        alts: [
          "カジュアルとランクの対戦待ちとシーズン TOP10 が並ぶ対戦村の対戦画面",
          "レート、バッジ、最近のランク戦、紹介文が並ぶ対戦村のプレイヤープロフィール",
          "プレイヤーをレート順に並べた対戦村のシーズンランキング",
        ],
        linkLabels: ["プロジェクトを見る"],
        description: [
          "対戦村（Taisen Mura）は、スマブラSP の 1on1 の対戦相手を探せる、モバイルファーストのマッチングサイトです。日本のコミュニティ向けに、UI はすべて日本語で作りました。",
          "カジュアルで気軽に対戦するか、ランクで Elo レートの近い相手とマッチングできます。マッチングすると対戦ルームが開き、相手とチャットしたり、専用部屋の ID を共有したり、結果を報告したりできます。",
          "プレイヤーごとにプロフィールがあり、レートの推移、使用キャラ、最近の対戦、バッジ、対戦相手からの紹介文が見られます。シーズンごとのランキングは、全体とファイター別で確認できます。",
          "フロントエンドは React 19 + TanStack Router／Query、バックエンドは Supabase（Postgres・Auth・Realtime・Hono 製の Edge Function）です。ブラウザからは RLS（Row Level Security）で読み取り専用に制限。書き込みはすべて Edge Function を経由し、レートの更新は Postgres 関数 1 つに集約しているので、自分の戦績を書き換えることはできません。",
        ],
      },
    },
  },
];

const localize = (lang: Lang): readonly ProjectType[] =>
  ENTRIES.map(({ copy, links, images, ...shared }) => {
    const { linkLabels, alts, ...text } = copy[lang];
    return {
      ...shared,
      ...text,
      images: images.map((image, i) => ({ ...image, alt: alts[i] })),
      links: links.map((href, i) => ({ href, label: linkLabels[i] })),
    };
  });

export const PROJECTS: Record<Lang, readonly ProjectType[]> = {
  en: localize("en"),
  ja: localize("ja"),
};
