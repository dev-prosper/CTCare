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
