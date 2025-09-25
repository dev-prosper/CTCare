"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { LeaveRequestSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import api from "@/services/axios-instance";
import { getDateRange } from "@/helpers";
import { useAuthStore } from "@/store/auth-store";
import { LEAVE_CONSTANTS } from "@/constants";

export type LeaveRequestFormType = z.infer<typeof LeaveRequestSchema>;

export default function RequestModal() {
  const date = new Date().toDateString();
  const formattedDate = (str: string) => {
    return str.split(" ").slice(1).join(" ");
  };

  const form = useForm<LeaveRequestFormType>({
    resolver: zodResolver(LeaveRequestSchema),
    defaultValues: {
      requestDate: formattedDate(date),
      // reason: "",
      duration: 0,
      doctorNoteAttachmentId: null,
    },
  });

  // const duration = form.watch("duration");

  const submitRequest = async (data: LeaveRequestFormType) => {
    const employeeId = useAuthStore.getState().employeeId;

    console.log("Form submitted:", data);

    const { startDate, endDate } = getDateRange(
      data.requestDate,
      data.duration,
    );

    console.log(startDate);
    console.log(endDate);
    try {
      const res = api.post("api/v1/leave/requests", {
        employeeId: employeeId,
        leaveTypeId: LEAVE_CONSTANTS.leavetypeID,
        startDate: startDate.formatted,
        endDate: endDate.formatted,
        unit: 0,
        doctorNoteAttachmentId: null,
        comment: "",
      });
      console.log(res);
    } catch (error) {
      console.error(
        "Login failed:",
        error instanceof Error
          ? error.message
          : "An error occurred while submitting the form.",
      );
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-cavista-red py-6 flex items-center font-semibold">
          Request Sick Leave
          <span>
            <Plus className="text-white font-bold" />
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Want to request a Sick Leave?</DialogTitle>
          <DialogDescription className="text-[12px] font-medium text-[#111]">
            Note: Leave requests should not exceed maximum of two (2) days
            except backed by a Doctor&apos;s report.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitRequest, (errors) => {
                console.log("Validation failed:", errors);
              })}
              className="space-y-6 mt-3"
            >
              <FormField
                control={form.control}
                name="requestDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Leave Request Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        className="focus-visible:border-cavista-red focus-visible:border-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Enter reason for leave
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g Migraine, Accident, Cramps, .etc"
                        {...field}
                        className="focus-visible:border-cavista-red focus-visible:border-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Enter leave duration
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="focus-visible:border-cavista-red focus-visible:border-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* {duration > 2 && (
                <FormField
                  control={form.control}
                  name="doctorNoteAttachmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Upload Doctor&apos;s Report
                      </FormLabel>
                      <FormControl>
                        <div>
                          
                          <input
                            id="file-upload"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              const formData = new FormData();
                              formData.append("file", file);

                              try {
                                const res = await api.post(
                                  `api/v1/files/leave/${LEAVE_CONSTANTS.leavetypeID}`,
                                  formData,
                                  {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                    },
                                  }
                                );

                                const fileId = res.data?.id; 
                                field.onChange(fileId); 
                              } catch (error) {
                                console.error("File upload failed:", error);
                              }
                            }}
                          />

                          <Button
                            type="button"
                            variant="outline"
                            className="border-cavista-red text-cavista-red hover:bg-gray-50"
                            onClick={() =>
                              document.getElementById("file-upload")?.click()
                            }
                          >
                            Upload File
                          </Button>

                          
                          {field.value && (
                            <p className="mt-2 text-xs text-green-600">
                              File uploaded successfully: {field.value}
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )} */}

              <DialogFooter>
                <Button className="bg-cavista-red" type="submit">
                  Apply
                </Button>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-cavista-red border-2 text-cavista-red hover:text-cavista-red"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
