import LeaveStatusCards from "@/components/dashboard/leave-status-cards";
import RecentActivities from "@/components/dashboard/recent-activities";
import RequestsSummary from "@/components/dashboard/requests-summary";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <section className="px-8 py-10">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold">My Sick Leave</h1>
          <p className="text-xl leading-6 font-medium text-cavista-text-gray">
            View your requests, balances, and upcoming leaves in real-time
          </p>
        </div>

        <div>
          <Button className="bg-cavista-red py-8 text-lg">
            <span>
              <Plus className="text-white font-bold size-6" />
            </span>
            Request Sick Leave
          </Button>
        </div>
      </div>

      <LeaveStatusCards />
      <RequestsSummary />
      <RecentActivities />
    </section>
  );
}
