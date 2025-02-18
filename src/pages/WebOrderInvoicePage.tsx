import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "antd-mobile";
import { formatDateTime, priceValueWithCurrency } from "../utils/share";
import { QuickOrder } from "../api/order";
import { FaRegSave } from "react-icons/fa";
const baseUrl = import.meta.env.VITE_APP_API_URL;

const WebOrderInvoicePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [invoice] = useState<QuickOrder>(() => {
    try {
      return JSON.parse(window.localStorage.getItem("quickOrdered") || "{}");
    } catch {
      return {};
    }
  });

  const handleBack = () => {
    window.localStorage.removeItem("quickOrdered");
    navigate(`/web/order/${id}/web-order`);
  };

  return (
    <div>
      <div className="fixed top-0 w-full">
        <NavBar
          className="bg-white"
          onBack={() => handleBack()}
          right={
            <div className="flex gap-4 justify-end">
              <a
                className="text-blue-800 pe-2"
                href={`${baseUrl}/api/e-menu/${id}/download/${invoice.id}`}
                download="invoice.png"
              >
                <FaRegSave size={20} />
              </a>
            </div>
          }
        >
          Invoice
        </NavBar>
      </div>

      <div className="h-[50px]"></div>
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Invoice Content */}
        <div
          className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6"
          ref={invoiceRef} // Reference for saving image
        >
          <div className="text-center border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Sale Order</h1>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Customer:</strong> {invoice.name || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Customer ID:</strong> {invoice.phone_number || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong> {invoice.status}
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
              {invoice.quick_order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
                >
                  <div>
                    <p className="text-gray-800 font-medium">
                      {item.product_detail.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {item.qty} x{" "}
                      {priceValueWithCurrency(
                        item.product_detail.unit_price,
                        invoice.currency
                      )}
                    </p>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    {priceValueWithCurrency(item.amount, invoice.currency)}
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
                <span>
                  {priceValueWithCurrency(invoice.subtotal, invoice.currency)}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Discount:</span>{" "}
                <span>
                  {priceValueWithCurrency(invoice.discount, invoice.currency)}
                </span>
              </p>
              <p className="flex justify-between font-bold text-gray-800">
                <span>Grand Total:</span>{" "}
                <span>
                  {priceValueWithCurrency(
                    invoice.grand_total,
                    invoice.currency
                  )}
                </span>
              </p>
              {invoice.second_grand_total && (
                <p className="flex justify-between text-gray-800">
                  <span>Grand Total ({invoice.second_currency}):</span>{" "}
                  <span>
                    {priceValueWithCurrency(
                      invoice.second_grand_total,
                      invoice.second_currency
                    )}
                  </span>
                </p>
              )}
            </div>
          </div>

          <p className="text-gray-500 text-xs text-center mt-4">
            Created At: {formatDateTime(invoice?.created_at || "")}
          </p>
          <p className="text-gray-500 text-xs text-center mt-4">
            POS ID: {invoice.pos_app_id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebOrderInvoicePage;
