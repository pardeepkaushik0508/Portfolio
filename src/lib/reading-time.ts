const WORDS_PER_MINUTE = 220;

export function countWords(text: string): number {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_\-|[\](){}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return 0;
  return cleaned.split(" ").filter(Boolean).length;
}

export function calculateReadingTime(text: string, wpm = WORDS_PER_MINUTE) {
  const words = countWords(text);
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return {
    words,
    minutes,
    text: `${minutes} min read`,
    timeRequired: `PT${minutes}M`,
  };
}
