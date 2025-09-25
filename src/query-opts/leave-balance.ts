import { queryOptions } from "@tanstack/react-query";
import api from "@/services/axios-instance";
import { LeaveBalanceResponse } from "@/types";

export default function getLeaveBalance() {
  return queryOptions({
    queryKey: ["leave-balance"],
    queryFn: getYearlyLeaveBalance,
  });
}

const getYearlyLeaveBalance = async (): Promise<LeaveBalanceResponse> => {
  const res = await api.get("/api/v1/leave/balance/my");
  return res.data;
};
