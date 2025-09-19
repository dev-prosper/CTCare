import LeaveStatusCards from "@/components/dashboard/leave-status-cards";
import RecentActivities from "@/components/dashboard/recent-activities";
import RequestModal from "@/components/dashboard/request-modal";
import RequestsSummary from "@/components/dashboard/requests-summary";

export default function Dashboard() {
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
          <RequestModal />
        </div>
      </div>

      <LeaveStatusCards />
      <RequestsSummary />
      <RecentActivities />
    </section>
  );
}
