"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type LeaveRequest = {
  id: number;
  requestDate: string;
  appliedBy: string;
  reason: string;
  duration: string;
  attachment?: string;
  status: "Pending" | "Approved" | "Rejected";
};

const initialData: LeaveRequest[] = [
  {
    id: 1,
    requestDate: "2025-09-20",
    appliedBy: "John Doe",
    reason: "Medical leave",
    duration: "3 days",
    attachment: "/files/report.pdf",
    status: "Pending",
  },
  {
    id: 2,
    requestDate: "2025-09-22",
    appliedBy: "Jane Smith",
    reason: "Family emergency",
    duration: "2 days",
    attachment: undefined,
    status: "Pending",
  },
];

export default function LeaveRequestPage() {
  const [requests, setRequests] = React.useState<LeaveRequest[]>(initialData);

  const handleStatusChange = (
    id: number,
    newStatus: "Approved" | "Rejected",
  ) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req)),
    );
  };

  return (
    <Card className="mx-8 my-4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Leave Requests</CardTitle>
        <CardDescription>
          A list of leave requests from staff that report to you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Date</TableHead>
                <TableHead>Applied By</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Attachment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{request.appliedBy}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>{request.duration}</TableCell>
                  <TableCell>
                    {request.attachment ? (
                      <a
                        href={request.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "Approved"
                          ? "secondary" // extend in badge.tsx
                          : request.status === "Rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(request.id, "Approved")}
                      disabled={request.status !== "Pending"}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleStatusChange(request.id, "Rejected")}
                      disabled={request.status !== "Pending"}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
