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
