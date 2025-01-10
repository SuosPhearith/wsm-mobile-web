// services/sliderService.ts
import { api } from "../services/share";
import { HomeResT } from "./type";

export const getSlider = async (): Promise<HomeResT> => {
  const response = await api<HomeResT>("GET", "/api/mini/home");
  return response.data;
};
