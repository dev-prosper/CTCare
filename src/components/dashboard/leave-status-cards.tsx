"use client";
import { SquareCheck, ClockIcon, Ban, Calendar } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import getLeaveRequestsStats from "@/query-opts/leave-stats";
import getLeaveBalance from "@/query-opts/leave-balance";

export default function LeaveStatusCards() {
  const { data: leaveStats } = useQuery(getLeaveRequestsStats());
  const { data: leaveBalance } = useQuery(getLeaveBalance());

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8  mt-10">
      <Card className="rounded-xl bg-amber-600 text-[#ccc] max-w-[350px] shadow-sm">
        <CardContent className="flex justify-between items-center text-white">
          <div className="space-y-2">
            <h3 className=" text-base font-medium">Pending Requests</h3>
            <p className="text-2xl font-bold">{leaveBalance?.pending}</p>
          </div>
          <ClockIcon className="size-6" />
        </CardContent>
      </Card>

      <Card className="rounded-xl bg-green-800/90 text-[#ccc] md:max-w-[350px] w-full shadow-sm">
        <CardContent className="flex justify-between items-center text-white">
          <div className="space-y-2">
            <h3 className="font-medium text-base">Approved Requests</h3>
            <p className="text-2xl font-bold">{leaveStats?.approved}</p>
          </div>
          <SquareCheck className="size-6" />
        </CardContent>
      </Card>

      <Card className="rounded-xl bg-red-800 text-[#ccc] md:max-w-[350px] shadow-smr">
        <CardContent className="flex justify-between items-center text-white">
          <div className="space-y-2">
            <h3 className="font-medium text-base">Rejected Requests</h3>
            <p className="text-2xl font-bold">{leaveStats?.cancelled}</p>
          </div>
          <Ban className="size-6" />
        </CardContent>
      </Card>

      <Card className="rounded-xl bg-cavista-text-gray text-[#ccc] md:max-w-[350px] shadow-sm">
        <CardContent className="flex justify-between items-center text-white">
          <div className="space-y-2">
            <h3 className="font-medium text-base">Available Balance</h3>
            <p className="text-2xl font-bold">{leaveBalance?.available}</p>
          </div>
          <Calendar className="size-6" />
        </CardContent>
      </Card>
    </div>
  );
}
