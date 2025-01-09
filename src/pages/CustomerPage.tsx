import { useState, useEffect } from "react";
import { NavBar } from "antd-mobile";
import { CloseCircleOutline, SearchOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { customers } from "../mock/data";
import { CustomerInterface } from "../mock/type";

const CustomerPage = () => {
  const navigate = useNavigate();

  // State for search input and filtered customers
  const [searchInput, setSearchInput] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Debounce search logic
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = customers.filter((customer) =>
        customer.phone.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Set selected customer and navigate back to SaleInvoicePage
  const setCustomer = (customer: CustomerInterface) => {
    window.localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      <div className="fixed top-0 w-full">
        <NavBar className="bg-white" onBack={() => navigate(-1)}>
          Select Customer
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="p-4 pt-1">
        {/* Search Input */}
        <div className="flex bg-white p-2 rounded-lg items-center">
          <div className="w-[10%]">
            <SearchOutline fontSize={22} />
          </div>
          <input
            className="text-base w-[83%] border-none outline-none focus:ring-0 focus:outline-none"
            type="text"
            placeholder="Search by phone..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <div
              onClick={() => setSearchInput("")}
              className="text-red-500 w-[7%] flex justify-end"
            >
              <CloseCircleOutline fontSize={20} />
            </div>
          )}
        </div>

        {/* Customer List */}
        <div>
          {filteredCustomers.length === 0 ? (
            <div className="text-center text-gray-500 mt-4">
              No customers found
            </div>
          ) : (
            filteredCustomers.map((item) => (
              <div
                key={item.id}
                className="flex p-2 justify-between items-center bg-white mt-2 rounded-xl"
                onClick={() => setCustomer(item)}
              >
                <div className="flex items-center ">
                  <div className="w-12 h-12 rounded-full bg-slate-300 flex justify-center items-center">
                    <img
                      src={item.image}
                      alt="image"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center ms-2">
                    <div className="flex">
                      <div className="font-semibold">{item.name}</div>
                      <div className="ms-2">{item.phone}</div>
                    </div>
                    <div className="text-primary">{item.location}</div>
                  </div>
                </div>
                <div >
                  {/* <MdOutlineSelectAll size={24} /> */}
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
