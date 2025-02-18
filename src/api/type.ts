export interface Slider {
  route: string | null;
  image: string;
}

export interface HomeResT {
  sliders: Slider[];
}

export interface Category {
  id: number;
  name: string;
  thumbnail: string | null;
  wholesale_id: number;
  created_at: string;
  updated_at: string;
}

// export interface Product {
//   id: number;
//   product_no: string;
//   name: string;
//   name_kh: string;
//   category_id: number;
//   thumbnail: string | null;
//   min_qty: number;
//   qty: number;
//   max_qty: number | null;
//   increment_qty: number;
//   fraction_qty: number;
//   uom_id: number;
//   unit_price: number;
//   photo: string[]; // Assuming photo is an array of strings (URLs)
//   description: string | null;
//   description_kh: string | null;
//   on_sale: boolean;
//   wholesale_id: number;
//   created_at: string;
//   updated_at: string;
//   deleted_at: string | null;
//   sale_price: number;
// }
// Unit of Measurement (UOM)
interface UOM {
  id: number;
  name: string;
  description?: string | null;
}

// Inventory Structure
interface Inventory {
  warehouse_id: number;
  product_id: number;
  quantity: number;
  stock_alert: number;
}

// Product Interface
export interface Product {
  id: number;
  thumbnail: string;
  uom_id: number;
  qty: number;
  min_qty: number;
  max_qty?: number | null;
  currency: string;
  unit_price: number;
  name: string;
  uom: UOM;
  inventories: Inventory[];
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: string;
  prev_page_url: string | null;
  to: number;
}

export interface Customer {
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

export interface CreatedCustomerInterface {
  id: number;
  name: string;
  phone_number: string;
  wholesale_id: number;
  created_at: string;
  updated_at: string;
}
export interface CreateCustomerInterface {
  name: string;
  phone: string;
}

export interface TimeSlotInterface {
  id: number;
  slot: string;
  close_hour: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingDateInterface {
  date: string;
  time_slot: TimeSlotInterface[];
}

export interface SaleOrderItem {
  product_id: number;
  qty: number;
  note?: string;
}

export interface SaleOrderInterface {
  items: SaleOrderItem[];
  customer_id: number;
  delivery_date: string;
  time_slot: string;
  lat: number;
  lng: number;
  address_id : number;
  remark?: string;
  pos_app_id: string;
}
export interface SaleOrderWebInterface {
  items: SaleOrderItem[];
  phone_number: string;
  name: string;
  address : string;
  remark?: string;
  posApp: string;
}
export interface SaleInvoiceInterface {
  items: SaleOrderItem[];
  customer_id: number;
  remark?: string;
  pos_app_id?: string;
}

export interface Address {
  id?: number;
  lat: number;
  lng: number;
  label: "Warehouse" | "Retail Store" | "Other";
  address_name: string;
  customer_id: number;
  note?: string;
}

export interface CustomerHistory {
  id: number;
  name: string;
}

export interface SaleInvoiceHistory {
  order_no: string;
  user_id: number;
  customer_id: number;
  subtotal: number;
  discount: number;
  delivery_fee: number;
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
  order_items_count: number;
  customer: Customer;
}

// Mission Interface
interface Mission {
  id: number;
  title: string;
  title_kh: string | null;
  description: string | null;
  description_kh: string | null;
  mission_date: string; // ISO date string
  mission_start: string | null;
  mission_end: string | null;
  user_id: number;
  ref_class: string;
  ref_id: string;
  type: string;
  status: string;
  closed_date: string | null;
  wholesale_id: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

// Main Response Interface
export interface MissionsResponse {
  active_missions: Mission[];
  processing_missions: Mission[];
  completed_mission: Mission[];
}
