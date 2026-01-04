export function selectStrategy(nightType, memory) {
  // If something worked recently, reuse it
  if (memory?.preferredStrategy) {
    return memory.preferredStrategy;
  }

  const strategyMap = {
    racing: "offload_then_loop",
    anxious: "grounding_voice",
    heavy: "minimal_reassurance",
    blank: "sensory_story",
    wakeup: "continuity_story",
  };

  return strategyMap[nightType] || "offload_then_loop";
}
