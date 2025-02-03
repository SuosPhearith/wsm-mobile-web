import { api } from "../services/share";

export const calculateTotal = async (
  data: OrderRequest
): Promise<OrderTotal> => {
  const response = await api<OrderTotal>(
    "POST",
    `/api/mini/cart/preview`,
    data
  );
  return response.data;
};

interface OrderItem {
  product_id: number;
  qty: number;
}

export interface OrderRequest {
  items: OrderItem[];
  pos_app_id: string;
  customer_id?: number;
}

interface OrderTotal {
  subtotal: number;
  discount: number;
  grand_total: number;
  currency: string;
  second_grand_total?: number;
  second_currency?: string;
}
