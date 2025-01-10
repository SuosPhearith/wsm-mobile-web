export interface SlideInterface {
  id: number;
  image: string;
}

export interface CategoryInterface {
  id: number;
  name: string;
  image: string;
}

export interface PopularItemInterface {
  id: number;
  name: string;
  image: string;
  description: string;
  rate: number;
}

export interface TodoInterface {
  id: number;
  name: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed" | "Scheduled";
  type: "Delivery" | "Drop" | "Sale";
  latitude: number;
  longitude: number;
  assigned_by: string;
  time_slot: string;
}

export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CustomerInterface {
  id?: string;
  name: string;
  phone: string;
  location: string;
  image: string;
}

export interface LocationInterface {
  lat: number;
  lng: number;
}


export interface dateInterface{
  date : string
}

export interface TimeSlotInterface {
  time : string
}

