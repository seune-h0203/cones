const formatter = new Intl.NumberFormat("ko-KR");

export function formatKrw(amount: number): string {
  return `₩ ${formatter.format(amount)}`;
}
