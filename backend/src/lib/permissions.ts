export const PERMISSIONS = [
  {
    key: "programs",
    label: "Programs",
    description: "Create and manage programs (catalog)",
  },
  {
    key: "users",
    label: "Users",
    description: "Create and manage user accounts",
  },
  {
    key: "workshops",
    label: "Workshops",
    description: "Add and manage workshops",
  },
  {
    key: "events",
    label: "Event Management",
    description: "Create and manage standalone events (separate from workshops)",
  },
] as const;

export type PermissionKey = (typeof PERMISSIONS)[number]["key"];
