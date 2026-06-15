export function parseLimit(
  value: unknown,
  defaultValue = 50,
  maxValue = 200
): number {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (rawValue === undefined) {
    return defaultValue;
  }

  const parsed = Number(rawValue);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return defaultValue;
  }

  return Math.min(parsed, maxValue);
}
