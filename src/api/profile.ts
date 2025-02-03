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
export const getSaleOrderHistory = async (
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
    `/api/mini/sale-order/history?${params.toString()}`
  );
  return response.data;
};

export const getSaleInvoiceHistoryDetail = async (orderNo : string) => {
  const response = await api<Order>(
    "GET",
    `/api/mini/sale-invoice/${orderNo}/detail`
  );
  return response.data;
}

export const getSaleOrderHistoryDetail = async (orderNo : string) => {
  const response = await api<Order>(
    "GET",
    `/api/mini/sale-order/${orderNo}/detail`
  );
  return response.data;
}

interface UOM {
  id: number;
  name: string;
  name_kh: string;
  description: string | null;
  description_kh: string | null;
  wholesale_id: number | null;
  created_at: string;
  updated_at: string;
}

interface ProductDetail {
  id: number;
  name: string;
  name_kh: string;
  thumbnail: string;
  unit_price: number;
  uom_id: number;
  uom: UOM;
}

interface OrderItem {
  id: number;
  order_no: string;
  product_id: number;
  product_detail: ProductDetail;
  qty: number;
  uom: string;
  note: string;
  subtotal: number;
  grand_total: number;
}

interface Customer {
  id: number;
  phone_number: string;
  avatar: string | null;
  name: string;
  gender: string | null;
  birthday: string | null;
  email: string | null;
  nationality: string | null;
  wholesale_id: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  order_no: string;
  user_id: number;
  customer_id: number;
  subtotal: number;
  discount: number;
  tax: number;
  grand_total: number;
  currency: string;
  second_grand_total: number;
  second_currency: string;
  type: string;
  trx_ref: string;
  order_from: string;
  status: string;
  wholesale_id: number;
  customer_address_id: number | null;
  remark: string | null;
  pos_app_id: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  order_items: OrderItem[];
  customer: Customer;
}
