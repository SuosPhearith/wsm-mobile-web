import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "./NoteFoundPage";
import { NavBar } from "antd-mobile";

interface SaleInvoiceItem {
  id: number;
  order_no: string;
  product_id: number;
  pos_app_id: string;
  product_detail: {
    id: number;
    name: string;
    name_kh: string;
    thumbnail: string;
    unit_price: number;
    uom_id: number;
    uom: {
      id: number;
      name: string;
      name_kh: string;
      description: string | null;
      description_kh: string | null;
      wholesale_id: number | null;
      created_at: string; // ISO 8601 format
      updated_at: string; // ISO 8601 format
    };
  };
  qty: number;
  uom: string;
  note: string;
  subtotal: number;
  grand_total: number;
}

const SaleInvoiceSuccessPage = () => {
  const navigate = useNavigate();
  const [invoice] = useState(
    JSON.parse(window.localStorage.getItem("ordered") || "{}")
  );
  const handleBack = () => {
    window.localStorage.removeItem("ordered");
    navigate("/sale");
  };
  if (!invoice.order_no) {
    return <NotFoundPage />;
  }
  return (
    <div>
      <div className="fixed top-0 w-full">
        <NavBar
          className="bg-white"
          onBack={() => handleBack()}
          right={<div className="text-primary text-base" onClick={() => handleBack()}>Print</div>}
        >
          Invoice
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
          <div className="text-center border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Sale Invoice</h1>
            <p className="text-sm text-gray-500">
              Order No: {invoice.order_no}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Customer ID:</strong> {invoice.customer_id || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong> {invoice.status}
            </p>
            <p className="text-gray-600">
              <strong>Order From:</strong> {invoice.order_from}
            </p>
            <p className="text-gray-600">
              <strong>Transaction Ref:</strong> {invoice.trx_ref}
            </p>
            <p className="text-gray-600">
              <strong>Remark:</strong> {invoice.remark || ""}
            </p>
          </div>

          <div className="border-t border-gray-300 mt-4 pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Order Items
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              {invoice.order_items.map((item: SaleInvoiceItem) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
                >
                  <div>
                    <p className="text-gray-800 font-medium">
                      {item.product_detail.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {item.qty} x ${item.product_detail.unit_price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    ${item.grand_total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-300 mt-4 pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Summary
            </h2>
            <div className="text-gray-600 space-y-2">
              <p className="flex justify-between">
                <span>Subtotal:</span>{" "}
                <span>${invoice.subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Discount:</span>{" "}
                <span>${invoice.discount.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax:</span> <span>${invoice.tax.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-bold text-gray-800">
                <span>Grand Total:</span>{" "}
                <span>${invoice.grand_total.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-xs text-center mt-4">
            Created At: {new Date(invoice.created_at).toLocaleString()} |
            Updated At: {new Date(invoice.updated_at).toLocaleString()}
          </p>
          <p className="text-gray-500 text-xs text-center mt-4">
            {invoice.pos_app_id}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default SaleInvoiceSuccessPage;
