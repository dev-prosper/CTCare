import { SquareCheck, ClockIcon, Ban, Calendar } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function LeaveStatusCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8  mt-10">
      <Card className="rounded-xl bg-amber-600 text-[#ccc] max-w-[350px] shadow-sm">
        <CardContent className="flex justify-between items-center text-white">
          <div className="space-y-2">
            <h3 className=" text-base font-medium">Pending Requests</h3>
            <p className="text-2xl font-bold">2</p>
          </div>
          <ClockIcon className="size-6" />
        </CardContent>
      </Card>

      <Card className="rounded-xl bg-green-800/90 text-[#ccc] md:max-w-[350px] w-full shadow-sm">
        <CardContent className="flex justify-between items-center text-white">
          <div className="space-y-2">
            <h3 className="font-medium text-base">Approved Request</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
          <SquareCheck className="size-6" />
        </CardContent>
      </Card>

      <Card className="rounded-xl bg-red-800 text-[#ccc] md:max-w-[350px] shadow-smr">
        <CardContent className="flex justify-between items-center text-white">
          <div className="space-y-2">
            <h3 className="font-medium text-base">Rejected Requests</h3>
            <p className="text-2xl font-bold">15</p>
          </div>
          <Ban className="size-6" />
        </CardContent>
      </Card>

      <Card className="rounded-xl bg-cavista-text-gray text-[#ccc] md:max-w-[350px] shadow-sm">
        <CardContent className="flex justify-between items-center text-white">
          <div className="space-y-2">
            <h3 className="font-medium text-base">Total Leave Balance</h3>
            <p className="text-2xl font-bold">15</p>
          </div>
          <Calendar className="size-6" />
        </CardContent>
      </Card>
    </div>
  );
}
