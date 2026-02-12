import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateSafeInput(value: string, field: string): string {
  const SAFE = /^[A-Za-z0-9 .-]+$/;

  if (!SAFE.test(value)) {
    throw new Error(
      `Invalid characters in ${field}. Allowed: letters, numbers, space, dot, hyphen`,
    );
  }

  return value;
}
