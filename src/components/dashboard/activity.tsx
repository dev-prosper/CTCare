import { Bell } from "lucide-react";
export default function Activity() {
  return (
    <article className="flex gap-4 items-center">
      <div>
        <Bell className="size-6" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">Leave Request Approved</h3>
        <p className="text-cavista-text-gray">
          Your leave request has been approved
        </p>
        <p className="text-cavista-text-gray text-sm font-medium">2 days ago</p>
      </div>
    </article>
  );
}
