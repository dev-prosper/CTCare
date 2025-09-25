import { Card, CardHeader, CardContent } from "../ui/card";
// import Activity from "./activity";

export default function RecentActivities() {
  return (
    <Card className="mt-10">
      <CardHeader className="border-b">
        <section>
          <h2 className="font-semibold text-xl">Recent Activity</h2>
        </section>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          {/* <RequestsTable /> */}
          {/* <Activity /> */}

          <p className="text-cavista-text-gray text-sm font-medium">
            No recents activities
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
