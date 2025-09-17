import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import RequestsTable from "./requests-table";

export default function RequestsSummary() {
  return (
    <Card className="mt-10">
      <CardHeader className="border-b">
        <section className="space-y-4 mb-2">
          <h2 className="font-semibold text-2xl">My Requests</h2>
          <div className="flex gap-12 items-end">
            <div className="space-y-1">
              <h3>Status Filter</h3>
              <Select>
                <SelectTrigger className="w-[500px] py-6">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="pending">Pending Requests</SelectItem>
                  <SelectItem value="approved">Approved Requests</SelectItem>
                  <SelectItem value="rejected">Rejected Requests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-2">
              <Button> Apply Filter</Button>
            </div>
          </div>
        </section>
      </CardHeader>
      <CardContent>
        <div>
          <RequestsTable />
        </div>
      </CardContent>
    </Card>
  );
}
