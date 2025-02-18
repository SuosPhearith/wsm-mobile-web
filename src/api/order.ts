import { apiWebOrder } from "../services/share";
import { OrderTotal, OrderWebRequest } from "./cart";
import { PaginatedResponse, SaleOrderWebInterface } from "./type";

export const getProduct = async (
  page: string,
  perPage: string,
  category_id: string,
  keyword: string,
  posApp: string
): Promise<PaginatedResponse<Product>> => {
  const params = new URLSearchParams({
    page,
    perPage,
  });
  if (category_id) {
    params.append("category_id", category_id);
  }
  if (keyword) {
    params.append("search", keyword);
  }
  const response = await apiWebOrder<PaginatedResponse<Product>>(
    "GET",
    `/api/e-menu/${posApp}/products?${params.toString()}`
  );
  return response.data;
};

export const getCategory = async (posApp: string): Promise<Category[]> => {
  const response = await apiWebOrder<Category[]>(
    "GET",
    `/api/e-menu/${posApp}/categories`
  );
  return response.data;
};

export const commitOrder = async (data: SaleOrderWebInterface) => {
  const { posApp, ...payload } = data;

  const response = await apiWebOrder(
    "POST",
    `/api/e-menu/${posApp}/quick-order`,
    payload 
  );
  
  return response.data;
};

export const calculateTotal = async (
  data: OrderWebRequest,

): Promise<OrderTotal> => {
  const response = await apiWebOrder<OrderTotal>(
    "POST",
    `/api/e-menu/${data.posApp}/cart`,
    data
  );
  return response.data;
};

export type FormWebOrder = {
  name: string;
  phone: string;
  address?: string;
  remark: string;
};

export interface UOM {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  thumbnail: string;
  name: string;
  unit_price: number;
  uom_id: number;
  currency: string;
  uom: UOM;
}

export interface Category {
  id: number;
  name: string;
  thumbnail: string;
}

interface UOMOrdered {
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
  uom_id: number;
  unit_price: number;
  uom: UOMOrdered;
}

interface QuickOrderItem {
  id: number;
  quick_order_id: number;
  product_id: number;
  product_detail: ProductDetail;
  qty: number;
  uom: string;
  note: string | null;
  unit_price: number;
  discount: number;
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface QuickOrder {
  id: number;
  subtotal: number;
  grand_total: number;
  wholesale_id: number;
  pos_app_id: string;
  phone_number: string;
  name: string;
  discount: number;
  currency: string;
  status: string;
  remark: string | null;
  updated_at: string;
  created_at: string;
  second_currency: string;
  second_grand_total: number;
  quick_order_items: QuickOrderItem[];
}
