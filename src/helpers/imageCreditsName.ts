export function imageCreditsName(string: string | null): string {
  const validUrl = /(https?:\/\/[^\s]+)/g;
  const result: string[] = [];
  string?.split(" ").forEach((ele) => {
    if (!validUrl.test(ele)) result.push(ele);
  });
  return result.join(" ");
}
