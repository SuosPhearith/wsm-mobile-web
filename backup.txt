import { NavBar } from "antd-mobile";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SaleInvoiceHistory = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="fixed top-0 w-full">
        <NavBar className="bg-white" onBack={() => navigate(-1)}>
          Sale Invoice History
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="p-4">
        <div className="bg-white p-2 flex items-center justify-between rounded-lg gap-3">
          <div className="flex items-center gap-3">
            <div>
              <FaFileInvoiceDollar size={30} className="text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold">SE-000006</span>
                <span className="font-light"> (3 items) </span>
              </div>
              <div>
                <span className="font-semibold">Default Customer</span>{" "}
              </div>
            </div>
          </div>
          <div className="flex justify-end flex-col items-end">
            <div className="font-bold">120$</div>
            <div>12-12-2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleInvoiceHistory;
