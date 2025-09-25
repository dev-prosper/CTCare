import { queryOptions } from "@tanstack/react-query";
import { LeaveRequestsStatsData } from "@/types";
import api from "@/services/axios-instance";

const getLeaveStats = async (): Promise<LeaveRequestsStatsData> => {
  const res = await api.get("/api/v1/leave/");
  return res.data.data;
};

export default function getLeaveRequestsStats() {
  return queryOptions({
    queryKey: ["leaveStats"],
    queryFn: getLeaveStats,
  });
}
