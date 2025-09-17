import { SquareCheck, ClockIcon, Ban, Calendar } from "lucide-react";

export default function LeaveStatusCards() {
  return (
    <div className="grid grid-cols-4 mt-10">
      <div className="rounded-xl bg-yellow-500 text-white w-[350px] py-6 px-8 flex justify-between items-center">
        <div className="space-y-2">
          <h3 className="font-light text-xl">Pending Requests</h3>
          <p className="text-3xl font-bold">2</p>
        </div>
        <ClockIcon className="size-8" />
      </div>

      <div className="rounded-xl bg-green-500 text-white w-[350px] py-6 px-8 flex justify-between items-center">
        <div className="space-y-2">
          <h3 className="font-light text-xl">Approved Request</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
        <SquareCheck className="size-8" />
      </div>

      <div className="rounded-xl bg-red-500 text-white w-[350px] py-6 px-8 flex justify-between items-center">
        <div className="space-y-2">
          <h3 className="font-light text-xl">Rejected Requests</h3>
          <p className="text-3xl font-bold">15</p>
        </div>
        <Ban className="size-8" />
      </div>

      <div className="rounded-xl bg-cavista-text-gray text-white w-[350px] py-6 px-8 flex justify-between items-center">
        <div className="space-y-2">
          <h3 className="font-light text-xl">Total Leave Balance</h3>
          <p className="text-3xl font-bold">15</p>
        </div>
        <Calendar className="size-8" />
      </div>
    </div>
  );
}
