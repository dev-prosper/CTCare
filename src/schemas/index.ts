import { z } from "zod";

export const LeaveFiltersSchema = z.object({
  requestType: z.enum(["approved", "pending", "rejected", ""]),
  date: z.string().optional(),
});

export const LeaveRequestSchema = z.object({
  requestDate: z.string(),
  reason: z
    .string()
    .min(3, { message: "Reason for leave is important for documentation" }),
  duration: z.number(),
});
