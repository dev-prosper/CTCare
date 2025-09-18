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

export default function RequestsTable() {
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
        {Requests_Data.map((request, index) => (
          <TableRow key={index} className="h-12 text-cavista-text-gray">
            <TableCell>{request.request_date}</TableCell>
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
        ))}
      </TableBody>
    </Table>
  );
}
