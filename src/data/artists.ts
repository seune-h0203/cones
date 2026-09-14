import type { UnitInfo } from "./site";

export type AbilityId = "LEARN" | "PREDICT" | "DESIGN" | "EXECUTE";

export interface ArtistImages {
  /** native-resolution editorial portrait */
  portrait: string;
  /** downscaled portrait for small viewports (srcset) */
  portraitSmall: string;
  /** cinematic 16:9 band — teaser poster */
  wide: string;
  /** 1200x630 open-graph card */
  og: string;
  /** official MD collection catalogue poster (3:2) */
  md: string;
}

export interface ProfileField {
  label: string;
  value: string;
}

export interface Artist {
  id: string;
  index: string;
  stageName: string;
  koreanName: string;
  realName: string;
  unit: UnitInfo["id"];
  ability: AbilityId;
  abilityLine: string;
  position: string;
  specialty: string;
  affiliation: string;
  birthDate?: string;
  age?: string;
  fandom?: string;
  instagram?: string;
  sentence: string;
  images: ArtistImages;
  /** face-safe framing for object-fit: cover */
  objectPosition: string;
}

const img = (id: string): ArtistImages => ({
  portrait: `images/${id}-portrait.jpg`,
  portraitSmall: `images/${id}-portrait-sm.jpg`,
  wide: `images/${id}-wide.jpg`,
  og: `images/og/${id}.jpg`,
  md: `images/md/${id}-md.jpg`,
});

export const ARTISTS: Artist[] = [
  {
    id: "rina",
    index: "01",
    stageName: "SERINA",
    koreanName: "세리나",
    realName: "박세린",
    unit: "ai",
    ability: "LEARN",
    abilityLine: "관측하고, 축적하고, 다시 쓴다.",
    position: "MAIN DESIGNER",
    specialty: "수어",
    affiliation: "인공지능학과",
    birthDate: "2003.05.23",
    fandom: "에아",
    instagram: "lavie_est_be1le",
    sentence: "Dreams come true",
    images: img("rina"),
    objectPosition: "50% 28%",
  },
  {
    id: "baesan",
    index: "02",
    stageName: "BAESAN",
    koreanName: "배산",
    realName: "배정호",
    unit: "ai",
    ability: "PREDICT",
    abilityLine: "가능한 미래를 먼저 계산한다.",
    position: "MARKETING",
    specialty: "끈기",
    affiliation: "인공지능학과",
    birthDate: "2003.12.27",
    fandom: "에아",
    instagram: "ho_bae3",
    sentence: "꿈이 크면 깨져도 크다",
    images: img("baesan"),
    objectPosition: "55% 30%",
  },
  {
    id: "hyun-jizel",
    index: "03",
    stageName: "HYUN JIZEL",
    koreanName: "현지젤",
    realName: "현세은",
    unit: "computer",
    ability: "DESIGN",
    abilityLine: "판단을 구조로 옮긴다.",
    position: "MAIN PLANNER",
    specialty: "기죽지 않는 깡다구",
    affiliation: "컴퓨터공학과",
    birthDate: "2006.02.03",
    fandom: "피터",
    instagram: "seune.h_0203",
    sentence: "JUST DO IT",
    images: img("hyun-jizel"),
    objectPosition: "58% 30%",
  },
  {
    id: "ham-bom",
    index: "04",
    stageName: "HAM BOM",
    koreanName: "함봄",
    realName: "함채림",
    unit: "computer",
    ability: "EXECUTE",
    abilityLine: "설계를 현실에서 작동시킨다.",
    position: "MAIN DEVELOPER",
    specialty: "사람 기분 한눈에 파악하기",
    affiliation: "컴퓨터공학과",
    birthDate: "2002.09.06",
    fandom: "피터",
    instagram: "npchamster",
    sentence: "이제 시작입니다!!",
    images: img("ham-bom"),
    objectPosition: "52% 26%",
  },
];

export const ABILITY_COPY: Record<AbilityId, { title: string; body: string }> = {
  LEARN: {
    title: "관측에서 데이터로",
    body: "흩어진 신호를 모아 패턴으로 정리한다. LEARN이 없으면 시스템은 어제와 같은 판단을 반복한다.",
  },
  PREDICT: {
    title: "데이터에서 미래로",
    body: "축적된 패턴 위에서 갈라지는 경로를 계산한다. PREDICT는 시스템이 어디로 갈지 먼저 본다.",
  },
  DESIGN: {
    title: "미래에서 구조로",
    body: "예측을 도면으로 옮긴다. DESIGN은 아이디어에 좌표와 순서를 부여해 만들 수 있는 것으로 만든다.",
  },
  EXECUTE: {
    title: "구조에서 현실로",
    body: "설계를 실제로 작동시킨다. EXECUTE에서 시스템은 다시 관측 가능한 결과가 되어 LEARN으로 돌아간다.",
  },
};

export function getArtist(id: string | undefined): Artist | undefined {
  return ARTISTS.find((artist) => artist.id === id);
}

export function getArtistIndex(id: string): number {
  return ARTISTS.findIndex((artist) => artist.id === id);
}

export function getNeighbours(id: string): { prev: Artist; next: Artist } {
  const i = getArtistIndex(id);
  const total = ARTISTS.length;
  return {
    prev: ARTISTS[(i - 1 + total) % total],
    next: ARTISTS[(i + 1) % total],
  };
}

export function getUnitPartner(artist: Artist): Artist | undefined {
  return ARTISTS.find((other) => other.unit === artist.unit && other.id !== artist.id);
}

export function profileFields(artist: Artist): ProfileField[] {
  const fields: (ProfileField | null)[] = [
    { label: "REAL NAME", value: artist.realName },
    { label: "KOREAN NAME", value: artist.koreanName },
    { label: "AFFILIATION", value: artist.affiliation },
    artist.birthDate ? { label: "DATE OF BIRTH", value: artist.birthDate } : null,
    artist.age ? { label: "AGE", value: artist.age } : null,
    { label: "POSITION", value: artist.position },
    { label: "SPECIALTY", value: artist.specialty },
    artist.fandom ? { label: "FANDOM", value: artist.fandom } : null,
    artist.instagram ? { label: "INSTAGRAM", value: `@${artist.instagram}` } : null,
  ];
  return fields.filter((field): field is ProfileField => field !== null);
}
