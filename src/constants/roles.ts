export const ROLES = {
  STUDENT: "student",
  TUTOR: "tutor",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
