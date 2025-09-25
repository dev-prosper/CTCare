export type TCookieOpts = {
  expires?: number | Date;
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
  partitioned?: boolean;
  httpOnly?: boolean;
  maxAge?: number;
  priority?: "low" | "medium" | "high";
};

export type LeaveRequestFilters = {
  filters: {
    date?: string;
    requestType?: string;
  };
};

export type LeaveRequestData = {
  requestDate: string;
  duration: number;
  reason: string;
  attachment: string | null;
  status: string;
};

export type LoginDetails = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  status: number;
  errorMessage: string;
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  otpRequired: true;
  delivery: string;
};

export type ResetPasswordResponse = {
  status: number;
  errorMessage: string;
  resetDone: boolean;
};

export type TSuccessResponse<TData> = {
  status_code: number;
  success: true;
  message: string;
  data: TData;
};

export type LeaveRequestsStatsData = {
  status: 100;
  errorMessage: string;
  data: {
    submitted: number;
    returned: number;
    approved: number;
    cancelled: number;
  };
};

export type LeaveBalanceResponse = {
  status: number;
  errorMessage: string;
  year: number;
  leaveTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  entitled: number;
  used: number;
  pending: number;
  available: number;
};
