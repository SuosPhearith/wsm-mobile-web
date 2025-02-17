import { apiWebOrder } from "../services/share";
import { OrderTotal, OrderWebRequest } from "./cart";
import { Category, PaginatedResponse, Product, SaleOrderWebInterface } from "./type";

export const getProduct = async (
  page: string,
  perPage: string,
  category_id: string,
  keyword: string,
): Promise<PaginatedResponse<Product>> => {
  const appId = localStorage.getItem("app");
  const appName = localStorage.getItem("app-name");
  if (!appId || !appName) {
    window.localStorage.clear();
    throw new Error("App not found!");
  }
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
  const response = await apiWebOrder<PaginatedResponse<Product>>(
    "GET",
    `/api/mini/${appId}/product/search?${params.toString()}`
  );
  return response.data;
};

export const getCategory = async (): Promise<Category[]> => {
  const response = await apiWebOrder<Category[]>("GET", "/api/mini/product/categories");
  return response.data;
};

export const commitOrder = async (data: SaleOrderWebInterface) => {
  const response = await apiWebOrder("POST", `/api/mini/order/sale-order`, data);
  return response.data;
};

export const calculateTotal = async (
  data: OrderWebRequest
): Promise<OrderTotal> => {
  const response = await apiWebOrder<OrderTotal>(
    "POST",
    `/api/mini/cart/preview`,
    data
  );
  return response.data;
};

export type FormWebOrder = {
  name: string,
  phone: string,
  address?: string,
  delivery_date: string,
  time_slot: string,
  remark:string
};