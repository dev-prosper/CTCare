import { userAgent } from "next/server";
import { z } from "zod";

export const LeaveFiltersSchema = z.object({
  requestType: z.enum(["approved", "pending", "rejected", ""]),
  date: z.string().optional(),
});

export const LeaveRequestSchema = z
  .object({
    requestDate: z.string(),
    reason: z
      .string()
      .min(3, { message: "Reason for leave is important for documentation" }),
    duration: z
      .number()
      .min(1, { message: "Leave duration must be at least 1 day" }),
    doctorReport: z
      .any()
      .refine((file) => file instanceof File || file === undefined, {
        message: "Invalid file type",
      })
      .optional(),
  })
  .refine((data) => data.duration <= 2 || data.doctorReport instanceof File, {
    message: "Doctor’s report is required for leave longer than 2 days",
    path: ["doctorReport"],
  });

export const UserLoginSchema = z.object({
  email: z.email(),
  // .regex(/^[A-Za-z0-9._%+-]+@axxess\.com$/, {
  //   message: "Invalid email format",
  // }),
  password: z
    .string()
    .min(12, { message: "Password must be atleast 12 characters" }),
  useOtp: z.boolean(),
  ip: z.string(),
  userAgent: z.string(),
});

export const PasswordResetSchema = z.object({
  email: z.email(),
  // .regex(/^[A-Za-z0-9._%+-]+@axxess\.com$/, {
  //   message: "Invalid email format",
  // }),
});
