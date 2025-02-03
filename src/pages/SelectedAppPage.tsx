import { Dialog } from "antd-mobile";
import { useEffect, useState } from "react";
import { FaStore, FaTruck } from "react-icons/fa";
import { FiDollarSign, FiMapPin, FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Define TypeScript types
export interface Warehouse {
  id: number;
  name: string;
  unit_type: string;
  wholesale_id: number;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PosApp {
  id: string;
  name: string;
  type: string;
  main_currency: string;
  secondary_currency: string;
  warehouse_id: number;
  wholesale_id: number;
  created_at: string;
  updated_at: string;
  warehouse?: Warehouse;
}

const SelectedAppPage = () => {
  const [posApps, setPosApps] = useState<PosApp[]>([]);
  const [selectedApp, setSelectedApp] = useState<{
    id: string;
    name: string;
    currency: string;
    warehouse?: string;
  } | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setPosApps(parsedData.pos_apps || []);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  // Set only one selection at a time
  const handleSelection = (id: string, name: string, currency: string, warehouse: string) => {
    setSelectedApp(selectedApp?.id === id ? null : { id, name, currency, warehouse });
  };

  const navigate = useNavigate();

  // Handle Confirm Click
  const handleConfirm = () => {
    if (selectedApp) {
      // get currency from local storage
      const currency = localStorage.getItem("currency") || "";
      if (selectedApp.currency !== currency) {
        Dialog.confirm({
          title: "Switch Confirmation",
          content: `It will remove current cart and hold data?`,
          confirmText: "Switch",
          cancelText: "Cancel",
          onConfirm: () => {
            window.localStorage.removeItem("cart");
            window.localStorage.removeItem("hold");
            window.localStorage.setItem("app", selectedApp.id);
            window.localStorage.setItem("app-name", selectedApp.name);
            window.localStorage.setItem("currency", selectedApp.currency);
            window.localStorage.setItem("warehouse", selectedApp.warehouse || "");
            navigate("/sale");
          },
        });
      } else {
        window.localStorage.removeItem("hold");
        window.localStorage.setItem("app", selectedApp.id);
        window.localStorage.setItem("app-name", selectedApp.name);
        window.localStorage.setItem("currency", selectedApp.currency);
        window.localStorage.setItem("warehouse", selectedApp.warehouse || "");
        navigate("/sale");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-center p-5 text-gray-800">
        POS Applications
      </h1>

      {/* Scrollable Grid Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posApps.map((app) => (
            <div
              key={app.id}
              onClick={() =>
                handleSelection(app.id, app.name, app.main_currency, app.warehouse?.name || "")
              }
              className={`p-6 border rounded-lg transition flex flex-col cursor-pointer ${
                selectedApp?.id === app.id
                  ? "bg-blue-100 border-blue-500 shadow-lg"
                  : "bg-white border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                {app.warehouse?.unit_type === "Truck" ? (
                  <FaTruck className="text-blue-500 text-2xl" />
                ) : (
                  <FaStore className="text-blue-500 text-2xl" />
                )}
                <h2 className="font-semibold text-lg text-gray-800">
                  {app.name}
                </h2>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FiTag className="text-green-500" />
                <p className="text-sm">Type: {app.type}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-1">
                <FiDollarSign className="text-yellow-500" />
                <p className="text-sm">
                  Currency: {app.main_currency} / {app.secondary_currency}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-1">
                <FiMapPin className="text-red-500" />
                <p className="text-sm">
                  Warehouse: {app.warehouse?.name || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Confirm Button */}
      <div className="bg-white shadow-md sticky bottom-0 w-full">
        <div className="bottom-0 px-4 w-full mb-3">
          <button
            disabled={!selectedApp} // Disable if no selection
            className={`p-3 w-full rounded-2xl text-lg font-bold transition ${
              selectedApp
                ? "bg-primary text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedAppPage;
