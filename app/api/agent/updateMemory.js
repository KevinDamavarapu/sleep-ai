export function updateMemory(prevMemory = {}, strategyUsed) {
  return {
    ...prevMemory,
    preferredStrategy: strategyUsed,
    lastUsedAt: Date.now(),
  };
}
