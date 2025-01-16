import { useState, useEffect } from "react";
import {
  Dialog,
  Divider,
  Modal,
  NavBar,
  TextArea,
  Toast,
} from "antd-mobile";
import {
  CloseCircleOutline,
  EditFill,
  FileOutline,
  UserContactOutline,
} from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { priceValue } from "../utils/share";
import { Customer, Product, SaleInvoiceInterface } from "../api/type";
import defaultAvatar from "../assets/imgaes/profile2.jpg";
import { useMutation } from "react-query";
import { createSaleInvoice } from "../api/sale";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const SaleInvoicePage = () => {
  // Load cart items with quantities from localStorage
  const [cartItems, setCartItems] = useState<
    { product: Product; qty: number }[]
  >([]);
  const [note, setNote] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);

    // Retrieve the selected customer from localStorage with a fallback
    const customerData = window.localStorage.getItem("selectedCustomer");
    if (customerData) {
      const customer: Customer = JSON.parse(customerData);
      setSelectedCustomer(customer);
    } else {
      setSelectedCustomer(null);
    }
  }, []);

  // Filter products from the mock data to display in the cart
  const displayedCartItems: { product: Product; qty: number }[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  // Calculate total price
  const totalPrice = displayedCartItems.reduce((total, product) => {
    const itemInCart = cartItems.find(
      (item) => item.product.id === product.product.id
    );
    return total + product.product.unit_price * (itemInCart?.qty || 1);
  }, 0);

  // Clear selected customer
  const clearSelectedCustomer = () => {
    setSelectedCustomer(null);
    window.localStorage.removeItem("selectedCustomer");
  };

  // make order
  const { mutate: mOrder, isLoading: lOrder } = useMutation({
    mutationFn: createSaleInvoice,
    onSuccess: () => {
      window.localStorage.removeItem("selectedCustomer");
      window.localStorage.removeItem("cart");
      navigate("/sale");
      Toast.show({
        content: (
          <>
            <div className="flex justify-center items-start gap-2 text-green-500">
              <FaCheckCircle size={22} />
              Order Successfully
            </div>
          </>
        ),
        duration: 2000,
      });
    },
    onError: (error) => {
      Dialog.alert({
        content: (
          <>
            <div className="text-red-500 flex items-center gap-1">
              <MdError size={24} /> Something weng wrong.
            </div>
          </>
        ),
        confirmText: "Close",
      });
      console.log(error);
    },
  });

  const handleSaleInvoice = () => {
    // Retrieve selected customer and cart from localStorage
    const selectedCustomer = window.localStorage.getItem("selectedCustomer");
    const cart = window.localStorage.getItem("cart");

    // Validate if selectedCustomer and cart are present
    if (!selectedCustomer || !cart || JSON.parse(cart).length === 0) {
      Modal.alert({
        title: "Error",
        content: "Please select a customer.",
        confirmText: "OK",
      });
      return;
    }

    // Show confirmation modal
    Modal.alert({
      title: "Confirm Order",
      content: "Are you sure to make this order?",
      showCloseButton: true,
      confirmText: "Yes, Confirm",
      onConfirm: () => {
        const cartData: { product: Product; qty: number }[] = JSON.parse(cart);
        const customer: Customer = JSON.parse(selectedCustomer);
        const orderData: SaleInvoiceInterface = {
          items: cartData.map((item) => ({
            product_id: item.product.id,
            qty: item.qty,
            note: "Nothing",
          })),
          customer_id: customer.id,
          remark: note,
        };
        mOrder(orderData);
      },
    });
  };

  return (
    <div className="">
      <div className="fixed top-0 w-full ">
        <NavBar className="bg-white" onBack={() => navigate(-1)}>
          Sale Invoice
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="p-4">
        <div>
          <div className="flex items-center">
            <UserContactOutline fontSize={20} />
            <div className="text-lg ms-1 font-semibold">Customer</div>
          </div>
          {!selectedCustomer ? (
            <div
              onClick={() => navigate("/customer")}
              className="flex items-center w-full bg-white mt-2 justify-between p-3 rounded-lg"
            >
              <div className="text-base">Select Customer</div>
              <div>
                <EditFill fontSize={18} />
              </div>
            </div>
          ) : (
            <div className="flex p-2 justify-between items-center bg-white mt-2 rounded-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-slate-300 flex justify-center items-center">
                  <img
                    src={selectedCustomer?.avatar || defaultAvatar}
                    alt="image"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-center ms-2">
                  <div className="flex">
                    <div className="font-semibold">
                      {selectedCustomer?.name}
                    </div>
                  </div>
                  <div className="text-primary">
                    {selectedCustomer.phone_number}
                  </div>
                </div>
              </div>
              <div>
                <CloseCircleOutline
                  onClick={() => clearSelectedCustomer()}
                  className="text-red-500"
                  fontSize={24}
                />
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg mt-2 p-3">
            <TextArea
              value={note}
              onChange={(v) => setNote(v)}
              placeholder="Enter note"
              showCount
              maxLength={100}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center mt-5">
            <FileOutline fontSize={20} />
            <div className="text-lg ms-1 font-semibold">Summary</div>
          </div>
          <div className="bg-white rounded-lg mt-2 p-3">
            {displayedCartItems.length === 0 ? (
              <div className="text-center text-gray-500">
                Your cart is empty 😢
              </div>
            ) : (
              displayedCartItems.map((product) => {
                const itemInCart = cartItems.find(
                  (item) => item.product.id === product.product.id
                );
                return (
                  <div className="bg-white flex justify-between rounded-lg my-1" key={product.product.id}>
                    <div>
                      <span className="text-blue-600">{itemInCart?.qty} x</span>{" "}
                      <span className="font-semibold">
                        {product.product.name}
                      </span>{" "}
                      <span className="text-black ms-2">
                        {priceValue(product.product.unit_price)}
                      </span>
                    </div>
                    <div className="text-blue-600">
                      {priceValue(
                        product.product.unit_price * (itemInCart?.qty ?? 0)
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full p-4">
        <Divider />
        {/* Total Price Section */}
        <div className="flex mt-4 p-4 pt-0 rounded-xl justify-between items-center">
          <div className="text-lg font-semibold">Total:</div>
          <div className="text-lg font-bold">{priceValue(totalPrice)}</div>
        </div>
        <div className="w-full flex gap-4">
          <button
            onClick={handleSaleInvoice}
            className="bg-primary p-3 w-full rounded-xl text-lg font-bold text-white"
          >
            {lOrder ? "..." : "Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleInvoicePage;
