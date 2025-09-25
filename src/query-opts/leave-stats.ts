import { queryOptions } from "@tanstack/react-query";
import { LeaveRequestsStatsResponseData } from "@/types";
import api from "@/services/axios-instance";

const getLeaveStats = async (): Promise<LeaveRequestsStatsResponseData> => {
  const res = await api.get("/api/v1/leave/requests/my/counts");
  console.log(res.data.data);
  return res.data.data;
};

export default function getLeaveRequestsStats() {
  return queryOptions({
    queryKey: ["leaveStats"],
    queryFn: getLeaveStats,
  });
}
