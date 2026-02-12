export function validateSafeInput(value: string, field: string): string {
  const SAFE = /^[A-Za-z0-9 .-]+$/;

  if (!SAFE.test(value)) {
    throw new Error(
      `Invalid characters in ${field}. Allowed: letters, numbers, space, dot, hyphen`,
    );
  }

  if (value.length > 100) {
    throw new Error(`${field} is too long`);
  }

  return value;
}
