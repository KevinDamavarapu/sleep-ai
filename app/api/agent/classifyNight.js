export function classifyNight({ mood, thoughts }) {
  // Explicit user choice always wins
  if (mood) return mood;

  if (!thoughts || thoughts.trim().length === 0) {
    return "heavy";
  }

  const text = thoughts.toLowerCase();

  if (
    text.includes("anxious") ||
    text.includes("panic") ||
    text.includes("fear") ||
    text.includes("worried")
  ) {
    return "anxious";
  }

  if (text.length > 120) {
    return "racing";
  }

  return "blank";
}
