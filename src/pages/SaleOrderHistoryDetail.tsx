import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "antd-mobile";
import { useQuery } from "react-query";
import { getSaleOrderHistoryDetail } from "../api/profile";
import Error from "../components/share/Error";
import { formatDateTime } from "../utils/share";
import { useEffect } from "react";

const SaleOrderHistoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch detail
  const {
    data: invoice,
    isLoading,
    isError,
  } = useQuery("orderDetail", () => getSaleOrderHistoryDetail(id || ""));

  const handleBack = () => {
    window.localStorage.removeItem("ordered");
    navigate("/sale-order-history");
  };

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <div className="flex justify-center p-10">Loading...</div>;
  }

  return (
    <div>
      <div className="fixed top-0 w-full">
        <NavBar
          className="bg-white"
          onBack={() => handleBack()}
          right={
            <div
              className="text-primary text-base"
              onClick={() => handleBack()}
            >
              Print
            </div>
          }
        >
          Invoice
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
          <div className="text-center border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Sale Order</h1>
            <p className="text-sm text-gray-500">
              Order No: {invoice?.order_no}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Customer ID:</strong> {invoice?.customer.name || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong> {invoice?.status}
            </p>
            <p className="text-gray-600">
              <strong>Order From:</strong> {invoice?.order_from}
            </p>
            <p className="text-gray-600">
              <strong>Transaction Ref:</strong> {invoice?.trx_ref}
            </p>
            <p className="text-gray-600">
              <strong>Remark:</strong> {invoice?.remark || ""}
            </p>
          </div>

          <div className="border-t border-gray-300 mt-4 pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Order Items
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              {invoice?.order_items.map((item) => (
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
                <span>${invoice?.subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Discount:</span>{" "}
                <span>${invoice?.discount.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax:</span> <span>${invoice?.tax.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-bold text-gray-800">
                <span>Grand Total:</span>{" "}
                <span>${invoice?.grand_total.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-xs text-center mt-4">
            Created At: {formatDateTime(invoice?.created_at || "")}
          </p>
          <p className="text-gray-500 text-xs text-center mt-4">
            {invoice?.pos_app_id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaleOrderHistoryDetail;
