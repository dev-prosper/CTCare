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
      reason: "",
      duration: 0,
    },
  });

  const submitRequest = () => {};

  return (
    <Dialog>
      <DialogTrigger>
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
              onSubmit={form.handleSubmit(submitRequest)}
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

              <FormField
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
              />

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
                        className="focus-visible:border-cavista-red focus-visible:border-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button className="bg-cavista-red">Apply</Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-cavista-red border-2 text-cavista-red hover:text-cavista-red"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
