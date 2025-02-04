import { useEffect, useState } from "react";

export const priceValue = (value?: number) => {
  const currency = localStorage.getItem("currency") || "USD"; // Get currency from localStorage or default to USD

  return value?.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
};

export function formatDate(dateString: string) {
  const dateParts = dateString.split("-"); // Split the date string into parts
  if (dateParts.length === 3) {
    // Rearrange the parts to the desired format: DD-MM-YYYY
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // [YYYY, MM, DD]
  }
  return dateString; // If format is not what we expect, return the original
}

export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = String(date.getFullYear()); // Full year (4 digits)

  const H = String(date.getHours()).padStart(2, "0");
  const M = String(date.getMinutes()).padStart(2, "0");
  const S = String(date.getSeconds()).padStart(2, "0");

  return `${dd}-${mm}-${yyyy} ${H}:${M}:${S}`;
};


export const formatDateTimeWithToday = (isoString: string): string => {
  const date = new Date(isoString);
  const today = new Date();

  // Check if the date is today
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const H = String(date.getHours()).padStart(2, "0");
  const M = String(date.getMinutes()).padStart(2, "0");
  const S = String(date.getSeconds()).padStart(2, "0");

  if (isToday) {
    return `Today ${H}:${M}:${S}`;
  } else {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy} ${H}:${M}:${S}`;
  }
};

export const priceValueWithCurrency = (value?: number, currency?: string) => {
  return value?.toLocaleString("en-US", {
    style: "currency",
    currency: currency || "USD",
  });
};

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}