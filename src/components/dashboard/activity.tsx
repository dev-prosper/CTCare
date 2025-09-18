import { Bell } from "lucide-react";
export default function Activity() {
  return (
    <article className="flex gap-4 items-center">
      <div>
        <Bell className="size-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold">Leave Request Approved</h3>
        <p className="text-cavista-text-gray text-sm">
          Your leave request has been approved
        </p>
        <p className="text-cavista-text-gray text-[12px] font-semibold">
          2 days ago
        </p>
      </div>
    </article>
  );
}
