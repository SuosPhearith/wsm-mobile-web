import { api } from "../services/share";

export const loginReq = async (data: { email: string; password: string }) => {
  const response = await api<string>("POST", "/api/mini/login", {
    ...data,
  });
  return response.data;
};

export const meReq = async ():Promise<object> => {
  const response = await api<object>("GET", "/api/mini/profile");
  return response.data;
};
