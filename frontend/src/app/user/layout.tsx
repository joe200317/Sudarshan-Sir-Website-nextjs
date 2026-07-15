import { UserAppShell } from "@/components/admin/AppShell";

export const metadata = {
  title: "User Panel — Mind Trainer",
  robots: { index: false, follow: false },
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserAppShell>{children}</UserAppShell>;
}
