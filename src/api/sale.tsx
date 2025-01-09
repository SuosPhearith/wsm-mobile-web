import { api } from "../services/share";
import { Category, PaginatedResponse, Product } from "./type";

export const getCategory = async (): Promise<Category[]> => {
  const response = await api<Category[]>("GET", "/api/mini/product/categories");
  return response.data;
};

export const getProduct = async (
  page: string,
  perPage: string,
  category_id: string,
  keyword: string,
): Promise<PaginatedResponse<Product>> => {
  const params = new URLSearchParams({
    page,
    perPage,
  });
  if (category_id) {
    params.append("category_id", category_id);
  }
  if (keyword) {
    params.append("keyword", keyword);
  }
  const response = await api<PaginatedResponse<Product>>(
    "GET",
    `/api/mini/product/search?${params.toString()}`
  );
  return response.data;
};
