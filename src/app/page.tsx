import LeaveStatusCards from "@/components/dashboard/leave-status-cards";
import RecentActivities from "@/components/dashboard/recent-activities";
import RequestsSummary from "@/components/dashboard/requests-summary";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <section className="px-8 py-10">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-2xl font-black">My Sick Leave</h1>
          <p className="text-sm text-cavista-text-gray">
            View your requests, balances, and upcoming leaves in real-time
          </p>
        </div>

        <div>
          <Button className="bg-cavista-red py-6 flex items-center">
            <p className="font-semibold">Request Sick Leave</p>
            <span>
              <Plus className="text-white font-bold" />
            </span>
          </Button>
        </div>
      </div>

      <LeaveStatusCards />
      <RequestsSummary />
      <RecentActivities />
    </section>
  );
}
