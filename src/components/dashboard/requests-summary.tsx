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
import { toast } from "react-toastify";
import { LeaveFiltersSchema } from "@/schemas";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormLabel, FormItem, FormField, FormControl } from "../ui/form";
import { useForm } from "react-hook-form";

export type LeaveFilterFormValues = z.infer<typeof LeaveFiltersSchema>;

export default function RequestsSummary() {
  const [filters, setFilters] = useState<LeaveFilterFormValues>({
    requestType: "",
    date: "",
  });

  const filterTable = (values: LeaveFilterFormValues) => {
    if (!values.date && !values.requestType) {
      toast.error("Please select a filter");
      return;
    }

    const formattedDate = values.date
      ? new Date(values.date).toDateString()
      : "";

    setFilters({
      ...values,
      date: formattedDate,
    });
  };

  const clearFilters = () => {
    form.reset({
      requestType: "",
      date: "",
    });

    setFilters({
      requestType: "",
      date: "",
    });
  };

  const form = useForm<LeaveFilterFormValues>({
    resolver: zodResolver(LeaveFiltersSchema),
    defaultValues: {
      requestType: "",
      date: "",
    },
  });
  const { isDirty } = form.formState;

  return (
    <Card className="mt-10">
      <CardHeader className="border-b">
        <section className="space-y-4">
          <h2 className="font-semibold text-xl">My Leave History</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(filterTable)}
              className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-end w-full"
            >
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status filter</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="pending">
                          Pending Requests
                        </SelectItem>
                        <SelectItem value="approved">
                          Approved Requests
                        </SelectItem>
                        <SelectItem value="rejected">
                          Rejected Requests
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Date filter</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="trigger"
                          className="bg-inherit border w-full text-left text-[#888] "
                          role="combobox"
                        >
                          {field.value
                            ? new Date(field.value).toDateString()
                            : "All Dates"}
                          <ChevronDown />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(val) =>
                            field.onChange(val ? val.toISOString() : "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <div className="space-x-5 w-fit">
                <Button
                  type="submit"
                  className="cursor-pointer bg-cavista-red hover:bg-white hover:border hover:border-cavista-red hover:text-cavista-red"
                  disabled={!isDirty}
                >
                  {" "}
                  Apply Filter
                </Button>
                <Button
                  type="reset"
                  onClick={clearFilters}
                  disabled={!isDirty}
                  className="cursor-pointer"
                >
                  {" "}
                  Clear Filter
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </CardHeader>

      <CardContent>
        <div>
          <RequestsTable filters={filters} />
        </div>
      </CardContent>
    </Card>
  );
}
