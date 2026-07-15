/** All app menus / permission keys */

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

export const ALL_PERMISSION_KEYS = PERMISSIONS.map((p) => p.key);
