import { Card, CardHeader, CardContent } from "../ui/card";
import Activity from "./activity";

export default function RecentActivities() {
  return (
    <Card className="mt-10">
      <CardHeader className="border-b">
        <section>
          <h2 className="font-semibold text-xl">Recent Activity</h2>
        </section>
      </CardHeader>
      <CardContent>
        <div>
          {/* <RequestsTable /> */}
          <Activity />
        </div>
      </CardContent>
    </Card>
  );
}
