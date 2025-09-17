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
      <TableHeader>
        <TableRow className="text-lg">
          <TableHead>Request Date</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Attachment</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Requests_Data.map((request, index) => (
          <TableRow
            key={index}
            className="h-12 text-base font-medium text-cavista-text-gray"
          >
            <TableCell>{request.request_date}</TableCell>
            <TableCell>{request.duration} days</TableCell>
            <TableCell>{request.reason}</TableCell>
            <TableCell>{request.attachment}</TableCell>
            <TableCell>
              {" "}
              <span
                className={cn(
                  "text-white font-medium px-4 py-1 rounded-full",
                  request.status === "approved" && "bg-green-500",
                  request.status === "rejected" && "bg-red-500",
                  request.status === "pending" && "bg-yellow-500",
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
