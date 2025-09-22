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

export const UserLoginSchema = z.object({
  email: z.email(),
  // .regex(/^[A-Za-z0-9._%+-]+@axxess\.com$/, {
  //   message: "Invalid email format",
  // }),
  password: z
    .string()
    .min(12, { message: "Password must be atleast 12 characters" }),
});

export const PasswordResetSchema = z.object({
  email: z.email(),
  // .regex(/^[A-Za-z0-9._%+-]+@axxess\.com$/, {
  //   message: "Invalid email format",
  // }),
});
