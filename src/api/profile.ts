import { api } from "../services/share";
import { PaginatedResponse, SaleInvoiceHistory } from "./type";

export const getSaleInvoiceHistory = async (
  page: string,
  perPage: string,
  keyword: string
): Promise<PaginatedResponse<SaleInvoiceHistory>> => {
  const params = new URLSearchParams({
    page,
    perPage,
  });
  if (keyword) {
    params.append("keyword", keyword);
  }
  const response = await api<PaginatedResponse<SaleInvoiceHistory>>(
    "GET",
    `/api/mini/sale-invoice/history?${params.toString()}`
  );
  return response.data;
};