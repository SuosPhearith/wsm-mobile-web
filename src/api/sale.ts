import { api } from "../services/share";
import {
  Category,
  CreateCustomerInterface,
  Customer,
  PaginatedResponse,
  Product,
} from "./type";

export const getCategory = async (): Promise<Category[]> => {
  const response = await api<Category[]>("GET", "/api/mini/product/categories");
  return response.data;
};

export const getProduct = async (
  page: string,
  perPage: string,
  category_id: string,
  keyword: string
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

export const getCustomer = async (
  page: string,
  perPage: string,
  keyword: string
): Promise<PaginatedResponse<Customer>> => {
  const params = new URLSearchParams({
    page,
    perPage,
  });
  if (keyword) {
    params.append("keyword", keyword);
  }
  const response = await api<PaginatedResponse<Customer>>(
    "GET",
    `/api/mini/customer?${params.toString()}`
  );
  return response.data;
};

export const createCustomer = async (
  data: CreateCustomerInterface
): Promise<Customer> => {
  const response = await api<Customer>(
    "POST",
    `/api/mini/customer`,
    data
  );
  return response.data;
};
