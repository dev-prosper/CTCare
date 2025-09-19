import {
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
} from "../ui/table";
import { Requests_Data } from "@/data/dummy-data";
import { cn } from "@/lib/utils";
import { LeaveRequestFilters, LeaveRequestData } from "@/types";
import { useEffect, useState } from "react";

export default function RequestsTable({ filters }: LeaveRequestFilters) {
  const [requests, setRequests] = useState<LeaveRequestData[]>(Requests_Data);

  useEffect(() => {
    const { date, requestType } = filters;

    let filtered = [...Requests_Data];

    if (date) {
      filtered = filtered.filter(
        (request) => request.requestDate === date.split(" ").slice(1).join(" "),
      );
    }

    if (requestType) {
      filtered = filtered.filter((request) => request.status === requestType);
    }

    setRequests(filtered);
  }, [filters]);

  return (
    <Table>
      <TableHeader className="font-extrabold">
        <TableRow>
          <TableHead className="font-bold">Request Date</TableHead>
          <TableHead className="font-bold">Duration</TableHead>
          <TableHead className="font-bold">Reason</TableHead>
          <TableHead className="font-bold">Attachment</TableHead>
          <TableHead className="font-bold">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <TableRow key={index} className="h-12 text-cavista-text-gray">
              <TableCell>{request.requestDate}</TableCell>
              <TableCell>{request.duration} days</TableCell>
              <TableCell>{request.reason}</TableCell>
              <TableCell>{request.attachment}</TableCell>
              <TableCell>
                {" "}
                <span
                  className={cn(
                    "text-white font-medium px-4 py-1 rounded-full",
                    // request.status === "approved" && "bg-green-500",
                    // request.status === "rejected" && "bg-red-500",
                    // request.status === "pending" && "bg-yellow-500",
                    request.status === "approved"
                      ? "bg-emerald-500 text-emerald-100"
                      : request.status === "rejected"
                        ? "bg-rose-500 text-rose-100"
                        : "bg-amber-500 text-amber-100",
                  )}
                >
                  {request.status}
                </span>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
              <p>No leave requests matched filter</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
