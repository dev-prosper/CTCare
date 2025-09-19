import { z } from "zod";

export const LeaveFiltersSchema = z.object({
  requestType: z.enum(["approved", "pending", "rejected", ""]),
  date: z.string().optional(),
});
