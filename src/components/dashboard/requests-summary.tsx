"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import RequestsTable from "./requests-table";
import { Calendar } from "../ui/calendar";
import { ChevronDown } from "lucide-react";

export default function RequestsSummary() {
  const [date, setDate] = useState<Date>();

  return (
    <Card className="mt-10">
      <CardHeader className="border-b">
        <section className="space-y-4 mb-2">
          <h2 className="font-semibold text-xl">My Leave History</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 items-end">
            <div className="">
              <h3 className="text-sm text-[#333] font-medium">Status Filter</h3>
              <Select>
                <SelectTrigger className="w-full max-w-[500px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="pending">Pending Requests</SelectItem>
                  <SelectItem value="approved">Approved Requests</SelectItem>
                  <SelectItem value="rejected">Rejected Requests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="">
              <h3 className="text-sm text-[#333] font-medium">Date Filter</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="trigger"
                    className="bg-inherit border w-full max-w-[500px] text-left text-[#888] "
                    role="combobox"
                  >
                    {date ? date.toDateString() : "All Dates"} <ChevronDown />
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
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
