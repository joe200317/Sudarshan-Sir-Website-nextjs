export type AppRole = "SUPER_ADMIN" | "USER";

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: AppRole;
};
