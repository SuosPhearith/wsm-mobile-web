import { api } from "../services/share";
import { MissionsResponse } from "./type";

export const getMission = async (): Promise<MissionsResponse> => {
  const response = await api<MissionsResponse>(
    "GET",
    "/api/mini/home/mission?date=2025-02-14"
  );
  return response.data;
};
