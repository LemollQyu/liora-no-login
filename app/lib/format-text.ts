export function truncateText(text: string, wordLimit: number = 20): string {
  if (!text) return "";

  const words = text.split(" ");
  if (words.length <= wordLimit) return text;

  const truncated = words.slice(0, wordLimit).join(" ");
  return truncated + "...";
}
