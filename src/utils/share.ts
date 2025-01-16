export const priceValue = (value?: number) => {
  return value?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
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
