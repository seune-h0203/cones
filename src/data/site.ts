export const SITE = {
  name: "CONES",
  tagline: "TWO ORIGINS, ONE SYSTEM.",
  message: ["FOUR MINDS.", "TWO ORIGINS.", "ONE SYSTEM."],
  project: "CONNECTION : 00",
  projectLabel: "PROJECT : CONNECTION : 00",
  description:
    "CONES. TWO ORIGINS, ONE SYSTEM. AI UNIT과 COMPUTER UNIT, 네 명의 아티스트가 하나의 시스템이 된다.",
} as const;

export const COMPANY = {
  role: "CEO / DIRECTOR",
  name: "김남주",
} as const;

/** Debut showcase — 2026.09.14, 10:20 AM local time. */
export const DEBUT_DATE = new Date(2026, 8, 14, 10, 20, 0);

export const DEBUT_LABEL = "09.14.2026";

/** CONES × ALL — official MD campaign group poster (3:2). */
export const GROUP_MD_POSTER = "images/md/cones-group-md.jpg";

export const NAV = [
  { label: "ORIGINS", path: "#origins" },
  { label: "SYSTEM", path: "#system" },
  { label: "ARTISTS", path: "#artists" },
  { label: "PROJECT", path: "#project" },
  { label: "TEAM", path: "#team" },
  { label: "MD", path: "#shop" },
] as const;

export interface UnitInfo {
  id: "ai" | "computer";
  name: string;
  mandate: string;
  origin: string;
  description: string;
}

export const UNITS: Record<UnitInfo["id"], UnitInfo> = {
  ai: {
    id: "ai",
    name: "AI UNIT",
    mandate: "THINK / PREDICT",
    origin: "ORIGIN 01",
    description:
      "관측한 것을 해석하고, 아직 오지 않은 결과를 계산한다. AI UNIT은 시스템의 판단을 담당한다.",
  },
  computer: {
    id: "computer",
    name: "COMPUTER UNIT",
    mandate: "BUILD / EXECUTE",
    origin: "ORIGIN 02",
    description:
      "판단을 구조로 옮기고, 구조를 현실에서 작동시킨다. COMPUTER UNIT은 시스템의 실행을 담당한다.",
  },
};

export const CYCLE = [
  { ability: "LEARN", unit: "AI UNIT", artist: "SERINA" },
  { ability: "PREDICT", unit: "AI UNIT", artist: "BAESAN" },
  { ability: "DESIGN", unit: "COMPUTER UNIT", artist: "HYUN JIZEL" },
  { ability: "EXECUTE", unit: "COMPUTER UNIT", artist: "HAM BOM" },
] as const;
