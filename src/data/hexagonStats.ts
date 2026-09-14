export interface HexagonStat {
  label: string;
  value: number;
}

/** Six-axis "character index" per artist, MAX 100 each. Keyed by artist.id. */
export const HEXAGON_STATS: Record<string, HexagonStat[]> = {
  baesan: [
    { label: "겉바속촉", value: 80 },
    { label: "주량", value: 80 },
    { label: "귀차니즘", value: 80 },
    { label: "테토력", value: 100 },
    { label: "끼", value: 55 },
    { label: "비주얼", value: 100 },
  ],
  rina: [
    { label: "테토력", value: 70 },
    { label: "끼", value: 70 },
    { label: "비주얼", value: 100 },
    { label: "수면욕", value: 80 },
    { label: "다정력", value: 60 },
    { label: "똘끼력", value: 100 },
  ],
  "hyun-jizel": [
    { label: "알콜중독", value: 80 },
    { label: "싸패지수", value: 95 },
    { label: "미친발상", value: 100 },
    { label: "테토력", value: 99 },
    { label: "끼", value: 85 },
    { label: "비주얼", value: 100 },
  ],
  "ham-bom": [
    { label: "테토력", value: 50 },
    { label: "끼", value: 70 },
    { label: "비주얼", value: 100 },
    { label: "충동구매력", value: 90 },
    { label: "맥시멀리스트력", value: 100 },
    { label: "역마살력", value: 80 },
  ],
};
