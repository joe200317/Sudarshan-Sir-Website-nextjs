import WorkshopManager from "@/components/admin/WorkshopManager";

export default function AdminWorkshopsPage() {
  // Super admin can view workshops, but cannot add (users add them)
  return <WorkshopManager canCreate={false} />;
}
