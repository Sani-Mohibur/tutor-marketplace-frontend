export const ROLES = {
  STUDENT: "student",
  TUTOR: "tutor",
  ADMIN: "admin",
  SUPPORT_ADMIN: "support_admin",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
