import { userAgent } from "next/server";
import { z } from "zod";

export const LeaveFiltersSchema = z.object({
  requestType: z.enum(["approved", "pending", "rejected", ""]),
  date: z.string().optional(),
});

export const LeaveRequestSchema = z
  .object({
    requestDate: z.string(),
    duration: z
      .number()
      .min(1, { message: "Leave duration must be at least 1 day" }),
    doctorNoteAttachmentId: z.string().nullable().optional(),
  })
  .refine((data) => data.duration <= 2 || !!data.doctorNoteAttachmentId, {
    message: "Doctor’s report is required for leave longer than 2 days",
    path: ["doctorNoteAttachmentId"],
  });

export const UserLoginSchema = z.object({
  email: z.email(),
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
