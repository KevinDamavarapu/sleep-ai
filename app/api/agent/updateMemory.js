export function updateMemory(prevMemory = {}, strategyUsed) {
  const now = Date.now();

  const safeMemory = prevMemory || {};

  return {
    createdAt : safeMemory.createdAt || now,
    preferredStrategy: strategyUsed,
    lastUsedAt: now,
  };
}
