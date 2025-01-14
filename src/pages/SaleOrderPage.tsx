import { useState, useEffect } from "react";
import {
  Dialog,
  Divider,
  Modal,
  NavBar,
  Popup,
  SwipeAction,
  TextArea,
} from "antd-mobile";
import {
  CloseCircleOutline,
  EditFill,
  FileOutline,
  UserContactOutline,
} from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { priceValue } from "../utils/share";
import CustomerLocationPopup from "../components/sale/CustomerLocationPopup";
import {
  Address,
  BookingDateInterface,
  Customer,
  Product,
  SaleOrderInterface,
  TimeSlotInterface,
} from "../api/type";
import defaultAvatar from "../assets/imgaes/profile2.jpg";
import { useMutation, useQuery } from "react-query";
import {
  createSaleOrder,
  deleteCustomerAddress,
  getCustomerAddress,
  getDeliveryDateRange,
} from "../api/sale";
import Error from "../components/share/Error";

const SaleOrderPage = () => {
  // Load cart items with quantities from localStorage
  const [cartItems, setCartItems] = useState<
    { product: Product; qty: number }[]
  >([]);
  const [note, setNote] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [visible2, setVisible2] = useState<boolean>(false);
  const [visible3, setVisible3] = useState<boolean>(false);
  const [visible4, setVisible4] = useState<boolean>(false);
  const [location, setLocation] = useState<Address>();
  const [selectedDate, setSelectedDate] =
    useState<BookingDateInterface | null>();
  const [selectedTimeSlot, setSelectedTimeSlot] =
    useState<TimeSlotInterface | null>();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const navigate = useNavigate();

  // get getDeliveryDateRange
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dateRanges"],
    queryFn: getDeliveryDateRange,
  });
  // Get Customer Address (only fetch if selectedCustomer is set)
  const {
    data: dAddress,
    isLoading: lAddress,
    isError: eAddress,
    refetch,
  } = useQuery({
    queryKey: ["addresses", selectedCustomer?.id], // Include customer ID in query key
    queryFn: () => getCustomerAddress(selectedCustomer?.id || 0),
    enabled: !!selectedCustomer?.id, // Only run when selectedCustomer has a valid ID
  });

  // make order
  const { mutate: mOrder, isLoading: lOrder } = useMutation({
    mutationFn: createSaleOrder,
    onSuccess: () => {
      window.localStorage.removeItem("selectedCustomer");
      window.localStorage.removeItem("cart");
      navigate("/sale");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  // remove address
  const { mutate: mDeleteAddress, isLoading: lDeleteAddress } = useMutation({
    mutationFn: (id: number) => deleteCustomerAddress(id),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSaleOrder = () => {
    // Retrieve selected customer and cart from localStorage
    const selectedCustomer = window.localStorage.getItem("selectedCustomer");
    const cart = window.localStorage.getItem("cart");

    // Validate if selectedCustomer and cart are present
    if (
      !selectedCustomer ||
      !cart ||
      JSON.parse(cart).length === 0 ||
      !selectedTimeSlot ||
      !selectedDate ||
      !location
    ) {
      Modal.alert({
        title: "Field Require.",
        content: "Please select a require fields.",
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
        const orderData: SaleOrderInterface = {
          items: cartData.map((item) => ({
            product_id: item.product.id,
            qty: item.qty,
            note: "Nothing",
          })),
          customer_id: customer.id,
          delivery_date: selectedDate.date,
          time_slot: selectedTimeSlot.slot,
          lat: location.lat,
          lng: location.lng,
          address_id: location.id || 0,
          remark: note,
        };
        mOrder(orderData);
      },
    });
  };

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

  // Clear seleted location
  const clearSelectedLocation = () => {
    setLocation(undefined);
  };

  // Handle select data
  const handleSetDate = (item: BookingDateInterface) => {
    setSelectedDate(item);
    setVisible2(false);
  };
  // Handle select time slot
  const handleSetTime = (item: TimeSlotInterface) => {
    setSelectedTimeSlot(item);
    setVisible3(false);
  };

  if (isLoading) {
    return <div></div>;
  }
  if (isError || eAddress) {
    return <Error />;
  }

  const handleOpenLocation = () => {
    if (!localStorage.getItem("selectedCustomer")) {
      Modal.alert({
        title: "Field Require.",
        content: "Please select a customer first.",
        confirmText: "OK",
      });
      return;
    }
    if (dAddress?.length === 0) {
      setVisible(true);
    } else {
      setVisible4(true);
    }
  };

  const handleCreateNewAddress = () => {
    setVisible4(false);
    setVisible(true);
  };

  const handleSetAddress = (item: Address) => {
    setLocation(item);
    setVisible4(false);
  };
  return (
    <div className="">
      <div className="fixed top-0 w-full ">
        <NavBar className="bg-white" onBack={() => navigate(-1)}>
          Sale Order
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
          {!location ? (
            <div
              onClick={handleOpenLocation}
              className="flex items-center w-full bg-white mt-2 justify-between p-3 rounded-lg"
            >
              <div className="text-base">Select Location</div>
              <div>
                <EditFill fontSize={18} />
              </div>
            </div>
          ) : (
            <div className="flex items-center w-full bg-white mt-2 justify-between p-3 rounded-lg">
              <div className="flex items-center w-full">
                <div className="">
                  <div className="flex flex-col space-y-2">
                    <div className="text-base font-semibold text-gray-900">
                      Label:{" "}
                      <span className="font-medium text-blue-600">
                        {location.label}
                      </span>
                    </div>

                    {location.note && (
                      <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
                        📝 <strong>Note:</strong> {location.note}
                      </div>
                    )}

                    <div className="text-sm text-gray-600">
                      📍 <strong>Address:</strong> {location.address_name}
                    </div>

                    <div className="text-sm text-gray-500">
                      🌐 <strong>Coordinates:</strong> lat: {location.lat}, lng:{" "}
                      {location.lng}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <CloseCircleOutline
                  onClick={() => clearSelectedLocation()}
                  className="text-red-500"
                  fontSize={24}
                />
              </div>
            </div>
          )}

          {!selectedDate ? (
            <div
              onClick={() => setVisible2(true)}
              className="flex items-center w-full bg-white mt-2 justify-between p-3 rounded-lg"
            >
              <div className="text-base">Select Date</div>
              <div>
                <EditFill fontSize={18} />
              </div>
            </div>
          ) : (
            <div className="flex items-center w-full bg-white mt-2 justify-between p-3 rounded-lg">
              <div className="text-base">{selectedDate.date}</div>
              <div>
                <CloseCircleOutline
                  onClick={() => setSelectedDate(null)}
                  className="text-red-500"
                  fontSize={24}
                />
              </div>
            </div>
          )}
          {!selectedTimeSlot ? (
            <div
              onClick={() => setVisible3(true)}
              className="flex items-center w-full bg-white mt-2 justify-between p-3 rounded-lg"
            >
              <div className="text-base">Select Time Slot</div>
              <div>
                <EditFill fontSize={18} />
              </div>
            </div>
          ) : (
            <div className="flex items-center w-full bg-white mt-2 justify-between p-3 rounded-lg">
              <div className="text-base">{selectedTimeSlot.slot}</div>
              <div>
                <CloseCircleOutline
                  onClick={() => setSelectedTimeSlot(null)}
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
              placeholder="Enter remark"
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
                  <div
                    className="bg-white flex justify-between rounded-lg my-1"
                    key={product.product.id}
                  >
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
            onClick={handleSaleOrder}
            className="bg-primary p-3 w-full rounded-xl text-lg font-bold text-white"
          >
            {lOrder ? "..." : "Order"}
          </button>
        </div>
      </div>
      <CustomerLocationPopup
        visible={visible}
        setVisible={setVisible}
        setLocation={setLocation}
      />
      <Popup
        visible={visible2}
        onMaskClick={() => setVisible2(false)}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
        }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Select Date</h3>
            <button
              onClick={() => setVisible2(false)}
              className="text-red-500 font-semibold"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.map((item, index) => (
              <div
                onClick={() => handleSetDate(item)}
                key={index}
                className="bg-gray-100 p-2 rounded-lg text-center text-lg font-base"
              >
                {item.date}
              </div>
            ))}
          </div>
        </div>
      </Popup>
      <Popup
        visible={visible3}
        onMaskClick={() => setVisible3(false)}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
        }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Select Time Slot</h3>
            <button
              onClick={() => setVisible3(false)}
              className="text-red-500 font-semibold"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedDate?.time_slot
              .filter((slot) => slot.enabled)
              .map((slot, index) => (
                <div
                  key={index}
                  className="bg-blue-100 p-4 rounded-lg text-center text-lg font-medium cursor-pointer hover:bg-blue-200"
                  onClick={() => handleSetTime(slot)}
                >
                  {slot.slot}
                </div>
              ))}
          </div>
        </div>
      </Popup>
      <Popup
        visible={visible4}
        onMaskClick={() => {
          setVisible4(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "70vh",
        }}
      >
        <div className="p-4 rounded-lg max-h-[55vh] overflow-y-auto">
          {!lAddress && (
            <>
              {dAddress?.map((item) => (
                <SwipeAction
                  className="flex flex-col my-2"
                  key={item.id}
                  closeOnAction={false}
                  closeOnTouchOutside={false}
                  rightActions={[
                    {
                      key: "delete",
                      text: "Remove",
                      color: "danger",
                      onClick: async () => {
                        await Dialog.confirm({
                          content: "Remove Address",
                          cancelText: "No",
                          confirmText: "Remove",
                          onConfirm: () => {
                            mDeleteAddress(item.id || 0);
                          },
                        });
                      },
                    },
                  ]}
                >
                  <div
                    className="flex items-center w-full"
                    onClick={() => handleSetAddress(item)}
                  >
                    <div className="bg-white p-4 rounded-lg w-full flex flex-col border">
                      <div className="flex flex-col space-y-2">
                        <div className="text-base font-semibold text-gray-900">
                          Label:{" "}
                          <span className="font-medium text-blue-600">
                            {item.label}
                          </span>
                        </div>

                        {item.note && (
                          <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
                            📝 <strong>Note:</strong> {item.note}
                          </div>
                        )}

                        <div className="text-sm text-gray-600">
                          📍 <strong>Address:</strong> {item.address_name}
                        </div>

                        <div className="text-sm text-gray-500">
                          🌐 <strong>Coordinates:</strong> lat: {item.lat}, lng:{" "}
                          {item.lng}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwipeAction>
              ))}
            </>
          )}
        </div>
        <div className="absolute bottom-0 px-4 w-full mb-3">
          <button
            disabled={lDeleteAddress}
            className="p-3 bg-primary w-full rounded-2xl text-lg font-bold text-white"
            onClick={() => handleCreateNewAddress()}
          >
            Create New Address
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default SaleOrderPage;
